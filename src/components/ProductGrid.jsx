import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export default function ProductGrid({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
  cartItems,
  wishlistIds = [],
  onToggleWishlist
}) {
  const [sortBy, setSortBy] = useState('popular');

  // Filter products by selected category
  let filtered = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Sort products
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <section style={{ margin: '2.5rem 0' }}>
      <div className="container">
        
        {/* Section Header & Filters Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid var(--gray-200)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-dark)', margin: 0 }}>
              Fresh Supermarket Catalog
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--gray-600)' }}>
              Showing {filtered.length} products
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <SlidersHorizontal size={16} color="var(--gray-600)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--gray-300)',
                backgroundColor: 'white',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--navy-dark)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="popular">Popularity & Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                cartItem={cartItems.find(item => item.id === product.id)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-200)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>
              No products found in this section
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
              Try selecting another category or resetting your search filter.
            </p>
            <button 
              onClick={() => onSelectCategory('all')}
              className="btn-primary"
            >
              Show All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
