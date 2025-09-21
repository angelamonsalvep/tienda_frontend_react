import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart(prevCart => [...prevCart, product]);
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = {
    cart,
    addToCart,
    clearCart,
    setCart,
    cartCount: cart.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};