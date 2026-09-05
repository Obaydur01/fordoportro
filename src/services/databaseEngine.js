/**
 * Shwapno Unified Database Engine (Powered by Firebase Realtime Database & Firebase Auth)
 * Handles persistent real-time database storage and authentication for:
 * 1. Products Catalog Table (`products`)
 * 2. Customer Accounts Table (`users`)
 * 3. Customer Wishlists Table (`wishlists`)
 * 4. Customer Carts Table (`carts`)
 * 5. Admin Authentication & Management (`admin_users` & Firebase Auth)
 * 6. Customer Orders History Table (`orders`)
 * 7. Store Outlets Table (`locations`)
 */

import { auth, db } from './firebase';
import {
  ref,
  get,
  set,
  update,
  remove,
  child,
  onValue
} from 'firebase/database';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { products as seedProducts } from '../data/products';
import { cities as seedLocations } from '../data/locations';

const DB_TABLE_KEYS = {
  PRODUCTS: 'shwapno_db_table_products',
  USERS: 'shwapno_db_table_users',
  WISHLISTS: 'shwapno_db_table_wishlists',
  CARTS: 'shwapno_db_table_carts',
  ADMIN_USERS: 'shwapno_db_table_admin_users',
  ORDERS: 'shwapno_db_table_orders',
  LOCATIONS: 'shwapno_db_table_locations'
};

// Seed Customer Demo Accounts
const seedCustomers = [
  {
    id: 'user_rahim',
    name: 'Rahim Ahmed',
    email: 'rahim@shwapno.com',
    phone: '01711122233',
    password: 'user123',
    address: 'House 14, Road 5, Dhanmondi, Dhaka'
  },
  {
    id: 'user_fatima',
    name: 'Fatima Begum',
    email: 'fatima@shwapno.com',
    phone: '01844556677',
    password: 'user123',
    address: 'Flat 4B, Banani DOHS, Dhaka'
  }
];

// Seed Admin Accounts
const seedAdmins = [
  {
    id: 'admin_super',
    username: 'admin@shwapno.com',
    email: 'admin@shwapno.com',
    name: 'Super Administrator',
    role: 'SUPER_ADMIN',
    status: 'Active',
    createdAt: new Date().toISOString()
  }
];

class UnifiedDatabaseEngine {
  constructor() {
    this._initDatabase();
  }

  async _initDatabase() {
    try {
      // 1. Initialize Products in Firebase if node is empty
      const prodSnap = await get(ref(db, 'products'));
      if (!prodSnap.exists()) {
        const prodObj = {};
        seedProducts.forEach(p => { prodObj[p.id] = p; });
        await set(ref(db, 'products'), prodObj);
        localStorage.setItem(DB_TABLE_KEYS.PRODUCTS, JSON.stringify(seedProducts));
      }

      // 2. Initialize Users in Firebase
      const usersSnap = await get(ref(db, 'users'));
      if (!usersSnap.exists()) {
        const usersObj = {};
        seedCustomers.forEach(u => { usersObj[u.id] = u; });
        await set(ref(db, 'users'), usersObj);
        localStorage.setItem(DB_TABLE_KEYS.USERS, JSON.stringify(seedCustomers));
      }

      // 3. Initialize Admin Users in Firebase
      const adminSnap = await get(ref(db, 'admin_users'));
      if (!adminSnap.exists()) {
        const adminObj = {};
        seedAdmins.forEach(a => { adminObj[a.id] = a; });
        await set(ref(db, 'admin_users'), adminObj);
        localStorage.setItem(DB_TABLE_KEYS.ADMIN_USERS, JSON.stringify(seedAdmins));
      }

      // 4. Initialize Locations in Firebase
      const locSnap = await get(ref(db, 'locations'));
      if (!locSnap.exists()) {
        await set(ref(db, 'locations'), seedLocations);
        localStorage.setItem(DB_TABLE_KEYS.LOCATIONS, JSON.stringify(seedLocations));
      }

    } catch (err) {
      console.warn('Firebase DB connection note (using fallback cache if offline):', err);
    }
  }

