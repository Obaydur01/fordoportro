import React from 'react';
import { Plus, Minus, Eye, Star, Heart } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  cartItem,
  isWishlisted,
  onToggleWishlist
}) {
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--gray-200)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'var(--transition)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.borderColor = 'var(--gray-300)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--gray-200)';
      }}
    >
      {/* Top Badges */}
      <div style={{
        position: 'absolute',
        top: '0.6rem',
        left: '0.6rem',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem'
      }}>
        {product.discount && (
          <span style={{
            backgroundColor: 'var(--primary-red)',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.72rem',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 2px 6px rgba(227,24,55,0.3)'
          }}>
            {product.discount}
          </span>
        )}
        {product.isBestSeller && (
          <span style={{
            backgroundColor: 'var(--gold-accent)',
            color: 'var(--navy-dark)',
            fontWeight: 800,
            fontSize: '0.68rem',
            padding: '0.15rem 0.45rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            BESTSELLER
          </span>
        )}
      </div>

      {/* Floating Action Buttons: Wishlist & Quick View */}
      <div style={{
        position: 'absolute',
        top: '0.6rem',
        right: '0.6rem',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}>
        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          style={{
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            color: isWishlisted ? 'var(--primary-red)' : 'var(--gray-600)',
            transition: 'var(--transition)'
          }}
        >
          <Heart size={16} fill={isWishlisted ? 'var(--primary-red)' : 'none'} color={isWishlisted ? 'var(--primary-red)' : 'var(--gray-600)'} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          title="Quick View"
          style={{
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--gray-600)',
            transition: 'var(--transition)'
          }}
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Product Image Frame */}
      <div 
        onClick={() => onQuickView(product)}
        style={{
          height: '170px',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#F9FAFB',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>

      {/* Details Box */}
      <div style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Unit Weight / Pack Spec */}
          <div style={{ fontSize: '0.72rem', color: 'var(--gray-600)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            {product.unit}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--navy-dark)',
              margin: '0 0 0.3rem 0',
              lineHeight: 1.3,
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', color: 'var(--gold-accent)' }}>
              <Star size={13} fill="var(--gold-accent)" />
            </div>
            <span style={{ fontWeight: 700, color: 'var(--gray-800)' }}>{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-red)' }}>
              ৳{product.price}
            </div>
            {product.originalPrice && (
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', textDecoration: 'line-through' }}>
                ৳{product.originalPrice}
              </div>
            )}
          </div>

          {/* Add to Cart or Stepper */}
          {qtyInCart > 0 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--navy-dark)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => onAddToCart(product, -1)}
                style={{ padding: '0.35rem 0.55rem', color: 'white' }}
              >
                <Minus size={14} />
              </button>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, padding: '0 0.4rem' }}>
                {qtyInCart}
              </span>
              <button
                onClick={() => onAddToCart(product, 1)}
                style={{ padding: '0.35rem 0.55rem', color: 'white' }}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(product, 1)}
              style={{
                backgroundColor: 'var(--primary-red-light)',
                color: 'var(--primary-red)',
                border: '1px solid rgba(227,24,55,0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '0.4rem 0.75rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-red)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-red-light)';
                e.currentTarget.style.color = 'var(--primary-red)';
              }}
            >
              <Plus size={14} /> Add
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
