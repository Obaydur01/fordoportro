import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 1000 || subtotal === 0 ? 0 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SHWAPNO100' || couponCode.trim().toUpperCase() === 'FREEDEL') {
      setDiscountAmount(100);
      setCouponApplied(true);
    } else {
      alert('Invalid Promo Code! Use code: SHWAPNO100 for ৳100 Off');
    }
  };

  return (
    <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideLeft 0.3s ease-out',
          zIndex: 1001
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--navy-dark)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={22} color="var(--primary-red)" />
            <h3 style={{ color: 'white', margin: 0, fontSize: '1.15rem' }}>Your Basket ({cartItems.length})</h3>
          </div>
          <button onClick={onClose} style={{ color: 'white', padding: '0.2rem' }}>
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          backgroundColor: subtotal >= 1000 ? 'var(--green-light)' : 'var(--gold-light)',
          color: subtotal >= 1000 ? 'var(--green-emerald)' : 'var(--navy-dark)',
          padding: '0.65rem 1.25rem',
          fontSize: '0.82rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--gray-200)'
        }}>
          {subtotal >= 1000 ? (
            <span>🎉 Congratulations! You unlocked <strong>FREE Delivery</strong></span>
          ) : (
            <span>Add <strong>৳{1000 - subtotal}</strong> more for <strong>FREE Delivery</strong></span>
          )}
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{
                backgroundColor: 'var(--navy-light)',
                borderRadius: '50%',
                width: '70px',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                color: 'var(--navy-dark)'
              }}>
                <ShoppingBag size={36} />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>Your basket is empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Looks like you haven't added any fresh groceries yet.
              </p>
              <button onClick={onClose} className="btn-primary">
                Start Shopping Now
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--gray-200)',
                    backgroundColor: 'white'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-dark)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                      {item.unit} • <span style={{ color: 'var(--primary-red)', fontWeight: 700 }}>৳{item.price}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--navy-dark)', marginTop: '0.2rem' }}>
                      Total: ৳{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{ color: 'var(--gray-600)', padding: '0.2rem' }}
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--navy-dark)',
                      color: 'white',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden'
                    }}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        style={{ padding: '0.2rem 0.4rem', color: 'white' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 0.35rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        style={{ padding: '0.2rem 0.4rem', color: 'white' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout & Bill Summary Box */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: 'var(--gray-50)',
            borderTop: '2px solid var(--gray-200)'
          }}>
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="  "
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--gray-300)',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
                <Tag size={14} color="var(--gray-600)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <button
                type="submit"
                className="btn-outline"
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem' }}
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <div style={{ fontSize: '0.78rem', color: 'var(--green-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={14} /> Coupon applied! Saved ৳100
              </div>
            )}

            {/* Bill Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-600)' }}>
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>
              {/* <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-600)' }}>
                <span>Express Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--green-emerald)' }}>Negotiable</strong> : `৳${deliveryFee}`}</span>
              </div> */}
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--green-emerald)', fontWeight: 700 }}>
                  <span>Discount Coupon</span>
                  <span>- ৳{discountAmount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-dark)', paddingTop: '0.5rem', borderTop: '1px solid var(--gray-300)' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--primary-red)' }}>৳{grandTotal}</span>
              </div>
            </div>

            {/* Proceed to Checkout */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.85rem',
                fontSize: '1rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
