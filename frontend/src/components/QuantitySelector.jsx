import React from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantitySelector = ({ quantity = 1, onDecrease, onIncrease }) => {
  return (
    <div className="quantity-control">
      <button type="button" className="btn-qty" onClick={onDecrease} aria-label="Decrease quantity">
        <Minus size={14} />
      </button>
      <span className="qty-number">{quantity}</span>
      <button type="button" className="btn-qty" onClick={onIncrease} aria-label="Increase quantity">
        <Plus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
