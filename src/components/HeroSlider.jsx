import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, ShieldCheck, Award } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Rajshahi Mango Festival 2026',
    subtitle: 'Directly sourced from Rajshahi orchards. 100% naturally ripened & chemical-free!',
    badge: 'UP TO 25% OFF',
    bgColor: 'linear-gradient(135deg, #0F2A4A 0%, #1E3A8A 50%, #111827 100%)',
    accentColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80',
    cta: 'Shop Fresh Mangoes'
  },
  {
    id: 2,
    title: 'Weekly Super Saver Grocery Bazaar',
    subtitle: 'Rice, Edible Oil, Spices, and Daily Essentials at unbeatable wholesale prices.',
    badge: 'SAVE UP TO ৳300',
    bgColor: 'linear-gradient(135deg, #E31837 0%, #880E1F 60%, #0F2A4A 100%)',
    accentColor: '#FFD700',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    cta: 'Explore Weekly Deals'
  },
  {
    id: 3,
    title: 'Authentic Padma River Hilsa & Fish',
    subtitle: 'Premium size silver Ilish delivered straight to your kitchen in temperature-controlled vans.',
    badge: 'FRESH ARRIVAL',
    bgColor: 'linear-gradient(135deg, #065F46 0%, #0F2A4A 100%)',
    accentColor: '#34D399',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&auto=format&fit=crop&q=80',
    cta: 'Buy Fresh Fish'
  }
];

export default function HeroSlider({ onCategorySelect }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section style={{ margin: '0.85rem 0' }}>
      <div className="container">

        {/* Main Hero Slider Box */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: slide.bgColor,
          minHeight: '260px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: 'var(--shadow-lg)',
          transition: 'background 0.5s ease-in-out'
        }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            padding: '2rem 1.75rem',
            width: '100%',
            alignItems: 'center',
            zIndex: 2
          }}>

            {/* Left Content */}
            <div style={{ color: 'white' }}>
              <div style={{
                backgroundColor: slide.accentColor,
                color: '#0F2A4A',
                fontWeight: 800,
                fontSize: '0.72rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-block',
                marginBottom: '0.75rem',
                letterSpacing: '0.5px'
              }}>
                ⚡ {slide.badge}
              </div>

              <h1 style={{
                fontSize: 'clamp(1.4rem, 4vw, 2.3rem)',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.18,
                marginBottom: '0.6rem'
              }}>
                {slide.title}
              </h1>

              <p style={{
                fontSize: 'clamp(0.82rem, 2vw, 0.98rem)',
                opacity: 0.9,
                marginBottom: '1.25rem',
                lineHeight: 1.45,
                maxWidth: '460px'
              }}>
                {slide.subtitle}
              </p>

              <button
                onClick={() => onCategorySelect('all')}
                className="btn-primary"
                style={{
                  fontSize: '0.9rem',
                  padding: '0.65rem 1.4rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {slide.cta} →
              </button>
            </div>

            {/* Right Hero Image Frame (Hidden on small phone screens) */}
            <div className="hide-mobile" style={{ justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '360px',
                height: '220px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
                border: '3px solid rgba(255,255,255,0.2)'
              }}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

          </div>

          {/* Slider Prev / Next Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            style={{
              position: 'absolute',
              left: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div style={{
            position: 'absolute',
            bottom: '0.6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.4rem',
            zIndex: 10
          }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: i === currentSlide ? '20px' : '7px',
                  height: '7px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: i === currentSlide ? 'var(--primary-red)' : 'rgba(255,255,255,0.5)',
                  transition: 'var(--transition)'
                }}
              />
            ))}
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          marginTop: '0.85rem'
        }}>

          <div style={{
            backgroundColor: 'white',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ backgroundColor: 'var(--primary-red-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--primary-red)' }}>
              <Clock size={18} />
            </div>
            <div>
              {/* <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--navy-dark)' }}>1-Hour Express Delivery</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gray-600)' }}>Speedy delivery from nearest outlet</div> */}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ backgroundColor: 'var(--green-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--green-emerald)' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--navy-dark)' }}>100% Fresh & Authentic</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gray-600)' }}>Directly sourced from trusted farms</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ backgroundColor: 'var(--gold-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--gold-accent)' }}>
              <Award size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--navy-dark)' }}>Super Saver Prices</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gray-600)' }}>Daily discounts & cashback rewards</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
