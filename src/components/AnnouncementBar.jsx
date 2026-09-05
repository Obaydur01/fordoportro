import React from 'react';
import { Zap, Truck, PhoneCall, Globe } from 'lucide-react';

export default function AnnouncementBar({ lang, setLang }) {
  return (
    <div style={{
      backgroundColor: 'var(--navy-dark)',
      color: 'white',
      fontSize: '0.82rem',
      padding: '0.45rem 0',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#FCD34D', fontWeight: 600 }}>
            <Zap size={14} color="#FCD34D" /> 1-HOUR EXPRESS DELIVERY
          </span>
          <span style={{ display: 'none', mdDisplay: 'inline-flex', alignItems: 'center', gap: '0.35rem', opacity: 0.9 }}>
            <Truck size={14} /> Free Shipping on orders over ৳1,000 (Use Code: <strong>FREEDEL</strong>)
          </span> */}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a href="tel:01732831228" style={{ color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <PhoneCall size={13} color="#E31837" /> Helpline: <strong>01732831228</strong>
          </a>

          {/* <button
            onClick={() => setLang(lang === 'EN' ? 'BN' : 'EN')}
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: 'white',
              padding: '0.15rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Globe size={13} /> {lang === 'EN' ? 'বাংলা' : 'English'}
          </button> */}
        </div>

      </div>
    </div>
  );
}
