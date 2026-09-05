import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, Settings, X, LogOut, ChevronDown } from 'lucide-react';
import { products } from '../data/products';

export default function Header({
  onOpenCart,
  onOpenAuth,
  onOpenWishlist,
  currentCustomer,
  onCustomerLogout,
  cartCount,
  cartTotal,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  viewMode,
  onToggleViewMode
}) {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const filteredProducts = searchQuery.trim() === ''
    ? []
    : products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameBn && p.nameBn.includes(searchQuery)) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      backgroundColor: 'white',
      boxShadow: 'var(--shadow-md)',
      borderBottom: '1px solid var(--gray-200)'
    }}>
      <div className="container" style={{ padding: '0.65rem 0.75rem' }}>

        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'nowrap' }}>

          {/* Brand Logo - Fordopotro */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); if (viewMode !== 'shop') onToggleViewMode(); }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
          >
            <div style={{
              backgroundColor: 'var(--primary-red)',
              color: 'white',
              fontWeight: 800,
              fontSize: '1.25rem',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(227, 24, 55, 0.3)',
              letterSpacing: '-1px'
            }}>
              ফ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                color: 'var(--primary-red)',
                fontSize: '1.35rem',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.5px'
              }}>
                ফর্দপত্র
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--navy-dark)', fontWeight: 600, letterSpacing: '0.5px' }}>
                অনলাইন বাজার
              </span>
            </div>
          </a>

          {/* Desktop Search Bar (Hidden on Mobile) */}
          {viewMode === 'shop' && (
            <div className="hide-mobile" style={{ flex: 1, maxWidth: '560px', position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--gray-100)',
                borderRadius: 'var(--radius-full)',
                padding: '0.25rem 0.5rem 0.25rem 1rem',
                transition: 'var(--transition)'
              }}>
                <Search size={18} color="var(--gray-600)" style={{ marginRight: '0.5rem' }} />
                <input
                  type="text"
                  placeholder="Search fresh groceries, mango, hilsa fish, rice, oil..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '0.9rem',
                    color: 'var(--gray-900)'
                  }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ padding: '0.2rem', color: 'var(--gray-600)' }}>
                    <X size={16} />
                  </button>
                )}
                <button
                  className="btn-primary"
                  style={{
                    borderRadius: 'var(--radius-full)',
                    padding: '0.45rem 1rem',
                    fontSize: '0.85rem'
                  }}
                >
                  Search
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {showSearchResults && filteredProducts.length > 0 && (
                <div
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    right: 0,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-xl)',
                    overflow: 'hidden',
                    zIndex: 999
                  }}
                >
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setShowSearchResults(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.65rem 1rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid var(--gray-100)'
                      }}
                    >
                      <img src={product.image} alt={product.name} style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-dark)' }}>{product.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-red)', fontWeight: 700 }}>৳{product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>

            {/* Admin Toggle Button */}
            <button
              onClick={onToggleViewMode}
              style={{
                backgroundColor: viewMode === 'admin' ? 'var(--primary-red)' : 'var(--navy-dark)',
                color: 'white',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Settings size={15} />
              <span className="hide-mobile">{viewMode === 'admin' ? 'Customer View' : 'Admin Panel'}</span>
            </button>

            {viewMode === 'shop' && (
              <>
                {/* Desktop Account / Sign In */}
                <div className="hide-mobile" style={{ position: 'relative' }}>
                  {currentCustomer ? (
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        backgroundColor: 'var(--navy-light)',
                        padding: '0.45rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--navy-dark)'
                      }}
                    >
                      <User size={16} color="var(--primary-red)" />
                      <span>{currentCustomer.name}</span>
                      <ChevronDown size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={onOpenAuth}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--navy-dark)',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        padding: '0.45rem 0.75rem',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <User size={18} />
                      <span>Sign In</span>
                    </button>
                  )}

                  {/* Customer Dropdown */}
                  {showUserMenu && currentCustomer && (
                    <div
                      className="glass-panel"
                      style={{
                        position: 'absolute',
                        top: '110%',
                        right: 0,
                        width: '210px',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-xl)',
                        padding: '0.5rem',
                        zIndex: 999
                      }}
                    >
                      <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--gray-200)', marginBottom: '0.35rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--navy-dark)' }}>{currentCustomer.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--gray-600)' }}>{currentCustomer.email}</div>
                      </div>

                      <button
                        onClick={() => {
                          onOpenWishlist();
                          setShowUserMenu(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.45rem',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: 'var(--gray-800)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <Heart size={15} color="var(--primary-red)" /> Saved Wishlist ({wishlistCount})
                      </button>

                      <button
                        onClick={() => {
                          onCustomerLogout();
                          setShowUserMenu(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.45rem',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: 'var(--primary-red)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          borderTop: '1px solid var(--gray-200)',
                          marginTop: '0.35rem'
                        }}
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>

                {/* Desktop Wishlist Button */}
                <div className="hide-mobile" style={{ position: 'relative' }}>
                  <button
                    onClick={onOpenWishlist}
                    style={{
                      backgroundColor: 'var(--navy-light)',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--navy-dark)'
                    }}
                  >
                    <Heart size={18} fill={wishlistCount > 0 ? 'var(--primary-red)' : 'none'} color={wishlistCount > 0 ? 'var(--primary-red)' : 'var(--navy-dark)'} />
                  </button>
                  {wishlistCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      backgroundColor: 'var(--gold-accent)',
                      color: 'var(--navy-dark)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {wishlistCount}
                    </span>
                  )}
                </div>

                {/* Basket Cart Trigger Button */}
                <button
                  onClick={onOpenCart}
                  className="btn-primary"
                  style={{
                    borderRadius: 'var(--radius-full)',
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <ShoppingBag size={18} />
                  <span className="hide-mobile" style={{ fontWeight: 700 }}>৳{cartTotal}</span>
                  {cartCount > 0 && (
                    <span style={{
                      backgroundColor: 'var(--gold-accent)',
                      color: 'var(--navy-dark)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      padding: '0.05rem 0.4rem',
                      marginLeft: '0.15rem'
                    }}>
                      {cartCount}
                    </span>
                  )}
                </button>
              </>
            )}

          </div>

        </div>

        {/* Mobile Search Bar Row */}
        {viewMode === 'shop' && (
          <div className="show-mobile" style={{ marginTop: '0.5rem', position: 'relative', width: '100%' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--gray-100)',
              borderRadius: 'var(--radius-full)',
              padding: '0.25rem 0.5rem 0.25rem 0.85rem',
              width: '100%'
            }}>
              <Search size={16} color="var(--gray-600)" style={{ marginRight: '0.4rem' }} />
              <input
                type="text"
                placeholder="Search groceries..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '0.85rem',
                  color: 'var(--gray-900)'
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ padding: '0.2rem', color: 'var(--gray-600)' }}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile Live Suggestions Dropdown */}
            {showSearchResults && filteredProducts.length > 0 && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  right: 0,
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-xl)',
                  overflow: 'hidden',
                  zIndex: 999
                }}
              >
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setShowSearchResults(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.6rem 0.85rem',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--gray-100)'
                    }}
                  >
                    <img src={product.image} alt={product.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy-dark)' }}>{product.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--primary-red)', fontWeight: 700 }}>৳{product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
