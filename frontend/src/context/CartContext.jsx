import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('syntecx_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('syntecx_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [cartItems]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product === product._id);
      if (existing) {
        const newQty = Math.min(product.countInStock, existing.qty + qty);
        showToast(`Updated quantity for "${product.name}" (${newQty} in cart)`);
        return prevItems.map((item) =>
          item.product === product._id ? { ...item, qty: newQty } : item
        );
      } else {
        const itemToAdd = {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty: Math.min(product.countInStock, qty),
        };
        showToast(`Added "${product.name}" to cart!`);
        return [...prevItems, itemToAdd];
      }
    });
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product === productId) {
          const validQty = Math.min(item.countInStock, qty);
          return { ...item, qty: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('syntecx_cart');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Calculations
  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const taxPrice = Math.round(subtotal * 0.08 * 100) / 100;
  const totalPrice = Math.round((subtotal + shippingPrice + taxPrice) * 100) / 100;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        itemsCount,
        subtotal: Math.round(subtotal * 100) / 100,
        shippingPrice,
        taxPrice,
        totalPrice,
        toastMessage,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
