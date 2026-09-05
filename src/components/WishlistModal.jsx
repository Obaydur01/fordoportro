import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistProducts,
  onToggleWishlist,
  onAddToCart,
  customer
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', width: '95%' }}>
        
        {/* Header */}
        <div style={{
          backgroundColor: 'var(--navy-dark)',
          color: 'white',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid var(--primary-red)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Heart size={22} fill="var(--primary-red)" color="var(--primary-red)" />
            <div>
              <h3 style={{ color: 'white', margin: 0, fontSize: '1.15rem' }}>
                {customer ? `${customer.name}'s Saved Wishlist` : 'Personal Wishlist'} ({wishlistProducts.length})
              </h3>
              <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>Saved items stored permanently in database</span>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'white', padding: '0.2rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', maxHeight: '480px', overflowY: 'auto' }}>
          {wishlistProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                backgroundColor: 'var(--primary-red-light)',
                borderRadius: '50%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                color: 'var(--primary-red)'
              }}>
                <Heart size={32} />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>
                Your wishlist is empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Click the heart icon on any grocery item to save it to your account wishlist!
              </p>
              <button onClick={onClose} className="btn-primary">
                Browse Grocery Catalog
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--gray-200)',
                    backgroundColor: 'white'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '54px', height: '54px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-dark)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gray-600)' }}>
                        {p.unit} • <span style={{ color: 'var(--primary-red)', fontWeight: 800 }}>৳{p.price}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => onAddToCart(p, 1)}
                      className="btn-primary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                    >
                      <ShoppingBag size={14} /> Add to Basket
                    </button>

                    <button
                      onClick={() => onToggleWishlist(p.id)}
                      style={{ padding: '0.45rem', color: 'var(--gray-600)' }}
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
