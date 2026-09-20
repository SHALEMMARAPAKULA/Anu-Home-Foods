import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | ANU HOME FOODS';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '50px 0 80px 0', background: 'var(--cream)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--dark-brown)', fontWeight: 600 }}>Contact Us</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: 'var(--dark-brown)', fontWeight: 800 }}>
            Get in Touch With Us 📞
          </h1>
          <p style={{ color: '#665a4e', fontSize: '1.1rem', marginTop: '8px' }}>
            Have questions about our homemade pickles or custom bulk orders? We'd love to help!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px', background: 'var(--white)', padding: '40px', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          {/* Left Info Column */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--dark-brown)', marginBottom: '20px' }}>
              Contact Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <MapPin size={22} color="var(--chili-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Kitchen Location</h4>
                  <p style={{ color: '#665a4e', fontSize: '0.9rem' }}>ANU HOME FOODS Unit, Andhra Pradesh, India</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Phone size={22} color="var(--chili-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Phone & WhatsApp</h4>
                  <p style={{ color: '#665a4e', fontSize: '0.9rem' }}>+91 98765 43210 (Mon-Sat: 9 AM - 7 PM)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Mail size={22} color="var(--chili-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Email Enquiries</h4>
                  <p style={{ color: '#665a4e', fontSize: '0.9rem' }}>support@anuhomefoods.com</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '35px', padding: '16px', background: 'var(--cream)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--dark-brown)', marginBottom: '6px' }}>📦 Bulk & Gift Orders</h4>
              <p style={{ fontSize: '0.85rem', color: '#665a4e' }}>Planning a festival gift or wedding function? We prepare custom-packaged pickle jars for events!</p>
            </div>
          </div>

          {/* Right Form Column */}
          <div>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--dark-brown)', marginBottom: '20px' }}>
                  Send a Message
                </h3>

                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="ramesh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message *</label>
                  <textarea
                    rows="4"
                    required
                    className="form-input"
                    placeholder="Tell us what you'd like to ask..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary-gradient" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle size={54} color="var(--pickle-green)" style={{ margin: '0 auto 15px auto' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '10px' }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ color: '#665a4e', fontSize: '0.95rem' }}>
                  Thank you for reaching out to ANU HOME FOODS. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary-outline"
                  style={{ marginTop: '20px', color: 'var(--chili-red)', borderColor: 'var(--chili-red)' }}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
