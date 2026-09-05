// Shwapno Local Database Service Layer (Persistent Storage Engine)
import { products as initialProducts } from '../data/products';
import { cities as initialCities } from '../data/locations';

const DB_KEYS = {
  PRODUCTS: 'shwapno_db_products_v1',
  ORDERS: 'shwapno_db_orders_v1',
  SETTINGS: 'shwapno_db_settings_v1'
};

class ShwapnoDatabase {
  constructor() {
    this.init();
  }

  init() {
    try {
      const existingProducts = localStorage.getItem(DB_KEYS.PRODUCTS);
      if (!existingProducts) {
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(initialProducts));
      }

      const existingOrders = localStorage.getItem(DB_KEYS.ORDERS);
      if (!existingOrders) {
        localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify([]));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable, falling back to memory state', e);
    }
  }

  // --- PRODUCT CRUD OPERATIONS ---

  async getProducts() {
    try {
      const data = localStorage.getItem(DB_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : initialProducts;
    } catch (e) {
      return initialProducts;
    }
  }

  async addProduct(newProduct) {
    const products = await this.getProducts();
    const productWithId = {
      ...newProduct,
      id: newProduct.id || 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString()
    };
    const updated = [productWithId, ...products];
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updated));
    return productWithId;
  }

  async updateProduct(updatedProduct) {
    const products = await this.getProducts();
    const updated = products.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p);
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updated));
    return updatedProduct;
  }

  async deleteProduct(productId) {
    const products = await this.getProducts();
    const updated = products.filter(p => p.id !== productId);
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updated));
    return productId;
  }

  async resetProductsToSeed() {
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    return initialProducts;
  }

  // --- ORDER MANAGEMENT ---

  async getOrders() {
    try {
      const data = localStorage.getItem(DB_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async saveOrder(orderData) {
    const orders = await this.getOrders();
    const newOrder = {
      id: 'SHW-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString(),
      status: 'Processing',
      ...orderData
    };
    const updated = [newOrder, ...orders];
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
    return newOrder;
  }
}

export const db = new ShwapnoDatabase();
