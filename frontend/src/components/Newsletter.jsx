import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section style={{
      background: '#4B5834',
      color: 'var(--white)',
      padding: '50px 30px',
      borderRadius: 'var(--border-radius-lg)',
      margin: '60px auto',
      maxWidth: '1200px',
      textAlign: 'center',
      boxShadow: 'var(--shadow-md)',
      border: '2px solid var(--mustard-gold)'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '10px' }}>
          Stay Connected With ANU HOME FOODS
        </h2>
        <p style={{ color: '#f7ebd4', fontSize: '1.05rem', marginBottom: '25px' }}>
          Subscribe to get updates about fresh pickle batch releases, secret family recipes, and exclusive discount offers!
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '480px', margin: '0 auto' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Mail size={18} color="#777" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  border: 'none',
                  borderRadius: 'var(--border-radius-pill)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: 'var(--mustard-gold)',
                color: 'var(--dark-brown)',
                padding: '12px 28px',
                borderRadius: 'var(--border-radius-pill)',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', padding: '10px 24px', borderRadius: 'var(--border-radius-pill)', color: '#fff', fontWeight: 700 }}>
            <CheckCircle size={20} color="#00D154" /> Thank you for subscribing to ANU HOME FOODS!
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
