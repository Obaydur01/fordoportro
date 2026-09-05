import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { dbEngine } from '../services/databaseEngine';

export default function AuthModal({ isOpen, onClose, onCustomerLoginSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const user = await dbEngine.users.login(loginEmail, loginPassword);
      onCustomerLoginSuccess(user);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Login failed!');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const newUser = await dbEngine.users.register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        address: regAddress
      });
      onCustomerLoginSuccess(newUser);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed!');
    }
  };

  const handleQuickDemoLogin = async (email, password) => {
    try {
      const user = await dbEngine.users.login(email, password);
      onCustomerLoginSuccess(user);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>

        {/* Modal Header */}
        <div style={{
          backgroundColor: 'var(--navy-dark)',
          color: 'white',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid var(--primary-red)'
        }}>
          <div>
            <h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>
              {tab === 'login' ? 'Customer Account Sign In' : 'Create Shwapno Account'}
            </h3>
            <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>
              Manage your personal grocery wishlist, cart & order history
            </span>
          </div>
          <button onClick={onClose} style={{ color: 'white', padding: '0.2rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', backgroundColor: 'var(--gray-50)' }}>
          <button
            onClick={() => { setTab('login'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: tab === 'login' ? 'var(--primary-red)' : 'var(--gray-600)',
              borderBottom: tab === 'login' ? '3px solid var(--primary-red)' : '3px solid transparent'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: tab === 'register' ? 'var(--primary-red)' : 'var(--gray-600)',
              borderBottom: tab === 'register' ? '3px solid var(--primary-red)' : '3px solid transparent'
            }}
          >
            New Customer Register
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>

          {/* Quick Demo Customer Account Switcher */}
          {tab === 'login' && (
            <div style={{
              backgroundColor: 'var(--navy-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              marginBottom: '1.25rem',
              border: '1px solid rgba(30, 58, 138, 0.15)'
            }}>
              {/* <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <UserCheck size={16} color="var(--primary-red)" /> Quick Demo Customer Accounts:
              </div> */}

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {/* <button
                  onClick={() => handleQuickDemoLogin('rahim@shwapno.com', 'user123')}
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.45rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--navy-dark)'
                  }}
                >
                  👤 Rahim (Dhanmondi)
                </button> */}

                {/* <button
                  onClick={() => handleQuickDemoLogin('fatima@shwapno.com', 'user123')}
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.45rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--navy-dark)'
                  }}
                >
                  👤 Fatima (Banani)
                </button> */}
              </div>
            </div>
          )}

          {errorMsg && (
            <div style={{
              backgroundColor: 'var(--primary-red-light)',
              color: 'var(--primary-red)',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              {errorMsg}
            </div>
          )}

          {tab === 'login' ? (
            /* Sign In Form */
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.35rem' }}>
                  Email or Mobile Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="Your Email Address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.9rem'
                    }}
                  />
                  <Mail size={16} color="var(--gray-600)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.35rem' }}>
                  Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Your Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.9rem'
                    }}
                  />
                  <Lock size={16} color="var(--gray-600)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
              >
                Sign In to Account <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--gray-300)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01700000000"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--gray-300)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--gray-300)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                  Default Delivery Address *
                </label>
                <input
                  type="text"
                  placeholder="House No, Road No, Area"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--gray-300)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
              >
                Create Account & Sign In <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
