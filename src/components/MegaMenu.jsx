import React, { useState } from 'react';
import { categories, megaMenuItems } from '../data/categories';
import { ChevronDown, Zap, Flame, ShieldCheck, Grid } from 'lucide-react';

export default function MegaMenu({ activeCategory, onSelectCategory }) {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  return (
    <nav style={{
      backgroundColor: 'var(--navy-dark)',
      color: 'white',
      borderBottom: '3px solid var(--primary-red)'
    }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

          {/* Mega Menu Toggle Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <div
              style={{
                backgroundColor: 'var(--primary-red)',
                color: 'white',
                padding: '0.8rem 1.25rem',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                letterSpacing: '0.5px'
              }}
            >
              <Grid size={18} />
              <span>ফর্দপত্র</span>
              <ChevronDown size={16} />
            </div >

            {/* Hover Mega Menu Window */}
            {showMegaMenu && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '780px',
                  backgroundColor: 'white',
                  color: 'var(--gray-900)',
                  boxShadow: 'var(--shadow-xl)',
                  borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1.5rem',
                  zIndex: 950
                }}
              >
                {megaMenuItems.map((col, idx) => (
                  <div key={idx}>
                    <h4 style={{
                      color: 'var(--primary-red)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '2px solid var(--primary-red-light)',
                      paddingBottom: '0.35rem'
                    }}>
                      {col.title}
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {col.items.map((item, iIdx) => (
                        <li key={iIdx}>
                          <button
                            onClick={() => {
                              onSelectCategory(item.categoryId);
                              setShowMegaMenu(false);
                            }}
                            style={{
                              fontSize: '0.84rem',
                              color: 'var(--gray-800)',
                              fontWeight: 500,
                              textAlign: 'left',
                              width: '100%',
                              padding: '0.2rem 0',
                              transition: 'var(--transition)'
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary-red)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--gray-800)'}
                          >
                            • {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Pill Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            overflowX: 'auto',
            padding: '0.35rem 0',
            scrollbarWidth: 'none'
          }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                    color: isActive ? '#FFD700' : 'white',
                    padding: '0.55rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    whiteSpace: 'nowrap',
                    transition: 'var(--transition)',
                    borderBottom: isActive ? '2px solid #FFD700' : '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Quick Offer Badges */}
          <div style={{ display: 'none', lgDisplay: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: '#FCD34D',
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              padding: '0.3rem 0.65rem',
              borderRadius: 'var(--radius-full)'
            }}>
              <Zap size={14} /> Flash Deals
            </span>
          </div>

        </div>
      </div>
    </nav>
  );
}
