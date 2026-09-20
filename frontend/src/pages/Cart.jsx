import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import '../styles/cart.css';

const Cart = () => {
  const { cartItems, subtotal, discountAmount, shippingFee, grandTotal, applyCoupon, coupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const navigate = useNavigate();

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 0' }}>
        <EmptyState
          title="Your Pickle Cart is Empty"
          message="Looks like you haven't added any delicious homemade pickles to your cart yet!"
          actionText="Explore Pickle Shop"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--dark-brown)', fontWeight: 600 }}>Shopping Cart</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--dark-brown)', marginBottom: '30px', fontWeight: 800 }}>
          Your Shopping Cart 🛒
        </h1>

        <div className="cart-layout">
          {/* Cart Table */}
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Pickle Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <CartItem key={`${item.id}-${item.selectedWeight}`} item={item} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary Side Box */}
          <div className="order-summary-box">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items):</span>
              <span style={{ fontWeight: 700 }}>₹{subtotal}</span>
            </div>

            {discountAmount > 0 && (
              <div className="summary-row" style={{ color: 'var(--pickle-green)' }}>
                <span>Discount ({coupon}):</span>
                <span style={{ fontWeight: 700 }}>-₹{discountAmount}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Shipping Fee:</span>
              <span>
                {shippingFee === 0 ? (
                  <span style={{ color: 'var(--pickle-green)', fontWeight: 700 }}>FREE</span>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>

            {subtotal < 500 && shippingFee > 0 && (
              <p style={{ fontSize: '0.8rem', color: 'var(--chili-red)', background: 'rgba(184, 24, 32, 0.08)', padding: '8px 12px', borderRadius: '4px', margin: '10px 0' }}>
                Add ₹{500 - subtotal} more for <strong>FREE Shipping</strong>!
              </p>
            )}

            {/* Coupon Input Form */}
            <form onSubmit={handleCouponSubmit} className="coupon-box">
              <input
                type="text"
                className="coupon-input"
                placeholder="Enter Promo Code (e.g. ANU10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="submit" className="btn-apply-coupon">
                Apply
              </button>
            </form>

            {couponMessage && (
              <p style={{ fontSize: '0.84rem', color: couponMessage.success ? 'var(--pickle-green)' : 'var(--chili-red)', marginBottom: '15px' }}>
                {couponMessage.message}
              </p>
            )}

            <div className="summary-row total-row">
              <span>Total Amount:</span>
              <span>₹{grandTotal}</span>
            </div>

            <button
              className="btn-primary-gradient"
              style={{ width: '100%', marginTop: '20px', padding: '14px', justifyContent: 'center' }}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <Link
              to="/shop"
              style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: '#776a5c', fontSize: '0.9rem', fontWeight: 600 }}
            >
              ← Continue Shopping Pickles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
