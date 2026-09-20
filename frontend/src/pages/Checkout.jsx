import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, CreditCard, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import '../styles/checkout.css';

const Checkout = () => {
  const { cartItems, subtotal, discountAmount, shippingFee, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Andhra Pradesh',
    pincode: '',
    paymentMethod: 'cod'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      customer: formData,
      items: cartItems,
      total_amount: grandTotal
    };

    const res = await api.placeOrder(orderPayload);
    if (res.success) {
      setOrderSuccess(res);
      clearCart();
    }
    setIsSubmitting(false);
  };

  if (orderSuccess) {
    return (
      <div className="container" style={{ padding: '80px 20px', maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ background: 'var(--white)', padding: '50px 30px', borderRadius: 'var(--border-radius-lg)', border: '2px solid var(--pickle-green)', boxShadow: 'var(--shadow-md)' }}>
          <CheckCircle2 size={64} color="var(--pickle-green)" style={{ margin: '0 auto 20px auto' }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--dark-brown)', marginBottom: '10px' }}>
            Order Placed Successfully! 🎉
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--pickle-green)', fontWeight: 700, marginBottom: '20px' }}>
            Order ID: {orderSuccess.orderId}
          </p>
          <p style={{ color: '#665a4e', marginBottom: '30px', lineHeight: '1.7' }}>
            Thank you for ordering from <strong>ANU HOME FOODS</strong>! Your fresh batch of homemade pickles is being prepared with care and will be dispatched within 24 hours.
          </p>
          <Link to="/" className="btn-primary-gradient" style={{ padding: '14px 34px', borderRadius: 'var(--border-radius-pill)' }}>
            Return to Home Page
          </Link>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2>No items in cart for checkout.</h2>
        <Link to="/shop" className="btn-primary-gradient" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 28px' }}>
          Explore Pickle Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cart">Cart</Link>
          <span>/</span>
          <span style={{ color: 'var(--dark-brown)', fontWeight: 600 }}>Checkout</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--dark-brown)', marginBottom: '30px', fontWeight: 800 }}>
          Order Checkout 📦
        </h1>

        <form onSubmit={handlePlaceOrder} className="checkout-grid">
          {/* Left Column: Form Details */}
          <div className="checkout-form-box">
            {/* Customer Info Section */}
            <h3 className="form-section-title">
              <ShieldCheck color="var(--chili-red)" size={20} /> 1. Customer Information
            </h3>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="ramesh@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Shipping Address Section */}
            <h3 className="form-section-title" style={{ marginTop: '35px' }}>
              <Truck color="var(--chili-red)" size={20} /> 2. Delivery Address
            </h3>

            <div className="form-group">
              <label className="form-label">Street Address & Flat/Door No. *</label>
              <textarea
                name="address"
                required
                rows="3"
                placeholder="House No, Street name, Area, Landmark"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">City / Town *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Vijayawada"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pincode *</label>
              <input
                type="text"
                name="pincode"
                required
                placeholder="e.g. 520001"
                value={formData.pincode}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Payment Method Section */}
            <h3 className="form-section-title" style={{ marginTop: '35px' }}>
              <CreditCard color="var(--chili-red)" size={20} /> 3. Payment Method
            </h3>

            <div className="payment-methods">
              <div
                className={`payment-card ${formData.paymentMethod === 'cod' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                />
                <div>
                  <span className="payment-card-title">Cash on Delivery (COD)</span>
                  <p style={{ fontSize: '0.82rem', color: '#776a5c' }}>Pay cash when your pickle jar reaches your doorstep.</p>
                </div>
              </div>

              <div
                className={`payment-card ${formData.paymentMethod === 'online' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'online' })}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={handleInputChange}
                />
                <div>
                  <span className="payment-card-title">UPI / Debit Card / NetBanking</span>
                  <p style={{ fontSize: '0.82rem', color: '#776a5c' }}>Instant secure online payment simulation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-box">
            <h3 className="summary-title">Order Items ({cartItems.length})</h3>

            <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedWeight}`} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--dark-brown)' }}>{item.name}</h5>
                    <span style={{ fontSize: '0.78rem', color: '#888' }}>{item.selectedWeight} x {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>₹{item.unitPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>

            {discountAmount > 0 && (
              <div className="summary-row" style={{ color: 'var(--pickle-green)' }}>
                <span>Discount:</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Shipping Fee:</span>
              <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>

            <div className="summary-row total-row">
              <span>Grand Total:</span>
              <span>₹{grandTotal}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary-gradient"
              style={{ width: '100%', marginTop: '24px', padding: '14px', justifyContent: 'center' }}
            >
              {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order 🛒'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
