import React, { useState, useEffect } from 'react';
import {
  Plus, Edit3, Trash2, Search, Package, Zap, Star, ArrowLeft, Image, Save, X,
  CheckCircle2, Lock, LogOut, Database, RefreshCw, AlertTriangle, Upload,
  ShieldCheck, UserPlus, Users, KeyRound, ShieldAlert
} from 'lucide-react';
import { categories } from '../data/categories';
import { dbEngine } from '../services/databaseEngine';

export default function AdminPanel({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onResetDatabase,
  onBackToShop,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'admins'
  const [searchAdmin, setSearchAdmin] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Custom In-App Modal State for Delete & Reset
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // --- ADMIN USERS MANAGEMENT STATE ---
  const [adminUsersList, setAdminUsersList] = useState([]);
  const [isAdminUserModalOpen, setIsAdminUserModalOpen] = useState(false);
  const [editingAdminUser, setEditingAdminUser] = useState(null);
  const [deleteConfirmAdmin, setDeleteConfirmAdmin] = useState(null);

  const [adminFormData, setAdminFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STORE_MANAGER'
  });

  // Form State for Products
  const [formData, setFormData] = useState({
    name: '',
    nameBn: '',
    category: 'fruits-veg',
    price: '',
    originalPrice: '',
    discount: '',
    unit: '1 kg',
    rating: 4.8,
    reviews: 12,
    stock: 50,
    isFlashSale: false,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=80',
    description: ''
  });

  const [notification, setNotification] = useState('');

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // Fetch Admin users from Firebase Realtime Database on load & tab switch
  const loadAdminUsers = async () => {
    try {
      const users = await dbEngine.admin.getUsers();
      setAdminUsersList(users);
    } catch (err) {
      console.error('Error fetching admin users:', err);
    }
  };

  useEffect(() => {
    loadAdminUsers();
  }, [activeTab]);

  // Image File Upload Handler
  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size exceeds 5MB limit. Please choose a smaller image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Product Form Handlers
  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameBn: '',
      category: 'fruits-veg',
      price: '',
      originalPrice: '',
      discount: '',
      unit: '1 kg',
      rating: 4.8,
      reviews: 10,
      stock: 50,
      isFlashSale: false,
      isBestSeller: false,
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=80',
      description: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      nameBn: product.nameBn || '',
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || '',
      discount: product.discount || '',
      unit: product.unit,
      rating: product.rating || 4.8,
      reviews: product.reviews || 10,
      stock: product.stock || 50,
      isFlashSale: product.isFlashSale || false,
      isBestSeller: product.isBestSeller || false,
      image: product.image,
      description: product.description || ''
    });
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      const updated = {
        ...editingProduct,
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        stock: Number(formData.stock)
      };
      await onEditProduct(updated);
      triggerNotification(`🔥 Firebase Realtime DB Updated: "${formData.name}" saved!`);
    } else {
      const newProd = {
        id: 'p-' + Date.now(),
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        stock: Number(formData.stock)
      };
      await onAddProduct(newProd);
      triggerNotification(`🔥 Firebase Realtime DB Created: "${formData.name}" added!`);
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmProduct) {
      await onDeleteProduct(deleteConfirmProduct.id);
      triggerNotification(`🔥 Firebase Realtime DB Removed: "${deleteConfirmProduct.name}" deleted.`);
      setDeleteConfirmProduct(null);
    }
  };

  const handleConfirmReset = async () => {
    await onResetDatabase();
    triggerNotification('🔥 Firebase Realtime DB Reset to original catalog seed!');
    setIsResetConfirmOpen(false);
  };

  // --- ADMIN USERS MANAGEMENT HANDLERS ---
  const handleOpenAddAdminModal = () => {
    setEditingAdminUser(null);
    setAdminFormData({
      name: '',
      email: '',
      password: '',
      role: 'STORE_MANAGER'
    });
    setIsAdminUserModalOpen(true);
  };

  const handleOpenEditAdminModal = (admin) => {
    setEditingAdminUser(admin);
    setAdminFormData({
      name: admin.name || '',
      email: admin.email || admin.username || '',
      password: '',
      role: admin.role || 'STORE_MANAGER'
    });
    setIsAdminUserModalOpen(true);
  };

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAdminUser) {
        const updated = {
          ...editingAdminUser,
          name: adminFormData.name,
          email: adminFormData.email,
          role: adminFormData.role
        };
        await dbEngine.admin.editAdmin(updated);
        triggerNotification(`✅ Admin User "${adminFormData.name}" updated in Firebase!`);
      } else {
        await dbEngine.admin.addAdmin({
          email: adminFormData.email,
          password: adminFormData.password,
          name: adminFormData.name,
          role: adminFormData.role
        });
        triggerNotification(`✅ New Firebase Admin "${adminFormData.name}" registered successfully!`);
      }
      setIsAdminUserModalOpen(false);
      loadAdminUsers();
    } catch (err) {
      alert(err.message || 'Error saving admin user');
    }
  };

  const handleConfirmDeleteAdmin = async () => {
    if (deleteConfirmAdmin) {
      try {
        await dbEngine.admin.removeAdmin(deleteConfirmAdmin.id);
        triggerNotification(`🗑️ Firebase Admin "${deleteConfirmAdmin.name || deleteConfirmAdmin.email}" removed.`);
        setDeleteConfirmAdmin(null);
        loadAdminUsers();
      } catch (err) {
        alert(err.message || 'Error removing admin user');
      }
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchAdmin.toLowerCase()) ||
    p.category.toLowerCase().includes(searchAdmin.toLowerCase())
  );

  const flashSaleCount = products.filter(p => p.isFlashSale).length;
  const bestSellerCount = products.filter(p => p.isBestSeller).length;

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container">

        {/* Admin Header Banner */}
        <div style={{
          backgroundColor: 'var(--navy-dark)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{
                backgroundColor: 'var(--primary-red)',
                color: 'white',
                fontWeight: 800,
                borderRadius: 'var(--radius-md)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <Lock size={15} /> AUTHENTICATED ADMIN
              </div>

              <div style={{
                backgroundColor: 'rgba(234, 88, 12, 0.25)',
                color: '#FB923C',
                fontWeight: 800,
                borderRadius: 'var(--radius-md)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid rgba(251, 146, 60, 0.4)'
              }}>
                <Database size={15} /> 🔥 FIREBASE REALTIME DB & AUTH
              </div>
            </div>

            <h1 style={{ color: 'white', fontSize: '1.6rem', margin: '0.75rem 0 0 0', fontWeight: 800 }}>
              Shwapno Inventory & Firebase Admin Portal
            </h1>
            <p style={{ fontSize: '0.88rem', opacity: 0.85, marginTop: '0.25rem' }}>
              Real-time synchronisation across products catalog, user accounts, and admin security credentials.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onBackToShop}
              className="btn-outline"
              style={{ backgroundColor: 'white', color: 'var(--navy-dark)', border: 'none', fontWeight: 700 }}
            >
              <ArrowLeft size={18} /> Customer View
            </button>

            <button
              onClick={onLogout}
              className="btn-outline"
              style={{ backgroundColor: 'var(--primary-red-light)', color: 'var(--primary-red)', border: 'none', fontWeight: 700 }}
            >
              <LogOut size={18} /> Logout Admin
            </button>
          </div>
        </div>

        {/* Notification Alert */}
        {notification && (
          <div style={{
            backgroundColor: 'var(--green-light)',
            color: 'var(--green-emerald)',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid var(--green-emerald)'
          }}>
            <CheckCircle2 size={20} /> {notification}
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          borderBottom: '2px solid var(--gray-200)',
          paddingBottom: '0.5rem'
        }}>
          <button
            onClick={() => setActiveTab('inventory')}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 800,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeTab === 'inventory' ? 'var(--navy-dark)' : 'white',
              color: activeTab === 'inventory' ? 'white' : 'var(--navy-dark)',
              border: '1.5px solid var(--gray-300)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <Package size={18} /> Product Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('admins')}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 800,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeTab === 'admins' ? 'var(--primary-red)' : 'white',
              color: activeTab === 'admins' ? 'white' : 'var(--navy-dark)',
              border: '1.5px solid var(--gray-300)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <ShieldCheck size={18} /> Firebase Admin Users ({adminUsersList.length})
          </button>
        </div>

        {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'inventory' && (
          <>
            {/* Metrics Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem'
            }}>
              <div style={{ backgroundColor: 'white', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)', fontWeight: 600, textTransform: 'uppercase' }}>Firebase Products</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-dark)', marginTop: '0.2rem' }}>{products.length} Items</div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)', fontWeight: 600, textTransform: 'uppercase' }}>Active Flash Deals</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-red)', marginTop: '0.2rem' }}>{flashSaleCount}</div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)', fontWeight: 600, textTransform: 'uppercase' }}>Bestseller Items</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-accent)', marginTop: '0.2rem' }}>{bestSellerCount}</div>
              </div>
            </div>

            {/* Product Table Container */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--gray-200)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden'
            }}>

              {/* Table Toolbar */}
              <div style={{
                padding: '1.2rem 1.5rem',
                borderBottom: '1px solid var(--gray-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                backgroundColor: 'var(--gray-50)'
              }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-dark)' }}>
                  Firebase Realtime Database Catalog
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '260px' }}>
                    <input
                      type="text"
                      placeholder="Search catalog products..."
                      value={searchAdmin}
                      onChange={(e) => setSearchAdmin(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.85rem'
                      }}
                    />
                    <Search size={16} color="var(--gray-600)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>

                  <button
                    onClick={handleOpenAddForm}
                    className="btn-primary"
                    style={{ fontWeight: 700 }}
                  >
                    <Plus size={18} /> Add New Product
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--navy-light)', color: 'var(--navy-dark)', borderBottom: '2px solid var(--gray-200)' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Product Info</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Unit</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Price (৳)</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Stock</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Tags</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                              src={p.image}
                              alt={p.name}
                              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--navy-dark)' }}>{p.name}</div>
                              {p.nameBn && <div style={{ fontSize: '0.78rem', color: 'var(--primary-red)' }}>{p.nameBn}</div>}
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{
                            backgroundColor: 'var(--gray-100)',
                            padding: '0.25rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--gray-800)',
                            textTransform: 'uppercase'
                          }}>
                            {p.category}
                          </span>
                        </td>

                        <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                          {p.unit}
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ fontWeight: 800, color: 'var(--primary-red)' }}>৳{p.price}</div>
                          {p.originalPrice && <div style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--gray-600)' }}>৳{p.originalPrice}</div>}
                        </td>

                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                          {p.stock || 50} pcs
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                            {p.isFlashSale && (
                              <span style={{ backgroundColor: 'var(--primary-red)', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                                FLASH DEALS
                              </span>
                            )}
                            {p.isBestSeller && (
                              <span style={{ backgroundColor: 'var(--gold-accent)', color: 'var(--navy-dark)', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                                BESTSELLER
                              </span>
                            )}
                          </div>
                        </td>

                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button
                              onClick={() => handleOpenEditForm(p)}
                              style={{
                                padding: '0.4rem 0.75rem',
                                backgroundColor: 'var(--navy-light)',
                                color: 'var(--navy-dark)',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                              }}
                            >
                              <Edit3 size={14} /> Edit
                            </button>

                            <button
                              onClick={() => setDeleteConfirmProduct(p)}
                              style={{
                                padding: '0.4rem 0.75rem',
                                backgroundColor: 'var(--primary-red-light)',
                                color: 'var(--primary-red)',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                              }}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </>
        )}

        {/* TAB 2: FIREBASE ADMIN USERS MANAGEMENT */}
        {activeTab === 'admins' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-200)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden'
          }}>

            {/* Admin Management Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              backgroundColor: 'var(--navy-light)'
            }}>
              <div>
                <h3 style={{ color: 'var(--navy-dark)', margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                  Firebase Admin Accounts & Roles Management
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>
                  Add, modify, or remove administrator user credentials saved in Firebase Auth & Realtime DB.
                </span>
              </div>

              <button
                onClick={handleOpenAddAdminModal}
                className="btn-primary"
                style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <UserPlus size={18} /> Add New Admin User
              </button>
            </div>

            {/* Admins List Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--gray-100)', color: 'var(--navy-dark)', borderBottom: '2px solid var(--gray-200)' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Admin Name & Email</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Role</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Created At</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsersList.map((adm) => (
                    <tr key={adm.id || adm.email} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{
                            backgroundColor: 'var(--navy-dark)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800
                          }}>
                            {adm.name ? adm.name.charAt(0).toUpperCase() : 'A'}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--navy-dark)' }}>{adm.name || 'Admin User'}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--gray-600)' }}>{adm.email || adm.username}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          backgroundColor: adm.role === 'SUPER_ADMIN' ? 'var(--primary-red-light)' : 'var(--navy-light)',
                          color: adm.role === 'SUPER_ADMIN' ? 'var(--primary-red)' : 'var(--navy-dark)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.78rem',
                          fontWeight: 800
                        }}>
                          {adm.role || 'STORE_MANAGER'}
                        </span>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          backgroundColor: 'var(--green-light)',
                          color: 'var(--green-emerald)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          ● Active Firebase User
                        </span>
                      </td>

                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: 'var(--gray-600)' }}>
                        {adm.createdAt ? new Date(adm.createdAt).toLocaleDateString() : 'Initial System Admin'}
                      </td>

                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleOpenEditAdminModal(adm)}
                            style={{
                              padding: '0.35rem 0.65rem',
                              backgroundColor: 'var(--navy-light)',
                              color: 'var(--navy-dark)',
                              borderRadius: 'var(--radius-sm)',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            <Edit3 size={13} /> Edit
                          </button>

                          <button
                            onClick={() => setDeleteConfirmAdmin(adm)}
                            style={{
                              padding: '0.35rem 0.65rem',
                              backgroundColor: 'var(--primary-red-light)',
                              color: 'var(--primary-red)',
                              borderRadius: 'var(--radius-sm)',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* MODAL: ADD / EDIT ADMIN USER */}
        {isAdminUserModalOpen && (
          <div className="modal-overlay" onClick={() => setIsAdminUserModalOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
              <div style={{
                backgroundColor: 'var(--navy-dark)',
                color: 'white',
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '3px solid var(--primary-red)'
              }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.15rem' }}>
                  {editingAdminUser ? 'Edit Firebase Admin Account' : 'Register New Firebase Admin'}
                </h3>
                <button onClick={() => setIsAdminUserModalOpen(false)} style={{ color: 'white' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAdminFormSubmit} style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.35rem' }}>
                    Full Admin Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Hassan"
                    value={adminFormData.name}
                    onChange={(e) => setAdminFormData({ ...adminFormData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.35rem' }}>
                    Admin Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={!!editingAdminUser}
                    placeholder="manager@shwapno.com"
                    value={adminFormData.email}
                    onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                {!editingAdminUser && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.35rem' }}>
                      Firebase Auth Admin Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Min 6 characters"
                      value={adminFormData.password}
                      onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.35rem' }}>
                    Admin Permission Level & Role *
                  </label>
                  <select
                    value={adminFormData.role}
                    onChange={(e) => setAdminFormData({ ...adminFormData, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.9rem',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="SUPER_ADMIN">Super Administrator (Full System Access)</option>
                    <option value="STORE_MANAGER">Store Outlet Manager</option>
                    <option value="INVENTORY_ADMIN">Inventory & Stock Specialist</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                >
                  <Save size={18} /> {editingAdminUser ? 'Save Admin Updates' : 'Create Firebase Admin Account'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CONFIRM DELETE ADMIN */}
        {deleteConfirmAdmin && (
          <div className="modal-overlay" onClick={() => setDeleteConfirmAdmin(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{
                backgroundColor: 'var(--primary-red-light)',
                color: 'var(--primary-red)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <ShieldAlert size={32} />
              </div>

              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>
                Remove Admin Credentials?
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Are you sure you want to remove <strong>"{deleteConfirmAdmin.name || deleteConfirmAdmin.email}"</strong> from Firebase Admin users?
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setDeleteConfirmAdmin(null)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmDeleteAdmin}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Remove Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: DELETE PRODUCT */}
        {deleteConfirmProduct && (
          <div className="modal-overlay" onClick={() => setDeleteConfirmProduct(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{
                backgroundColor: 'var(--primary-red-light)',
                color: 'var(--primary-red)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <AlertTriangle size={32} />
              </div>

              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>
                Confirm Product Deletion
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Are you sure you want to remove <strong>"{deleteConfirmProduct.name}"</strong> from Firebase Realtime Database?
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setDeleteConfirmProduct(null)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmDelete}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {isFormOpen && (
          <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', width: '95%' }}>

              <div style={{
                backgroundColor: 'var(--navy-dark)',
                color: 'white',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>
                  {editingProduct ? 'Edit Product in Firebase' : 'Add Product to Firebase Database'}
                </h3>
                <button onClick={() => setIsFormOpen(false)} style={{ color: 'white' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitForm} style={{ padding: '1.5rem', maxHeight: '550px', overflowY: 'auto' }}>

                {/* Image Upload */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-dark)', display: 'block', marginBottom: '0.35rem' }}>
                    Product Picture (Upload from Laptop or Mobile Device) *
                  </label>

                  <div style={{
                    border: '2px dashed var(--gray-300)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    backgroundColor: 'var(--gray-50)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}>
                    {formData.image ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={formData.image}
                          alt="Product Preview"
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '2px solid var(--gray-200)' }}
                        />
                        <div style={{ textAlign: 'left', flex: 1 }}>
                          <span style={{ fontSize: '0.78rem', color: 'var(--green-emerald)', fontWeight: 700, display: 'block' }}>
                            ✓ Picture Loaded Successfully
                          </span>
                          <label style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            backgroundColor: 'white',
                            border: '1.5px solid var(--gray-300)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: 'var(--navy-dark)',
                            cursor: 'pointer',
                            marginTop: '0.4rem'
                          }}>
                            <Upload size={14} /> Choose Different Photo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                        <Upload size={28} color="var(--primary-red)" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-dark)' }}>
                          Click to Upload Image from Laptop / Mobile
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                          PNG, JPG, WEBP formats supported (Max 5MB)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.2rem' }}>
                      Or paste direct image Web URL:
                    </span>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.82rem'
                      }}
                    />
                  </div>
                </div>

                {/* Names */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                      Product Name (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fresh Farm Rajshahi Mango"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                      Product Name (বাংলা Bengali)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. রাজশাহীর তাজা ফজলি আম"
                      value={formData.nameBn}
                      onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                {/* Category & Unit */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                      Department Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.88rem',
                        backgroundColor: 'white'
                      }}
                    >
                      {categories.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                      Unit Spec (Weight / Size) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1 kg, 500 ml, Pack of 4"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                {/* Price */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                      Selling Price (৳) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="160"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                      Original Price (৳)
                    </label>
                    <input
                      type="number"
                      placeholder="200"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                      Discount Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 20% OFF"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--gray-300)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                {/* Stock Pcs */}
                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                    Stock Pcs
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter item freshness description, origin..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
                    <input
                      type="checkbox"
                      checked={formData.isFlashSale}
                      onChange={(e) => setFormData({ ...formData, isFlashSale: e.target.checked })}
                    />
                    ⚡ Add to Flash Sale Deals
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    />
                    🏆 Mark as Bestseller
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
                >
                  <Save size={18} /> {editingProduct ? 'Save Changes' : 'Save to Firebase Database'}
                </button>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
