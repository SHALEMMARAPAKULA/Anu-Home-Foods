import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('anu_foods_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('anu_foods_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedWeight = '500g', quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedWeight === selectedWeight);
      const unitPrice = product.weightPrices?.[selectedWeight] || product.price;

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, {
        ...product,
        selectedWeight,
        unitPrice,
        quantity
      }];
    });
  };

  const removeFromCart = (productId, selectedWeight) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.selectedWeight === selectedWeight)));
  };

  const updateQuantity = (productId, selectedWeight, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedWeight);
      return;
    }
    setCartItems(prev => prev.map(item =>
      (item.id === productId && item.selectedWeight === selectedWeight)
        ? { ...item, quantity }
        : item
    ));
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ANU10' || clean === 'PICKLE10') {
      setCoupon(clean);
      setDiscountPercent(10);
      return { success: true, message: 'Coupon applied! 10% discount added.' };
    } else if (clean === 'FREESHIP') {
      setCoupon(clean);
      setDiscountPercent(5);
      return { success: true, message: 'Free shipping coupon applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try ANU10!' };
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon('');
    setDiscountPercent(0);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 500 || coupon === 'FREESHIP' || subtotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      discountAmount,
      shippingFee,
      grandTotal,
      coupon,
      applyCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
