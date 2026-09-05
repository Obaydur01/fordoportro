import React from 'react';
import { categories } from '../data/categories';

export default function CategoryGrid({ products = [], activeCategory, onSelectCategory }) {
  const displayCats = categories.filter(c => c.id !== 'all');

  return (
    <section style={{ margin: '1.75rem 0' }}>
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
              ফর্দপত্র (Shop By Category)
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--gray-600)' }}>
              Browse through our fresh supermarket departments
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            style={{ color: 'var(--primary-red)', fontWeight: 700, fontSize: '0.82rem', whiteSpace: 'nowrap' }}
          >
            View All ({products.length}) →
          </button>
        </div>

        {/* Responsive Grid Layout (Clean Category Cards without Item Badges) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '0.75rem'
        }}>
          {displayCats.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 0.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 0 2px var(--primary-red), var(--shadow-md)' : 'var(--shadow-sm)',
                  border: isSelected ? '1px solid var(--primary-red)' : '1px solid var(--gray-200)',
                  transition: 'var(--transition)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--gray-100)',
                  backgroundColor: 'var(--navy-light)'
                }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <div style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: isSelected ? 'var(--primary-red)' : 'var(--navy-dark)',
                    lineHeight: 1.25,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {cat.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
