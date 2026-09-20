import React from 'react';
import { Trash2 } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <tr>
      <td>
        <div className="cart-item-info">
          <img
            src={item.image}
            alt={item.name}
            className="cart-item-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500';
            }}
          />
          <div>
            <h4 className="cart-item-title">{item.name}</h4>
            <span className="cart-item-weight">Pack Size: {item.selectedWeight}</span>
          </div>
        </div>
      </td>
      <td style={{ fontWeight: 600 }}>₹{item.unitPrice}</td>
      <td>
        <QuantitySelector
          quantity={item.quantity}
          onDecrease={() => updateQuantity(item.id, item.selectedWeight, item.quantity - 1)}
          onIncrease={() => updateQuantity(item.id, item.selectedWeight, item.quantity + 1)}
        />
      </td>
      <td style={{ fontWeight: 800, color: 'var(--chili-red)' }}>
        ₹{item.unitPrice * item.quantity}
      </td>
      <td>
        <button
          className="btn-remove-cart"
          onClick={() => removeFromCart(item.id, item.selectedWeight)}
          title="Remove from cart"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
