import React, { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle, Send, ExternalLink } from 'lucide-react';

export default function MessengerWidget({ cartItems = [], cartTotal = 0, currentOutlet }) {
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  
  const pageId = '1095909553615185';
  const messengerUrl = `https://m.me/${pageId}`;

  // Automatically load Facebook Customer Chat Plugin SDK
  useEffect(() => {
    // Set up Facebook SDK global settings
    window.fbAsyncInit = function() {
      if (window.FB) {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        });
      }
    };

    // Load SDK script
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleSendOrderToMessenger = () => {
    setIsSending(true);

    let orderPayload = {
      pageId: pageId,
      timestamp: new Date().toISOString(),
      items: cartItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        price: item.price * item.quantity
      })),
      total: cartTotal,
      outlet: currentOutlet ? currentOutlet.name : 'Gulshan Express Outlet'
    };

    // Format text
    const text = cartItems.length > 0 
      ? `🛒 SHWAPNO ORDER DISPATCH:\n${cartItems.map((item, i) => `${i+1}. ${item.name} x ${item.quantity} = ৳${item.price * item.quantity}`).join('\n')}\nTotal: ৳${cartTotal}`
      : 'Hello Shwapno Support!';

    // 1. Direct Messenger Dispatch
    window.open(messengerUrl, '_blank', 'noopener,noreferrer');

    // 2. Success state
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 4000);
    }, 600);
  };

  return (
    <>
      {/* Official Facebook Customer Chat Root Element */}
      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        attribution="install_email"
        page_id={pageId}
        theme_color="#0084FF"
        logged_in_greeting="Welcome to Shwapno Support! How can we assist your order?"
        logged_out_greeting="Welcome to Shwapno Support! How can we assist your order?"
      ></div>

      {/* Floating Messenger Action Button */}
      <div style={{ position: 'fixed', bottom: '5rem', right: '1.25rem', zIndex: 1000 }}>
        <button
          onClick={handleSendOrderToMessenger}
          className="animate-pulse-subtle"
          style={{
            background: 'linear-gradient(135deg, #0084FF 0%, #00C6FF 100%)',
            color: 'white',
            borderRadius: '50%',
            width: '58px',
            height: '58px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 132, 255, 0.45)',
            position: 'relative'
          }}
          title="Direct Messenger Chat to Page 1095909553615185"
        >
          <MessageCircle size={28} />
          {cartItems.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              backgroundColor: 'var(--gold-accent)',
              color: 'var(--navy-dark)',
              fontSize: '0.7rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white'
            }}>
              {cartItems.length}
            </span>
          )}
        </button>

        {sentSuccess && (
          <div style={{
            position: 'absolute',
            bottom: '4.2rem',
            right: 0,
            backgroundColor: '#0084FF',
            color: 'white',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.78rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <CheckCircle size={14} /> Messenger Opened!
          </div>
        )}
      </div>
    </>
  );
}
