import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'kalo_crumb_cart_v1';
const FREE_SHIPPING_THRESHOLD = 55.00;
const STANDARD_SHIPPING_FEE = 4.50;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null); // { code, discountPercent, isFreeShipping }
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cartItems]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addItem = (product, size = '250g', grind = 'Whole Bean', quantity = 1) => {
    // Determine price based on size multiplier
    const isGear = product.category === 'Brewing Gear & Ceramics';
    let unitPrice = product.basePrice;
    if (!isGear) {
      if (size === '500g') unitPrice = Math.round(product.basePrice * 1.85 * 100) / 100;
      if (size === '1kg') unitPrice = Math.round(product.basePrice * 3.4 * 100) / 100;
    }

    const cartItemId = `${product.id}-${isGear ? 'std' : size}-${isGear ? 'gear' : grind.replace(/\s+/g, '-').toLowerCase()}`;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prevItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          unitPrice,
          size: isGear ? 'Standard Unit' : size,
          grind: isGear ? 'N/A' : grind,
          quantity,
          image: product.image,
          tastingNotes: product.tastingNotes ? product.tastingNotes.slice(0, 2) : []
        }
      ];
    });

    showToast(`Added ${quantity}× ${product.name} (${isGear ? 'Unit' : size}) to your bag.`, 'success');
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from your bag.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (rawCode) => {
    const code = rawCode.trim().toUpperCase();
    if (code === 'FIRSTPOUR' || code === 'WELCOME10') {
      setAppliedPromo({ code, discountPercent: 10, isFreeShipping: false });
      showToast(`Promo code '${code}' applied! 10% discount added.`, 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (code === 'FREESHIP') {
      setAppliedPromo({ code, discountPercent: 0, isFreeShipping: true });
      showToast(`Promo code 'FREESHIP' applied! Free shipping unlocked.`, 'success');
      return { success: true, message: 'Free shipping unlocked!' };
    }
    if (code === 'HARVEST15') {
      setAppliedPromo({ code, discountPercent: 15, isFreeShipping: false });
      showToast(`Promo code 'HARVEST15' applied! 15% discount added.`, 'success');
      return { success: true, message: '15% harvest discount applied!' };
    }
    showToast(`Invalid promo code '${code}'. Try 'FIRSTPOUR' for 10% off.`, 'error');
    return { success: false, message: 'Invalid code. Try "FIRSTPOUR".' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed.', 'info');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  // Calculations
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo && appliedPromo.discountPercent > 0) {
    discountAmount = Math.round((subtotal * appliedPromo.discountPercent) / 100 * 100) / 100;
  }

  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || (appliedPromo && appliedPromo.isFreeShipping);
  const shipping = cartItems.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = Math.max(0, Math.round((subtotal - discountAmount + shipping) * 100) / 100);
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        toasts,
        showToast,
        removeToast,
        itemCount,
        subtotal,
        discountAmount,
        shipping,
        grandTotal,
        amountUntilFreeShipping,
        freeShippingProgress,
        FREE_SHIPPING_THRESHOLD
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
