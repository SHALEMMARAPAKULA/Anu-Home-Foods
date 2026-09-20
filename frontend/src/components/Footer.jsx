import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-brand">
            <h3 className="footer-logo">ANU HOME FOODS</h3>
            <p className="footer-tagline">"Eat Good and Feel Good!"</p>
            <p className="footer-about-text">
              100% authentic homemade Andhra pickles crafted with traditional recipes, sun-cured spices, and pure cold-pressed oils. Delivered fresh from our kitchen to your dining table.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/">Home</Link></li>
              <li className="footer-link-item"><Link to="/shop">Shop Pickles</Link></li>
              <li className="footer-link-item"><Link to="/about">Our Story</Link></li>
              <li className="footer-link-item"><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h4 className="footer-col-title">Customer Support</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><a href="#shipping">Shipping & Delivery</a></li>
              <li className="footer-link-item"><a href="#returns">Returns & Refunds</a></li>
              <li className="footer-link-item"><a href="#faqs">Pickle Care FAQs</a></li>
              <li className="footer-link-item"><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="footer-col-title">Kitchen Contact</h4>
            <ul className="footer-links-list" style={{ gap: '14px' }}>
              <li style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', color: '#f7ebd4' }}>
                <MapPin size={18} color="var(--mustard-gold)" style={{ flexShrink: 0 }} />
                <span>ANU HOME FOODS Unit, Andhra Pradesh, India</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', color: '#f7ebd4' }}>
                <Phone size={18} color="var(--mustard-gold)" style={{ flexShrink: 0 }} />
                <span>+91 98765 43210</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', color: '#f7ebd4' }}>
                <Mail size={18} color="var(--mustard-gold)" style={{ flexShrink: 0 }} />
                <span>support@anuhomefoods.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ANU HOME FOODS. All Rights Reserved. 100% Homemade Pickles Only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
