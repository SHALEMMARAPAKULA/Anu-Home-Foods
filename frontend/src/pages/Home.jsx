import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Flame, Clock, Home as HomeIcon, Award } from 'lucide-react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import ReviewCard from '../components/ReviewCard';
import Newsletter from '../components/Newsletter';
import Loading from '../components/Loading';
import api from '../services/api';
import { CATEGORIES, TESTIMONIALS } from '../data/products';

const Home = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'ANU HOME FOODS - Authentic Homemade Pickles';
    const loadBestsellers = async () => {
      const data = await api.getBestsellers();
      setBestsellers(data);
      setLoading(false);
    };
    loadBestsellers();
  }, []);

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quality & Trust Section */}
      <section style={{ background: 'var(--white)', padding: '60px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <SectionTitle
            title="Why Choose ANU HOME FOODS"
            subtitle="Handcrafted quality, pure ingredients & traditional recipes in every jar"
            centered={true}
          />

          <div className="trust-features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: '30px' }}>
            <div className="trust-card" style={{ background: 'var(--cream)', color: 'var(--dark-brown)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="trust-icon" style={{ marginBottom: '10px' }}><HomeIcon size={32} color="var(--chili-red)" /></div>
              <h4 className="trust-card-title" style={{ color: 'var(--dark-brown)' }}>100% Homemade</h4>
              <p className="trust-card-desc" style={{ color: '#665a4e' }}>Prepared in small batches with love</p>
            </div>

            <div className="trust-card" style={{ background: 'var(--cream)', color: 'var(--dark-brown)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="trust-icon" style={{ marginBottom: '10px' }}><Award size={32} color="var(--mustard-gold)" /></div>
              <h4 className="trust-card-title" style={{ color: 'var(--dark-brown)' }}>Authentic Recipes</h4>
              <p className="trust-card-desc" style={{ color: '#665a4e' }}>Traditional family formulas</p>
            </div>

            <div className="trust-card" style={{ background: 'var(--cream)', color: 'var(--dark-brown)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="trust-icon" style={{ marginBottom: '10px' }}><Flame size={32} color="var(--chili-red)" /></div>
              <h4 className="trust-card-title" style={{ color: 'var(--dark-brown)' }}>Fresh Ingredients</h4>
              <p className="trust-card-desc" style={{ color: '#665a4e' }}>Guntur chillies & cold-pressed oils</p>
            </div>

            <div className="trust-card" style={{ background: 'var(--cream)', color: 'var(--dark-brown)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="trust-icon" style={{ marginBottom: '10px' }}><ShieldCheck size={32} color="var(--pickle-green)" /></div>
              <h4 className="trust-card-title" style={{ color: 'var(--dark-brown)' }}>No Preservatives</h4>
              <p className="trust-card-desc" style={{ color: '#665a4e' }}>Zero artificial colors or additives</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Section */}
      <section style={{ padding: '70px 0', background: 'var(--cream)' }}>
        <div className="container">
          <SectionTitle
            title="Explore Our Pickles"
            subtitle="Browse authentic vegetarian and non-vegetarian homemade pickle varieties"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Selling Pickles Section */}
      <section style={{ padding: '70px 0', background: 'var(--white)' }}>
        <div className="container">
          <SectionTitle
            title="Best Selling Pickles"
            subtitle="Our customer top-rated freshly prepared homemade Indian pickles"
          />

          {loading ? <Loading /> : <ProductGrid products={bestsellers} />}

          <div style={{ textAlign: 'center', marginTop: '45px' }}>
            <Link to="/shop" className="btn-primary-gradient" style={{ padding: '14px 38px', borderRadius: 'var(--border-radius-pill)' }}>
              View All Pickles →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Promotional Banner Section */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div style={{
          background: 'var(--gradient-primary)',
          color: 'var(--white)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '95px 60px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div>
            <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '6px 16px', borderRadius: '30px', fontWeight: 700, fontSize: '0.85rem' }}>
              LIMITED FRESH BATCH
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', margin: '16px 0', lineHeight: '1.2' }}>
              Bring Home the Taste of Andhra
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#fcefdc', marginBottom: '30px', lineHeight: '1.7' }}>
              Handcrafted in small batches using traditional sun-drying methods, unrefined cold-pressed oils, and hand-milled spices.
            </p>
            <Link to="/shop" className="btn-secondary-outline" style={{ background: 'var(--white)', color: 'var(--chili-red)' }}>
              Shop Now 🛒
            </Link>
          </div>

          <div style={{ borderRadius: 'var(--border-radius)', overflow: 'hidden', height: '280px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
            <img src="/images/mango_pickle.png" alt="Andhra Pickle Craft" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews Section */}
      <section style={{ padding: '70px 0', background: 'var(--cream)' }}>
        <div className="container">
          <SectionTitle
            title="What Our Customers Say"
            subtitle="Real stories from pickle lovers across India"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {TESTIMONIALS.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;
