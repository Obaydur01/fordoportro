import React from 'react';
import { X, Star, ShieldCheck, Truck, Plus, Minus, Heart } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart, cartItem }) {
  if (!product) return null;

  const qtyInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px', width: '95%' }}>

        {/* Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--gray-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-red)', textTransform: 'uppercase' }}>
            Product Quick View
          </span>
          <button onClick={onClose} style={{ color: 'var(--gray-600)', padding: '0.2rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }}>

          {/* Left Image Box */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: '#F9FAFB',
            border: '1px solid var(--gray-200)',
            height: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {product.discount && (
              <span style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                backgroundColor: 'var(--primary-red)',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                {product.discount}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Right Product Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gray-600)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                Unit Spec: {product.unit}
              </div>

              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: '0.25rem' }}>
                {product.name}
              </h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--primary-red)', fontWeight: 700, marginBottom: '0.5rem' }}>
                {product.nameBn}
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--gray-600)', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', color: 'var(--gold-accent)' }}>
                  <Star size={15} fill="var(--gold-accent)" />
                </div>
                <span style={{ fontWeight: 800, color: 'var(--navy-dark)' }}>{product.rating}</span>
                <span>({product.reviews} reviews)</span>
                <span style={{ margin: '0 0.3rem' }}>•</span>
                <span style={{ color: 'var(--green-emerald)', fontWeight: 700 }}>In Stock ({product.stock} pcs)</span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-red)' }}>৳{product.price}</span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1rem', color: 'var(--gray-600)', textDecoration: 'line-through' }}>
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                {qtyInCart > 0 ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--navy-dark)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    padding: '0.2rem'
                  }}>
                    <button
                      onClick={() => onAddToCart(product, -1)}
                      style={{ padding: '0.5rem 0.85rem', color: 'white' }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontSize: '1rem', fontWeight: 800, padding: '0 0.85rem' }}>
                      {qtyInCart}
                    </span>
                    <button
                      onClick={() => onAddToCart(product, 1)}
                      style={{ padding: '0.5rem 0.85rem', color: 'white' }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '0.75rem' }}
                  >
                    <Plus size={18} /> Add to Basket
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={14} color="var(--green-emerald)" /> 100% Quality Guaranteed
                </span>
                {/* <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Truck size={14} color="var(--primary-red)" /> 1-Hour Express Delivery
                </span> */}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
