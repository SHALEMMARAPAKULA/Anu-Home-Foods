import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Check, Star } from 'lucide-react';
import Rating from '../components/Rating';
import QuantitySelector from '../components/QuantitySelector';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/product-details.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeight, setSelectedWeight] = useState('500g');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToast, setAddedToast] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      const res = await api.getProductById(id);
      if (res.success) {
        setProduct(res.data);
        document.title = `${res.data.name} | ANU HOME FOODS`;
        
        // Fetch related products
        const allRes = await api.getProducts({ category: res.data.category });
        if (allRes.success) {
          setRelated(allRes.data.filter(p => p.id !== id).slice(0, 4));
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 0' }}>
        <Loading />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '15px' }}>Pickle Product Not Found</h2>
        <Link to="/shop" className="btn-primary-gradient" style={{ padding: '12px 28px' }}>
          Back to Pickle Shop
        </Link>
      </div>
    );
  }

  const calculatedPrice = product.weightPrices?.[selectedWeight] || product.price;
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    navigate('/checkout');
  };

  return (
    <div className="product-details-container">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop Pickles</Link>
          <span>/</span>
          <span style={{ color: 'var(--dark-brown)', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Added Toast Notification */}
        {addedToast && (
          <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: 'var(--pickle-green)',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: 'var(--border-radius)',
            fontWeight: 700,
            boxShadow: 'var(--shadow-lg)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Check size={20} /> {quantity}x {product.name} ({selectedWeight}) added to Cart!
          </div>
        )}

        {/* Product Details Grid */}
        <div className="details-grid">
          {/* Left: Gallery */}
          <div className="details-gallery">
            <div className="main-image-box">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500';
                }}
              />
            </div>
          </div>

          {/* Right: Info Column */}
          <div className="details-info">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {product.isVeg ? (
                <span className="badge-veg">🌱 VEGETARIAN</span>
              ) : (
                <span className="badge-nonveg">🍗 NON-VEGETARIAN</span>
              )}
              {product.isBestSeller && <span className="badge-bestseller">BESTSELLER</span>}
              {product.discount && <span className="badge-discount">{product.discount}</span>}
            </div>

            <h1 className="details-title">{product.name}</h1>

            <Rating rating={product.rating} reviewsCount={product.reviewsCount} />

            <div className="details-price-row">
              <span className="details-price">₹{calculatedPrice}</span>
              {product.oldPrice && <span className="details-old-price">₹{product.oldPrice}</span>}
              <span style={{ fontSize: '0.85rem', color: 'var(--pickle-green)', fontWeight: 700 }}>Inclusive of all taxes</span>
            </div>

            <p className="details-short-desc">{product.shortDescription}</p>

            {/* Pack Size / Weight Selector */}
            <div className="selector-group">
              <span className="selector-label">Select Pack Weight:</span>
              <div className="weight-options">
                {product.weights?.map((w) => (
                  <button
                    key={w}
                    className={`btn-weight ${selectedWeight === w ? 'active' : ''}`}
                    onClick={() => setSelectedWeight(w)}
                  >
                    {w} - ₹{product.weightPrices?.[w] || product.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="selector-group">
              <span className="selector-label">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                onIncrease={() => setQuantity(quantity + 1)}
              />
            </div>

            {/* Action Buttons */}
            <div className="details-actions">
              <button
                className="btn-primary-gradient"
                style={{ flex: 1, padding: '14px', justifyContent: 'center' }}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button
                className="btn-secondary-outline"
                style={{ flex: 1, padding: '14px', textAlign: 'center', borderColor: 'var(--chili-red)', color: 'var(--chili-red)' }}
                onClick={handleBuyNow}
              >
                Buy Now ⚡
              </button>

              <button
                className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
                style={{ position: 'relative', top: 'auto', right: 'auto', width: '48px', height: '48px' }}
                onClick={() => toggleWishlist(product)}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isFavorite ? '#B81820' : 'none'} color={isFavorite ? '#B81820' : '#666'} />
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#55483c' }}>
                <ShieldCheck size={20} color="var(--pickle-green)" /> 100% Authentic Homemade
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#55483c' }}>
                <Truck size={20} color="var(--mustard-gold)" /> Fast Express Shipping
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div className="product-tabs-wrapper">
          <div className="tabs-header">
            <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>
              Description
            </button>
            <button className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`} onClick={() => setActiveTab('ingredients')}>
              Ingredients
            </button>
            <button className={`tab-btn ${activeTab === 'storage' ? 'active' : ''}`} onClick={() => setActiveTab('storage')}>
              Storage & Care
            </button>
            <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
              Customer Reviews ({product.reviews?.length || 0})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div>
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <p><strong>Ingredients List:</strong></p>
                <p style={{ marginTop: '8px' }}>{product.ingredients}</p>
              </div>
            )}

            {activeTab === 'storage' && (
              <div>
                <p><strong>Storage & Handling Instructions:</strong></p>
                <p style={{ marginTop: '8px' }}>{product.storageInstructions}</p>
                <p style={{ marginTop: '8px' }}><strong>Shipping Information:</strong> {product.shippingInfo}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {product.reviews && product.reviews.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {product.reviews.map(r => (
                      <div key={r.id} style={{ background: 'var(--cream)', padding: '16px 20px', borderRadius: 'var(--border-radius-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--dark-brown)' }}>{r.user}</span>
                          <span style={{ fontSize: '0.8rem', color: '#888' }}>{r.date}</span>
                        </div>
                        <Rating rating={r.rating} />
                        <p style={{ marginTop: '8px', fontSize: '0.95rem' }}>{r.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No customer reviews yet. Be the first to write a review!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: '70px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--dark-brown)', marginBottom: '25px' }}>
              You May Also Like 🌶️
            </h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