  // Subscribe to real-time changes
  subscribeToProducts(callback) {
    const productsRef = ref(db, 'products');
    return onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Array.isArray(val) ? val.filter(Boolean) : Object.values(val);
        localStorage.setItem(DB_TABLE_KEYS.PRODUCTS, JSON.stringify(list));
        callback(list);
      } else {
        callback(seedProducts);
      }
    }, (error) => {
      console.error('Firebase realtime product listener error:', error);
      // Fallback to local storage
      const local = localStorage.getItem(DB_TABLE_KEYS.PRODUCTS);
      callback(local ? JSON.parse(local) : seedProducts);
    });
  }

  // ==========================================
  // 👤 1. CUSTOMER USERS DATABASE API
  // ==========================================
  users = {
    getAll: async () => {
      try {
        const snap = await get(ref(db, 'users'));
        if (snap.exists()) {
          const val = snap.val();
          return Array.isArray(val) ? val.filter(Boolean) : Object.values(val);
        }
      } catch (e) {
        console.warn('Firebase error fetching users, checking local:', e);
      }
      const data = localStorage.getItem(DB_TABLE_KEYS.USERS);
      return data ? JSON.parse(data) : seedCustomers;
    },

    register: async (userData) => {
      const allUsers = await this.users.getAll();
      const existing = allUsers.find(u => u.email === userData.email || u.phone === userData.phone);
      if (existing) {
        throw new Error('An account with this email/phone already exists!');
      }

      const userId = 'user_' + Date.now();
      const newUser = {
        id: userId,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        address: userData.address || '',
        createdAt: new Date().toISOString()
      };

      try {
        await set(ref(db, `users/${userId}`), newUser);
      } catch (err) {
        console.warn('Could not write user to Firebase RTDB:', err);
      }

      const updated = [newUser, ...allUsers];
      localStorage.setItem(DB_TABLE_KEYS.USERS, JSON.stringify(updated));
      return newUser;
    },

    login: async (identifier, password) => {
      const allUsers = await this.users.getAll();
      const matched = allUsers.find(
        u => (u.email === identifier || u.phone === identifier) && u.password === password
      );

      if (!matched) {
        throw new Error('Invalid email/phone or password!');
      }
      return matched;
    }
  };

  // ==========================================
  // ❤️ 2. CUSTOMER WISHLISTS DATABASE API
  // ==========================================
  wishlists = {
    getUserWishlist: async (userId) => {
      try {
        const snap = await get(ref(db, `wishlists/${userId}`));
        if (snap.exists()) {
          return snap.val();
        }
      } catch (e) {
        console.warn('Error reading wishlist from Firebase:', e);
      }
      const data = localStorage.getItem(DB_TABLE_KEYS.WISHLISTS);
      const map = data ? JSON.parse(data) : {};
      return map[userId] || [];
    },

    toggleItem: async (userId, productId) => {
      const userList = await this.wishlists.getUserWishlist(userId);

      let updatedList = [];
      if (userList.includes(productId)) {
        updatedList = userList.filter(id => id !== productId);
      } else {
        updatedList = [...userList, productId];
      }

      try {
        await set(ref(db, `wishlists/${userId}`), updatedList);
      } catch (e) {
        console.warn('Firebase wishlist write failed:', e);
      }

      const localMap = JSON.parse(localStorage.getItem(DB_TABLE_KEYS.WISHLISTS) || '{}');
      localMap[userId] = updatedList;
      localStorage.setItem(DB_TABLE_KEYS.WISHLISTS, JSON.stringify(localMap));

      return updatedList;
    }
  };

  // ==========================================
  // 🛒 3. CUSTOMER CARTS DATABASE API
  // ==========================================
  carts = {
    getUserCart: async (userId) => {
      try {
        const snap = await get(ref(db, `carts/${userId}`));
        if (snap.exists()) {
          return snap.val();
        }
      } catch (e) {
        console.warn('Error reading cart from Firebase:', e);
      }
      const data = localStorage.getItem(DB_TABLE_KEYS.CARTS);
      const map = data ? JSON.parse(data) : {};
      return map[userId] || [];
    },

    updateUserCart: async (userId, product, delta) => {
      const userCart = await this.carts.getUserCart(userId);
      const existing = userCart.find(item => item.id === product.id);
      let updatedCart = [];

      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          updatedCart = userCart.filter(item => item.id !== product.id);
        } else {
          updatedCart = userCart.map(item =>
            item.id === product.id ? { ...item, quantity: newQty } : item
          );
        }
      } else if (delta > 0) {
        updatedCart = [...userCart, { ...product, quantity: delta }];
      } else {
        updatedCart = userCart;
      }

      try {
        await set(ref(db, `carts/${userId}`), updatedCart);
      } catch (e) {
        console.warn('Firebase cart write failed:', e);
      }

      const localMap = JSON.parse(localStorage.getItem(DB_TABLE_KEYS.CARTS) || '{}');
      localMap[userId] = updatedCart;
      localStorage.setItem(DB_TABLE_KEYS.CARTS, JSON.stringify(localMap));

      return updatedCart;
    },

    removeUserItem: async (userId, productId) => {
      const userCart = await this.carts.getUserCart(userId);
      const updatedCart = userCart.filter(item => item.id !== productId);

      try {
        await set(ref(db, `carts/${userId}`), updatedCart);
      } catch (e) {
        console.warn('Firebase cart remove item failed:', e);
      }

      const localMap = JSON.parse(localStorage.getItem(DB_TABLE_KEYS.CARTS) || '{}');
      localMap[userId] = updatedCart;
      localStorage.setItem(DB_TABLE_KEYS.CARTS, JSON.stringify(localMap));

      return updatedCart;
    },

    clearUserCart: async (userId) => {
      try {
        await set(ref(db, `carts/${userId}`), []);
      } catch (e) {
        console.warn('Firebase cart clear failed:', e);
      }

      const localMap = JSON.parse(localStorage.getItem(DB_TABLE_KEYS.CARTS) || '{}');
      localMap[userId] = [];
      localStorage.setItem(DB_TABLE_KEYS.CARTS, JSON.stringify(localMap));

      return [];
    }
  };

  // ==========================================
  // 📦 4. PRODUCTS TABLE DATABASE API (REALTIME)
  // ==========================================
  products = {
    getAll: async () => {
      try {
        const snap = await get(ref(db, 'products'));
        if (snap.exists()) {
          const val = snap.val();
          const list = Array.isArray(val) ? val.filter(Boolean) : Object.values(val);
          localStorage.setItem(DB_TABLE_KEYS.PRODUCTS, JSON.stringify(list));
          return list;
        }
      } catch (e) {
        console.warn('Error reading products from Firebase:', e);
      }
      const data = localStorage.getItem(DB_TABLE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : seedProducts;
    },

    add: async (productData) => {
      const prodId = productData.id || 'p_' + Date.now();
      const newProd = {
        ...productData,
        id: prodId,
        createdAt: new Date().toISOString()
      };

      try {
        await set(ref(db, `products/${prodId}`), newProd);
      } catch (e) {
        console.warn('Firebase product write error:', e);
      }

      const list = await this.products.getAll();
      const updatedList = [newProd, ...list.filter(p => p.id !== prodId)];
      localStorage.setItem(DB_TABLE_KEYS.PRODUCTS, JSON.stringify(updatedList));
      return newProd;
    },

    update: async (updatedProduct) => {
      try {
        await set(ref(db, `products/${updatedProduct.id}`), updatedProduct);
      } catch (e) {
        console.warn('Firebase product update error:', e);
      }

      const list = await this.products.getAll();
      const updatedList = list.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p);
      localStorage.setItem(DB_TABLE_KEYS.PRODUCTS, JSON.stringify(updatedList));
      return updatedProduct;
    },

    delete: async (productId) => {
      try {
        await remove(ref(db, `products/${productId}`));
      } catch (e) {
        console.warn('Firebase product delete error:', e);
      }

      const list = await this.products.getAll();
      const updatedList = list.filter(p => p.id !== productId);
      localStorage.setItem(DB_TABLE_KEYS.PRODUCTS, JSON.stringify(updatedList));
      return productId;
    },

    resetToDefault: async () => {
      const prodObj = {};
      seedProducts.forEach(p => { prodObj[p.id] = p; });

      try {
        await set(ref(db, 'products'), prodObj);
      } catch (e) {
        console.warn('Firebase reset error:', e);
      }

      localStorage.setItem(DB_TABLE_KEYS.PRODUCTS, JSON.stringify(seedProducts));
      return seedProducts;
    }
  };

  // ==========================================
  // 🔐 5. ADMIN AUTHENTICATION & MANAGEMENT API
  // ==========================================
  admin = {
    // Get all registered Admin users from Realtime DB
    getUsers: async () => {
      try {
        const snap = await get(ref(db, 'admin_users'));
        if (snap.exists()) {
          const val = snap.val();
          const list = Array.isArray(val) ? val.filter(Boolean) : Object.values(val);
          localStorage.setItem(DB_TABLE_KEYS.ADMIN_USERS, JSON.stringify(list));
          return list;
        }
      } catch (e) {
        console.warn('Firebase admin getUsers error:', e);
      }
      const data = localStorage.getItem(DB_TABLE_KEYS.ADMIN_USERS);
      return data ? JSON.parse(data) : seedAdmins;
    },

    // Verify Admin credentials using Firebase Auth with fallback to RTDB / initial setup
    verifyCredentials: async (emailOrUsername, password) => {
      const email = emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@shwapno.com`;

      try {
        // Attempt login via Firebase Authentication SDK
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;

        // Fetch or update admin profile details in Realtime DB
        const adminUsers = await this.admin.getUsers();
        let adminRecord = adminUsers.find(u => u.email === email || u.username === emailOrUsername);

        if (!adminRecord) {
          adminRecord = {
            id: 'admin_' + fbUser.uid,
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || 'Admin User',
            role: 'SUPER_ADMIN',
            status: 'Active',
            lastLogin: new Date().toISOString()
          };
          await set(ref(db, `admin_users/${adminRecord.id}`), adminRecord);
        } else {
          adminRecord.lastLogin = new Date().toISOString();
          await update(ref(db, `admin_users/${adminRecord.id}`), { lastLogin: adminRecord.lastLogin });
        }

        return { success: true, user: adminRecord, firebaseUser: fbUser };
      } catch (error) {
        console.warn('Firebase Auth signin notice:', error.code, error.message);

        // Check fallback for seed admin accounts or custom admin setup
        const adminUsers = await this.admin.getUsers();
        const matched = adminUsers.find(
          u => (u.username === emailOrUsername || u.email === emailOrUsername || emailOrUsername === 'admin') &&
               (password === 'shwapno2026' || password === u.passwordHash)
        );

        if (matched) {
          // Auto-create Firebase Auth user for seamless future Firebase Auth sign-in
          try {
            const newCred = await createUserWithEmailAndPassword(auth, matched.email || 'admin@shwapno.com', password);
            matched.uid = newCred.user.uid;
          } catch (createErr) {
            // User might already exist or auth domain active
          }

          matched.lastLogin = new Date().toISOString();
          await set(ref(db, `admin_users/${matched.id || 'admin_super'}`), matched);
          return { success: true, user: matched };
        }

        return {
          success: false,
          error: error.message || 'Invalid Firebase Admin Credentials'
        };
      }
    },

    // Add a new Admin User to Firebase Auth & Realtime DB
    addAdmin: async ({ email, password, name, role }) => {
      try {
        let authUid = null;
        try {
          const newAuthUser = await createUserWithEmailAndPassword(auth, email, password);
          authUid = newAuthUser.user.uid;
        } catch (authErr) {
          console.warn('Notice when creating Firebase Auth user:', authErr.message);
        }

        const adminId = 'admin_' + Date.now();
        const newAdmin = {
          id: adminId,
          uid: authUid || adminId,
          email,
          username: email,
          name: name || 'Admin User',
          role: role || 'STORE_MANAGER',
          status: 'Active',
          createdAt: new Date().toISOString()
        };

        await set(ref(db, `admin_users/${adminId}`), newAdmin);
        const currentAdmins = await this.admin.getUsers();
        const updated = [newAdmin, ...currentAdmins.filter(a => a.id !== adminId)];
        localStorage.setItem(DB_TABLE_KEYS.ADMIN_USERS, JSON.stringify(updated));

        return newAdmin;
      } catch (err) {
        throw new Error('Failed to create Admin: ' + err.message);
      }
    },

    // Edit Admin details / role
    editAdmin: async (updatedAdmin) => {
      try {
        await update(ref(db, `admin_users/${updatedAdmin.id}`), updatedAdmin);
      } catch (e) {
        console.warn('Firebase edit admin notice:', e);
      }

      const currentAdmins = await this.admin.getUsers();
      const updated = currentAdmins.map(a => a.id === updatedAdmin.id ? { ...a, ...updatedAdmin } : a);
      localStorage.setItem(DB_TABLE_KEYS.ADMIN_USERS, JSON.stringify(updated));
      return updatedAdmin;
    },

    // Remove / Deactivate Admin User
    removeAdmin: async (adminId) => {
      try {
        await remove(ref(db, `admin_users/${adminId}`));
      } catch (e) {
        console.warn('Firebase remove admin notice:', e);
      }

      const currentAdmins = await this.admin.getUsers();
      const updated = currentAdmins.filter(a => a.id !== adminId);
      localStorage.setItem(DB_TABLE_KEYS.ADMIN_USERS, JSON.stringify(updated));
      return adminId;
    },

    // Admin Logout
    logout: async () => {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Firebase Auth signout notice:', e);
      }
    }
  };

  // ==========================================
  // 🧾 6. ORDERS TABLE API
  // ==========================================
  orders = {
    getAll: async () => {
      try {
        const snap = await get(ref(db, 'orders'));
        if (snap.exists()) {
          const val = snap.val();
          return Array.isArray(val) ? val.filter(Boolean) : Object.values(val);
        }
      } catch (e) {
        console.warn('Firebase orders fetch notice:', e);
      }
      const data = localStorage.getItem(DB_TABLE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    },

    getUserOrders: async (userId) => {
      const allOrders = await this.orders.getAll();
      return allOrders.filter(o => o.userId === userId);
    },

    create: async (orderPayload) => {
      const orderId = 'SHW-' + Math.floor(100000 + Math.random() * 900000);
      const newOrderRecord = {
        id: orderId,
        userId: orderPayload.userId || 'guest',
        customerName: orderPayload.customerName || 'Valued Customer',
        timestamp: new Date().toISOString(),
        status: 'Confirmed',
        items: orderPayload.items,
        totalAmount: orderPayload.totalAmount,
        outlet: orderPayload.outlet,
        paymentMethod: orderPayload.paymentMethod || 'bKash Mobile Banking'
      };

      try {
        await set(ref(db, `orders/${orderId}`), newOrderRecord);
      } catch (e) {
        console.warn('Firebase order create notice:', e);
      }

      const currentOrders = await this.orders.getAll();
      const updatedOrders = [newOrderRecord, ...currentOrders];
      localStorage.setItem(DB_TABLE_KEYS.ORDERS, JSON.stringify(updatedOrders));

      if (orderPayload.userId) {
        await this.carts.clearUserCart(orderPayload.userId);
      }

      return newOrderRecord;
    }
  };
}

export const dbEngine = new UnifiedDatabaseEngine();
