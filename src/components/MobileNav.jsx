import React from 'react';
import { Home, Grid, Heart, ShoppingBag, Settings, User } from 'lucide-react';

export default function MobileNav({
  viewMode,
  onToggleViewMode,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  currentCustomer,
  cartCount,
  cartTotal,
  wishlistCount
}) {
  return (
    <div className="mobile-bottom-nav">
      
      {/* 1. Home / Shop */}
      <button
        onClick={() => {
          if (viewMode !== 'shop') onToggleViewMode();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: viewMode === 'shop' ? 'var(--primary-red)' : 'var(--gray-600)',
          fontSize: '0.68rem',
          fontWeight: 700
        }}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      {/* 2. Wishlist */}
      <button
        onClick={onOpenWishlist}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: wishlistCount > 0 ? 'var(--primary-red)' : 'var(--gray-600)',
          fontSize: '0.68rem',
          fontWeight: 700,
          position: 'relative'
        }}
      >
        <Heart size={20} fill={wishlistCount > 0 ? 'var(--primary-red)' : 'none'} />
        <span>Wishlist</span>
        {wishlistCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '8px',
            backgroundColor: 'var(--gold-accent)',
            color: 'var(--navy-dark)',
            fontSize: '0.6rem',
            fontWeight: 800,
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {wishlistCount}
          </span>
        )}
      </button>

      {/* 3. Basket Cart (Highlighted Center FAB) */}
      <button
        onClick={onOpenCart}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--primary-red)',
          color: 'white',
          borderRadius: '50%',
          width: '52px',
          height: '52px',
          marginTop: '-18px',
          boxShadow: '0 4px 12px rgba(227, 24, 55, 0.4)',
          position: 'relative'
        }}
      >
        <ShoppingBag size={22} />
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            backgroundColor: 'var(--gold-accent)',
            color: 'var(--navy-dark)',
            fontSize: '0.65rem',
            fontWeight: 800,
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {cartCount}
          </span>
        )}
      </button>

      {/* 4. Customer Account / Login */}
      <button
        onClick={onOpenAuth}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: currentCustomer ? 'var(--green-emerald)' : 'var(--gray-600)',
          fontSize: '0.68rem',
          fontWeight: 700
        }}
      >
        <User size={20} />
        <span>{currentCustomer ? 'Account' : 'Sign In'}</span>
      </button>

      {/* 5. Admin Panel */}
      <button
        onClick={onToggleViewMode}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: viewMode === 'admin' ? 'var(--primary-red)' : 'var(--gray-600)',
          fontSize: '0.68rem',
          fontWeight: 700
        }}
      >
        <Settings size={20} />
        <span>Admin</span>
      </button>

    </div>
  );
}
