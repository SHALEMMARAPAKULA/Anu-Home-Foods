import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sun, ShieldCheck, Sparkles, Award, Home as HomeIcon, BookOpen } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Newsletter from '../components/Newsletter';
import '../styles/about.css';

const About = () => {
  useEffect(() => {
    document.title = 'Our Story | ANU HOME FOODS';
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--dark-brown)', fontWeight: 600 }}>Our Story</span>
        </div>

        {/* Hero Section */}
        <div className="about-hero">
          <span className="hero-badge" style={{ background: 'var(--mustard-gold)', color: 'var(--dark-brown)' }}>
            HOMEMADE TRADITION SINCE GENERATIONS
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.2rem', color: 'var(--dark-brown)', fontWeight: 800, margin: '15px 0' }}>
            The Story Behind ANU HOME FOODS
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#665a4e', fontStyle: 'italic' }}>
            "Eat Good and Feel Good!"
          </p>
        </div>

        {/* Our Story Grid */}
        <div className="about-story-grid">
          <div className="story-img-box">
            <img src="/images/mango_pickle.png" alt="Grandmother Homemade Pickle Craft" style={{ width: '100%', height: '380px', objectFit: 'cover' }} />
          </div>

          <div className="story-content">
            <h2>Crafted with Love & Age-Old Recipes</h2>
            <p>
              At <strong>ANU HOME FOODS</strong>, pickle making is not just a business — it is a cherished family heritage passed down across three generations of home cooks in Andhra Pradesh.
            </p>
            <p>
              We specialize <strong>exclusively in homemade pickles</strong> — from famous vegetarian classics like Raw Cut Avakaya Mango, Sun-cured Lemon, Spicy Garlic, and Tangy Gongura to rich non-vegetarian delicacies like Boneless Chicken and Coastal Fish pickles.
            </p>
            <p>
              Every jar is prepared in small handcrafted batches without any artificial preservatives, synthetic colors, or chemical additives. We use only unrefined cold-pressed sesame and groundnut oils and hand-ground spices.
            </p>
          </div>
        </div>

        {/* Major Pickle Green to Brine Beige Gradient Section */}
        <div className="green-trust-banner">
          <SectionTitle title="Why Choose ANU HOME FOODS" subtitle="Why thousands of families trust our homemade pickles" centered={true} />

          <div className="trust-features-grid">
            <div className="trust-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="trust-icon" style={{ marginBottom: '10px' }}><HomeIcon size={32} color="var(--chili-red)" /></div>
              <h3 className="trust-card-title">Homemade Goodness</h3>
              <p className="trust-card-desc">Prepared in small residential kitchen batches ensuring hygiene and home touch.</p>
            </div>

            <div className="trust-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="trust-icon" style={{ marginBottom: '10px' }}><BookOpen size={32} color="var(--mustard-gold)" /></div>
              <h3 className="trust-card-title">Traditional Recipes</h3>
              <p className="trust-card-desc">Time-tested authentic Andhra formulas with perfect spice-oil balance.</p>
            </div>

            <div className="trust-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="trust-icon" style={{ marginBottom: '10px' }}><Sun size={32} color="var(--mustard-gold)" /></div>
              <h3 className="trust-card-title">Sun-Cured Spices</h3>
              <p className="trust-card-desc">Naturally sun-dried cut fruits and hand-milled Guntur chilli powder.</p>
            </div>

            <div className="trust-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="trust-icon" style={{ marginBottom: '10px' }}><Heart size={32} color="var(--chili-red)" /></div>
              <h3 className="trust-card-title">Made With Love</h3>
              <p className="trust-card-desc">Zero preservatives or MSG. Just pure, wholesome, family-friendly food.</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ textAlign: 'center', margin: '60px 0 20px 0' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '15px' }}>
            Ready to Taste Authentic Andhra Pickles?
          </h2>
          <p style={{ color: '#665a4e', marginBottom: '25px', fontSize: '1.05rem' }}>
            Browse our fresh batch of homemade vegetarian and non-vegetarian pickles today!
          </p>
          <Link to="/shop" className="btn-primary-gradient" style={{ padding: '14px 38px', borderRadius: 'var(--border-radius-pill)' }}>
            Shop Fresh Pickles Now 🛒
          </Link>
        </div>

        <Newsletter />
      </div>
    </div>
  );
};

export default About;
