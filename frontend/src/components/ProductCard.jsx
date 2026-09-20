import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import Rating from './Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500';
          }}
        />

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
          title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={18} fill={isFavorite ? '#B81820' : 'none'} color={isFavorite ? '#B81820' : '#666'} />
        </button>

        {/* Badges */}
        <div className="card-badges">
          {product.isVeg ? (
            <span className="badge-veg">🌱 VEG</span>
          ) : (
            <span className="badge-nonveg">🍗 NON-VEG</span>
          )}
          {product.isBestSeller && <span className="badge-bestseller">BESTSELLER</span>}
          {product.discount && <span className="badge-discount">{product.discount}</span>}
        </div>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <Rating rating={product.rating} reviewsCount={product.reviewsCount} />

        <div className="price-wrapper">
          <span className="current-price">₹{product.price}</span>
          {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
        </div>

        <div className="card-actions">
          <button
            className="btn-card-add"
            onClick={() => addToCart(product, '500g', 1)}
          >
            <ShoppingBag size={15} /> Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn-card-view" title="View Details">
            <Eye size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
