import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Truck, ShieldCheck, CreditCard, ArrowRight, Package, MapPin, MessageCircle, ExternalLink, Copy, Check } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  currentOutlet,
  onOrderComplete,
  currentCustomer
}) {
  const [step, setStep] = useState(1); // 1: Info & Options, 2: Order Placed Success
  const [deliverySlot, setDeliverySlot] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  const fbPageUrl = 'https://www.facebook.com/1095909553615185';
  const messengerUrl = 'https://m.me/1095909553615185';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: 'Call before delivery'
  });

  // Pre-fill customer details if logged in
  useEffect(() => {
    if (currentCustomer) {
      setFormData({
        name: currentCustomer.name || 'Valued Customer',
        phone: currentCustomer.phone || '01712345678',
        address: currentCustomer.address || 'House 14, Road 5, Dhanmondi, Dhaka',
        notes: 'Call before delivery'
      });
    }
  }, [currentCustomer, isOpen]);

  if (!isOpen) return null;

  const generateOrderSummaryText = (newOrderId) => {
    const itemList = cartItems.map((item, idx) =>
      `${idx + 1}. ${item.name} (${item.unit}) x ${item.quantity} = ৳${item.price * item.quantity}`
    ).join('\n');

    return (
      `🛒 NEW FORDOPORTRO GROCERY ORDER (${newOrderId})

👤 Customer Information:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Delivery Address: ${formData.address}
📦 Ordered Items (${cartItems.length}):
${itemList}

💰 Payment & Total:
• Subtotal: ৳${cartTotal}
• Delivery Fee: Negotiable
• Payment Method: ${paymentMethod.toUpperCase()}
• TOTAL PAYABLE: ৳${cartTotal}

⚡ Please confirm order delivery!`
    );
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newId = '#SHW-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newId);

    const summaryText = generateOrderSummaryText(newId);

    // Copy order summary to clipboard
    try {
      navigator.clipboard.writeText(summaryText);
      setCopied(true);
    } catch (err) {
      console.log('Clipboard copy err:', err);
    }

    // Direct Messenger Launch to m.me/1095909553615185
    window.open(messengerUrl, '_blank', 'noopener,noreferrer');

    // Trigger Order Complete in App Database
    onOrderComplete();

    // Show Order Success Screen
    setStep(2);
  };

  const handleCopyOrderSummary = () => {
    const summaryText = generateOrderSummaryText(orderId);
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', width: '95%' }}>

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
              {step === 2 ? '🎉 Order Placed Successfully!' : 'Fordoportro Checkout'}
            </h3>
            <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>
              {step === 2 ? `Order ID: ${orderId}` : `Fulfilling from Dhaka Mirpur `}
            </span>
          </div>
          <button onClick={onClose} style={{ color: 'white', padding: '0.2rem' }}>
            <X size={22} />
          </button>
        </div>

        {step === 1 ? (
          /* Step 1: Checkout Form */
          <form onSubmit={handlePlaceOrder} style={{ padding: '1.5rem', maxHeight: '550px', overflowY: 'auto' }}>

            {/* Delivery Contact Info */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--primary-red)" /> 1. Delivery Address & Contact
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    Mobile Number (for SMS & Call) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: '0.25rem' }}>
                  Street Address / House & Flat No. *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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

            {/* Delivery Slot Selection */}
            {/* <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} color="var(--primary-red)" /> 2. Delivery Time Slot
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div
                  onClick={() => setDeliverySlot('express')}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: deliverySlot === 'express' ? '2px solid var(--primary-red)' : '1px solid var(--gray-300)',
                    backgroundColor: deliverySlot === 'express' ? 'var(--primary-red-light)' : 'white',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--navy-dark)' }}>
                    ⚡ 1-Hour Express Delivery
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.2rem' }}>
                    Arrives in 30-60 mins
                  </div>
                </div>

                <div
                  onClick={() => setDeliverySlot('evening')}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: deliverySlot === 'evening' ? '2px solid var(--primary-red)' : '1px solid var(--gray-300)',
                    backgroundColor: deliverySlot === 'evening' ? 'var(--primary-red-light)' : 'white',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--navy-dark)' }}>
                    📅 Evening Slot (6 PM - 9 PM)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.2rem' }}>
                    Scheduled delivery today
                  </div>
                </div>
              </div>
            </div> */}

            {/* Payment Method Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--navy-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={18} color="var(--primary-red)" /> 2. Select Payment Option
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div
                  onClick={() => setPaymentMethod('bKash Mobile Banking')}
                  style={{
                    padding: '0.85rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'bKash Mobile Banking' ? '2px solid #E2136E' : '1px solid var(--gray-300)',
                    backgroundColor: paymentMethod === 'bKash Mobile Banking' ? '#FFF0F6' : 'white',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#E2136E' }}>bKash</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gray-600)' }}>Mobile Banking</div>
                </div>

                <div
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  style={{
                    padding: '0.85rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'Cash on Delivery (COD)' ? '2px solid var(--navy-dark)' : '1px solid var(--gray-300)',
                    backgroundColor: paymentMethod === 'Cash on Delivery (COD)' ? 'var(--navy-light)' : 'white',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy-dark)' }}>Cash on Delivery</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gray-600)' }}>Pay upon arrival</div>
                </div>

                {/* <div
                  onClick={() => setPaymentMethod('Visa / Mastercard')}
                  style={{
                    padding: '0.85rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'Visa / Mastercard' ? '2px solid var(--primary-red)' : '1px solid var(--gray-300)',
                    backgroundColor: paymentMethod === 'Visa / Mastercard' ? 'var(--primary-red-light)' : 'white',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy-dark)' }}>Visa / Card</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gray-600)' }}>Credit/Debit</div>
                </div> */}
              </div>
            </div>

            {/* Facebook Messenger Order Dispatch Callout */}
            <div style={{
              backgroundColor: '#E6F0FA',
              color: '#004385',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid #0084FF'
            }}>
              <MessageCircle size={18} color="#0084FF" />
              <span>Clicking Confirm will open Messenger (<strong>Fordoportro Official Page And Paste The Order please  or Contact with us on Facebook Page or Call 01731831228</strong>) with your order summary!</span>
            </div>

            {/* Total Summary Bar & Place Order Button */}
            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid var(--gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--gray-600)' }}>Total Payable</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-red)' }}>৳{cartTotal}</div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #0084FF 0%, #00C6FF 100%)',
                  padding: '0.85rem 1.75rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 14px rgba(0, 132, 255, 0.4)'
                }}
              >
                Confirm & Send to Messenger <ArrowRight size={18} />
              </button>
            </div>

          </form>
        ) : (
          /* Step 2: Order Placed & Sent to Messenger Success */
          <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              backgroundColor: '#D0E4FF',
              color: '#0084FF',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle size={48} />
            </div>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>
              Order Created & Summary Copied!
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', maxWidth: '460px', margin: '0 auto 1.25rem auto' }}>
              Order <strong>{orderId}</strong> recorded in database! The complete order summary has been automatically copied to your clipboard so you can paste it into Facebook Messenger.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <button
                onClick={handleCopyOrderSummary}
                className="btn-outline"
                style={{ padding: '0.7rem 1.2rem', fontSize: '0.85rem', fontWeight: 700 }}
              >
                {copied ? <><Check size={16} color="var(--green-emerald)" /> Summary Copied!</> : <><Copy size={16} /> Copy Order Text</>}
              </button>

              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #0084FF 0%, #00C6FF 100%)',
                  padding: '0.7rem 1.4rem',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  textDecoration: 'none'
                }}
              >
                Open Messenger (m.me/1095909553615185) <ExternalLink size={16} />
              </a>
            </div>

            <div>
              <button
                onClick={() => {
                  setStep(1);
                  onClose();
                }}
                className="btn-outline"
                style={{ padding: '0.65rem 1.75rem', fontWeight: 700 }}
              >
                Close & Return to Shop
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
