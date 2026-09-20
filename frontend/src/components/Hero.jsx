import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import '../styles/hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow" />
      
      <div className="container">
        <div className="hero-grid">
          {/* Left Content Column */}
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot"></span> AUTHENTIC HOMEMADE PICKLES
            </div>

            <h1 className="hero-heading">
              <span className="hero-heading-white">Traditional Taste,</span>
              <span className="hero-heading-gold">Homemade With Love</span>
            </h1>

            <p className="hero-subtitle">
              Discover authentic homemade pickles crafted with bold spices, fresh ingredients and timeless recipes.
            </p>

            <div className="hero-actions">
              <Link to="/shop" className="btn-primary-gradient">
                <ShoppingBag size={18} /> Shop Pickles
              </Link>

              <Link to="/about" className="btn-secondary-outline">
                Explore Our Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Pickle Photo Grid matching Figma reference */}
          <div className="hero-photo-grid">
            <div className="hero-photo-card">
              <img src="/images/mango_pickle.png" alt="Andhra Cut Mango Pickle" />
            </div>

            <div className="hero-photo-card">
              <img src="/images/gongura_pickle.png" alt="Authentic Gongura Pickle" />
            </div>

            <div className="hero-photo-card">
              <img src="/images/garlic_pickle.png" alt="Spicy Garlic Pickle" />
            </div>

            <div className="hero-photo-card">
              <img src="/images/chicken_pickle.png" alt="Boneless Chicken Pickle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
