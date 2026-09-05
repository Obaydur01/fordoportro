import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Eye, EyeOff, AlertTriangle, KeyRound } from 'lucide-react';
import { dbEngine } from '../services/databaseEngine';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLockedOut) {
      setErrorMessage('Security Lockout: Too many failed login attempts. Please wait 30 seconds.');
      return;
    }

    // Verify login directly with Database Engine
    const result = await dbEngine.admin.verifyCredentials(username, password);

    if (result.success) {
      setErrorMessage('');
      setFailedAttempts(0);
      onLoginSuccess();
    } else {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= 3) {
        setIsLockedOut(true);
        setErrorMessage('🚨 Security Alert: 3 Failed Attempts. Admin login locked for 30 seconds.');
        setTimeout(() => {
          setIsLockedOut(false);
          setFailedAttempts(0);
          setErrorMessage('');
        }, 30000);
      } else {
        setErrorMessage(`Invalid Admin Credentials! (${3 - nextAttempts} attempt(s) remaining)`);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>

        {/* Header */}
        <div style={{
          backgroundColor: 'var(--navy-dark)',
          color: 'white',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid var(--primary-red)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              backgroundColor: 'var(--primary-red)',
              borderRadius: '50%',
              padding: '0.4rem',
              color: 'white',
              display: 'flex'
            }}>
              <Lock size={18} />
            </div>
            <div>
              <h3 style={{ color: 'white', margin: 0, fontSize: '1.15rem' }}>Restricted Admin Login</h3>
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>🔥 Firebase Authentication Gateway</span>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'white', padding: '0.2rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem' }}>

          {/* Quick Demo Credentials Tip */}
          {/* <div style={{
            backgroundColor: 'var(--navy-light)',
            color: 'var(--navy-dark)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem',
            marginBottom: '1.25rem',
            border: '1px solid rgba(30, 58, 138, 0.15)'
          }}>
            <div style={{ fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={16} color="var(--primary-red)" /> Verified Database Admin:
            </div>
            <div>Username: <code style={{ fontWeight: 700, color: 'var(--primary-red)' }}>admin@shwapno.com</code></div>
            <div>Password: <code style={{ fontWeight: 700, color: 'var(--primary-red)' }}>shwapno2026</code></div>
          </div> */}

          {/* Error Message */}
          {errorMessage && (
            <div style={{
              backgroundColor: 'var(--primary-red-light)',
              color: 'var(--primary-red)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid var(--primary-red)'
            }}>
              <AlertTriangle size={18} /> {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* Username Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.35rem' }}>
                Admin Email / Username *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="Email Address"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLockedOut}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--gray-300)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <KeyRound size={16} color="var(--gray-600)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.35rem' }}>
                Admin Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLockedOut}
                  style={{
                    width: '100%',
                    padding: '0.65rem 2.4rem 0.65rem 2.4rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--gray-300)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <Lock size={16} color="var(--gray-600)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-600)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLockedOut}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.8rem',
                fontSize: '0.95rem',
                opacity: isLockedOut ? 0.6 : 1
              }}
            >
              <ShieldCheck size={18} /> Verify Database Credentials
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
