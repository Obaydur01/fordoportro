import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import ProductCard from './ProductCard';

export default function FlashSale({ products, onAddToCart, onQuickView, cartItems }) {
  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter(p => p.isFlashSale);

  return (
    <section style={{ margin: '2.5rem 0' }}>
      <div className="container">
        
        {/* Flash Sale Banner Header */}
        <div style={{
          backgroundColor: 'var(--primary-red)',
          color: 'white',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              backgroundColor: 'var(--gold-accent)',
              color: 'var(--navy-dark)',
              borderRadius: '50%',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(245, 158, 11, 0.6)'
            }}>
              <Zap size={22} fill="var(--navy-dark)" />
            </div>
            <div>
              <h2 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                ⚡ FLASH DEALS OF THE DAY
              </h2>
              <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>
                Limited quantity available. Grab before deal expires!
              </span>
            </div>
          </div>

          {/* Countdown Clock Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', marginRight: '0.3rem' }}>
              <Clock size={16} /> ENDS IN:
            </span>
            
            <div style={{
              backgroundColor: 'var(--navy-dark)',
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              fontSize: '1rem',
              minWidth: '36px',
              textAlign: 'center'
            }}>
              {String(timeLeft.hours).padStart(2, '0')}h
            </div>
            <span>:</span>
            <div style={{
              backgroundColor: 'var(--navy-dark)',
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              fontSize: '1rem',
              minWidth: '36px',
              textAlign: 'center'
            }}>
              {String(timeLeft.minutes).padStart(2, '0')}m
            </div>
            <span>:</span>
            <div style={{
              backgroundColor: 'var(--navy-dark)',
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              fontSize: '1rem',
              minWidth: '36px',
              textAlign: 'center',
              color: '#FCD34D'
            }}>
              {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          </div>

        </div>

        {/* Flash Sale Product Cards Grid */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid var(--primary-red)',
          borderTop: 'none',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
          padding: '1.5rem'
        }}>
          <div className="product-grid">
            {flashProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                cartItem={cartItems.find(item => item.id === product.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
