import React from 'react';
import { Smartphone, Gift, ArrowRight } from 'lucide-react';

export default function BannerSection({ onSelectCategory }) {
  return (
    <section style={{ margin: '2.5rem 0' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          
          {/* Banner 1: Buy 1 Get 1 Special */}
          <div style={{
            background: 'linear-gradient(135deg, #E31837 0%, #0F2A4A 100%)',
            color: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ zIndex: 2, maxWidth: '240px' }}>
              <span style={{
                backgroundColor: 'var(--gold-accent)',
                color: 'var(--navy-dark)',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                marginBottom: '0.75rem'
              }}>
                <Gift size={13} /> WEEKLY BOGO OFFER
              </span>
              <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.5rem' }}>
                BUY 1 GET 1 FREE!
              </h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1.25rem' }}>
                On selected cooking oils, snacks, milk packs & daily hygiene soaps.
              </p>
              <button
                onClick={() => onSelectCategory('all')}
                className="btn-outline"
                style={{ backgroundColor: 'white', color: 'var(--primary-red)', border: 'none', fontWeight: 700 }}
              >
                Shop BOGO Deals →
              </button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80"
              alt="Grocery deals"
              style={{
                width: '140px',
                height: '140px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                transform: 'rotate(6deg)'
              }}
            />
          </div>

          {/* Banner 2: Download Mobile App */}
          <div style={{
            background: 'linear-gradient(135deg, #0F2A4A 0%, #1E3A8A 100%)',
            color: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ zIndex: 2, maxWidth: '260px' }}>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.75rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                marginBottom: '0.75rem'
              }}>
                <Smartphone size={13} /> SHWAPNO APP
              </span>
              <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.5rem' }}>
                Order Fresh Groceries on Mobile
              </h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1.25rem' }}>
                Get ৳100 discount on your first mobile app order with code <strong>APP100</strong>.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ backgroundColor: 'black', color: 'white', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700 }}>
                  Google Play
                </span>
                <span style={{ backgroundColor: 'black', color: 'white', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700 }}>
                  App Store
                </span>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '1.25rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-accent)'
            }}>
              <Smartphone size={64} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
