import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import MegaMenu from './components/MegaMenu';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import MessengerWidget from './components/MessengerWidget';
import MobileNav from './components/MobileNav';

import LocationModal from './components/LocationModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import QuickViewModal from './components/QuickViewModal';
import AuthModal from './components/AuthModal';
import AdminLoginModal from './components/AdminLoginModal';
import WishlistModal from './components/WishlistModal';

import { dbEngine } from './services/databaseEngine';
import { cities } from './data/locations';

export default function App() {
  const [lang, setLang] = useState('EN');
  const [viewMode, setViewMode] = useState('shop'); // 'shop' | 'admin'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Customer Account Session State (Default null = unauthenticated guest)
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [currentOutlet, setCurrentOutlet] = useState(cities[0].outlets[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Database Products Catalog State
  const [productList, setProductList] = useState([]);

  // Customer-Specific Database Cart & Wishlist State
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Modals visibility state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Load Products Catalog on initial mount with Firebase Realtime sync
  useEffect(() => {
    const unsubscribe = dbEngine.subscribeToProducts((productsData) => {
      setProductList(productsData);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Sync Cart & Wishlist whenever `currentCustomer` changes
  useEffect(() => {
    async function syncCustomerData() {
      const userId = currentCustomer ? currentCustomer.id : 'guest';
      const userCart = await dbEngine.carts.getUserCart(userId);
      setCartItems(userCart);

      const userWishlist = await dbEngine.wishlists.getUserWishlist(userId);
      setWishlistIds(userWishlist);
    }
    syncCustomerData();
  }, [currentCustomer]);

  // Customer Login / Logout Handlers
  const handleCustomerLoginSuccess = (user) => {
    setCurrentCustomer(user);
  };

  const handleCustomerLogout = () => {
    setCurrentCustomer(null);
  };

  // Customer Wishlist Handler
  const handleToggleWishlist = async (productId) => {
    const userId = currentCustomer ? currentCustomer.id : 'guest';
    const updatedList = await dbEngine.wishlists.toggleItem(userId, productId);
    setWishlistIds(updatedList);
  };

  // Admin Security Handlers
  const handleToggleAdminMode = () => {
    if (viewMode === 'admin') {
      setViewMode('shop');
    } else {
      if (isAdminAuthenticated) {
        setViewMode('admin');
      } else {
        setIsAdminLoginModalOpen(true);
      }
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginModalOpen(false);
    setViewMode('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setViewMode('shop');
  };

  // Database Product CRUD Handlers
  const handleAddProduct = async (newProduct) => {
    const savedProduct = await dbEngine.products.add(newProduct);
    setProductList(prev => [savedProduct, ...prev]);
  };

  const handleEditProduct = async (updatedProduct) => {
    await dbEngine.products.update(updatedProduct);
    setProductList(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = async (productId) => {
    await dbEngine.products.delete(productId);
    setProductList(prev => prev.filter(p => p.id !== productId));
    const userId = currentCustomer ? currentCustomer.id : 'guest';
    const updatedCart = await dbEngine.carts.getUserCart(userId);
    setCartItems(updatedCart);
  };

  const handleResetDatabase = async () => {
    const defaultProducts = await dbEngine.products.resetToDefault();
    setProductList(defaultProducts);
  };

  // Customer Cart Handlers
  const handleAddToCart = async (product, delta = 1) => {
    const userId = currentCustomer ? currentCustomer.id : 'guest';
    const updatedCart = await dbEngine.carts.updateUserCart(userId, product, delta);
    setCartItems(updatedCart);
  };

  const handleUpdateQuantity = async (productId, delta) => {
    const targetProduct = productList.find(p => p.id === productId);
    if (targetProduct) {
      const userId = currentCustomer ? currentCustomer.id : 'guest';
      const updatedCart = await dbEngine.carts.updateUserCart(userId, targetProduct, delta);
      setCartItems(updatedCart);
    }
  };

  const handleRemoveItem = async (productId) => {
    const userId = currentCustomer ? currentCustomer.id : 'guest';
    const updatedCart = await dbEngine.carts.removeUserItem(userId, productId);
    setCartItems(updatedCart);
  };

  const handleOrderComplete = async () => {
    const userId = currentCustomer ? currentCustomer.id : 'guest';
    await dbEngine.orders.create({
      userId,
      customerName: currentCustomer ? currentCustomer.name : 'Valued Customer',
      items: cartItems,
      totalAmount: cartTotal,
      outlet: currentOutlet.name,
      paymentMethod: 'bKash Mobile Banking'
    });

    const clearedCart = await dbEngine.carts.clearUserCart(userId);
    setCartItems(clearedCart);
  };

  // Cart Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Products in current customer wishlist
  const wishlistProducts = productList.filter(p => wishlistIds.includes(p.id));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--gray-50)' }}>
      
      {/* Top Announcement Bar */}
      <AnnouncementBar lang={lang} setLang={setLang} />

      {/* Main Header */}
      <Header
        location={currentOutlet}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
        currentCustomer={currentCustomer}
        onCustomerLogout={handleCustomerLogout}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(product) => setQuickViewProduct(product)}
        viewMode={viewMode}
        onToggleViewMode={handleToggleAdminMode}
      />

      {/* View Mode Routing */}
      {viewMode === 'admin' && isAdminAuthenticated ? (
        <AdminPanel
          products={productList}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetDatabase={handleResetDatabase}
          onBackToShop={() => setViewMode('shop')}
          onLogout={handleAdminLogout}
        />
      ) : (
        <>
          {/* Mega Category Navigation Menu */}
          <MegaMenu
            activeCategory={activeCategory}
            onSelectCategory={(catId) => setActiveCategory(catId)}
          />

          {/* Main Content Area */}
          <main style={{ flex: 1 }}>
            
            {/* Real-time Department Category Grid */}
            <CategoryGrid
              products={productList}
              activeCategory={activeCategory}
              onSelectCategory={(catId) => setActiveCategory(catId)}
            />

            {/* Main Supermarket Product Catalog */}
            <ProductGrid
              products={productList}
              activeCategory={activeCategory}
              onSelectCategory={(catId) => setActiveCategory(catId)}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              cartItems={cartItems}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />

          </main>
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Live Messenger Support Widget */}
      <MessengerWidget
        cartItems={cartItems}
        cartTotal={cartTotal}
        currentOutlet={currentOutlet}
      />

      {/* Mobile App-like Bottom Navigation Bar */}
      <MobileNav
        viewMode={viewMode}
        onToggleViewMode={handleToggleAdminMode}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        currentCustomer={currentCustomer}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
      />

      {/* Modals & Customer Auth / Wishlist / Cart */}
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        wishlistProducts={wishlistProducts}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        customer={currentCustomer}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentOutlet={currentOutlet}
        onSelectOutlet={(outlet) => setCurrentOutlet(outlet)}
      />

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => setIsCheckoutModalOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        currentOutlet={currentOutlet}
        onOrderComplete={handleOrderComplete}
        currentCustomer={currentCustomer}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        cartItem={quickViewProduct ? cartItems.find(i => i.id === quickViewProduct.id) : null}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onCustomerLoginSuccess={handleCustomerLoginSuccess}
      />

    </div>
  );
}
