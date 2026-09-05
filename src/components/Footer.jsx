import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Footer() {
  const fbPageUrl = 'https://www.facebook.com/1095909553615185';

  return (
    <footer style={{ backgroundColor: 'var(--navy-dark)', color: 'white', paddingTop: '3rem', marginTop: '3rem', borderTop: '4px solid var(--primary-red)' }}>
      <div className="container">

        {/* Value Proposition Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '2.5rem'
        }}>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--gold-accent)' }}>
              <Truck size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>1-Hour Express Delivery</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Fastest grocery delivery across Dhaka & Chattogram</div>
            </div>
          </div> */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--green-emerald)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>100% Quality Guarantee</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Fresh produce sourced directly from Supplier</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary-red)' }}>
              <RefreshCw size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>Instant Returns Policy</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>No questions asked item replacement</div>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          paddingBottom: '2.5rem'
        }}>

          {/* Brand Info Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                backgroundColor: 'var(--primary-red)',
                color: 'white',
                fontWeight: 800,
                fontSize: '1.2rem',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                F
              </div>
              <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800 }}>Fordopotro</span>
            </div>

            <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Fordoporto is Bangladesh's Online Shop where you can find daily essentials at minimal cost.
            </p>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Our Location
            </p>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Mirpur-6, Kacha Bazar Road, Mirpur, Dhaka
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={fbPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition)'
                }}
                title="Fordopotro Official Facebook Page"
              >
                <Facebook size={18} />
              </a>
              {/* <a href="#" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Instagram size={18} />
              </a>
              <a href="#" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Youtube size={18} />
              </a> */}
            </div>
          </div>

          {/* Quick Links Column */}
          {/* <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Supermarket Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', opacity: 0.85, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Fruits & Fresh Vegetables</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Meat, Poultry & River Fish</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Dairy, Eggs & Bakery</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Rice, Edible Oil & Spices</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Snacks & Beverage Bar</a></li>
            </ul>
          </div> */}

          {/* Customer Care Column */}
          {/* <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', opacity: 0.85, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><a href={fbPageUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Facebook Support Page</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Outlet Store Locator</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Delivery Coverage Area</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy & Terms</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Corporate Enquiries</a></li>
            </ul>
          </div> */}

          {/* Contact Details Column */}
          {/* <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', opacity: 0.9 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="var(--primary-red)" />
                <span>Hotline: 16469 (24/7 Service)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="var(--primary-red)" />
                <span>support@shwapno.com</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={16} color="var(--primary-red)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                <span>ACIL Logistics Ltd, Tejgaon Industrial Area, Dhaka-1208</span>
              </div>
            </div>
          </div> */}

        </div>

        {/* Copyright Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '1.25rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          opacity: 0.75
        }}>
          {/* <div>© 2026 Shwapno Online Grocery Bangladesh. All rights reserved.</div>
          <div>Powered by ACI Logistics Supermarkets</div> */}
        </div>

      </div>
    </footer>
  );
}
