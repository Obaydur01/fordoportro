import React, { useState } from 'react';
import { X, MapPin, CheckCircle, Clock } from 'lucide-react';
import { cities } from '../data/locations';

export default function LocationModal({ isOpen, onClose, currentOutlet, onSelectOutlet }) {
  const [selectedCityId, setSelectedCityId] = useState('dhaka');

  if (!isOpen) return null;

  const currentCity = cities.find(c => c.id === selectedCityId) || cities[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>

        {/* Header */}
        <div style={{
          backgroundColor: 'var(--navy-dark)',
          color: 'white',
          padding: '1.2rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin size={22} color="var(--primary-red)" />
            <div>
              <h3 style={{ color: 'white', margin: 0, fontSize: '1.15rem' }}>Select Shwapno Outlet</h3>
              {/* <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>Choose your neighborhood store for 1-hour express delivery</span> */}
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'white', padding: '0.3rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* City Selector Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--gray-200)',
          backgroundColor: 'var(--gray-50)',
          padding: '0.5rem 1.5rem 0 1.5rem'
        }}>
          {cities.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedCityId(city.id)}
              style={{
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: selectedCityId === city.id ? 'var(--primary-red)' : 'var(--gray-600)',
                borderBottom: selectedCityId === city.id ? '3px solid var(--primary-red)' : '3px solid transparent',
                transition: 'var(--transition)'
              }}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Outlets List */}
        <div style={{ padding: '1.25rem 1.5rem', maxHeight: '350px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-600)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            Available Outlets in {currentCity.name}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentCity.outlets.map(outlet => {
              const isSelected = currentOutlet.id === outlet.id;
              return (
                <div
                  key={outlet.id}
                  onClick={() => {
                    onSelectOutlet(outlet);
                    onClose();
                  }}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--primary-red)' : '1px solid var(--gray-200)',
                    backgroundColor: isSelected ? 'var(--primary-red-light)' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'var(--transition)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-dark)' }}>
                      {outlet.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginTop: '0.15rem' }}>
                      {outlet.area}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--green-emerald)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      marginTop: '0.4rem'
                    }}>
                      <Clock size={13} /> Est. Delivery: {outlet.estTime}
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle size={22} color="var(--primary-red)" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
