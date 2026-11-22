import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, Tag, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    discountAmount,
    shipping,
    grandTotal,
    amountUntilFreeShipping,
    freeShippingProgress,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    openCheckout
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-300"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#DED8CE] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#DED8CE] flex items-center justify-between bg-[#F7F4EE]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1A1715] text-[#FAF7F2] flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
            <div>
              <h3 className="font-serif-editorial text-xl font-semibold text-[#1A1715]">
                Your Provisions Bag
              </h3>
              <span className="text-[11px] text-[#5E5852] font-mono-tabular">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in order
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-1.5 rounded-lg text-[#5E5852] hover:text-[#1A1715] hover:bg-[#EFE9DE] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#EFE9DE] p-4 border-b border-[#DED8CE]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-[#1A1715] flex items-center gap-1.5">
              <Truck size={14} className="text-[#B85021]" />
              {amountUntilFreeShipping > 0
                ? `Add $${amountUntilFreeShipping.toFixed(2)} more for complimentary shipping`
                : 'Complimentary shipping unlocked!'}
            </span>
            <span className="font-mono-tabular font-bold text-[#1A1715]">
              {freeShippingProgress}%
            </span>
          </div>

          <div className="w-full bg-[#DED8CE] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#B85021] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E8E2D8]">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                
                {/* Item Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#EFE9DE] border border-[#DED8CE] shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif-editorial text-base font-semibold text-[#1A1715] leading-snug">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-[#8C847C] hover:text-[#B85021] p-1 transition-colors cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px] text-[#5E5852] mt-1">
                      <span className="bg-[#EFE9DE] px-1.5 py-0.5 rounded font-mono-tabular">
                        {item.size}
                      </span>
                      {item.grind !== 'N/A' && (
                        <span className="bg-[#EFE9DE] px-1.5 py-0.5 rounded">
                          {item.grind}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-mono-tabular text-sm font-bold text-[#1A1715]">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-[#8C847C] font-normal ml-1">
                          (${item.unitPrice.toFixed(2)} ea)
                        </span>
                      )}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-[#DED8CE] rounded bg-[#FAF7F2]">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 hover:text-[#B85021] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center font-mono-tabular text-xs font-semibold text-[#1A1715]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 hover:text-[#B85021] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))
          ) : (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="w-14 h-14 rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#8C847C] mb-4">
                <ShoppingBag size={24} />
              </div>
              <h4 className="font-serif-editorial text-2xl font-semibold text-[#1A1715]">
                Your bag is empty
              </h4>
              <p className="mt-2 text-xs text-[#5E5852] max-w-xs">
                Explore our current drum roasts, single origins, and artisan brewing provisions.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  const catalog = document.getElementById('catalog');
                  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 bg-[#1A1715] text-[#FAF7F2] text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#B85021] transition-colors cursor-pointer"
              >
                Explore Current Roasts
              </button>
            </div>
          )}
        </div>

        {/* Footer: Promo & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#DED8CE] bg-[#F7F4EE] space-y-4">
            
            {/* Promo code form */}
            {!appliedPromo ? (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C847C]" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="Promo code (e.g. FIRSTPOUR)"
                    className="w-full pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-xs text-[#1A1715] placeholder:text-[#8C847C] focus:outline-hidden focus:border-[#B85021]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FAF7F2] hover:bg-[#EFE9DE] text-[#1A1715] text-xs font-semibold px-3 py-2 rounded-lg border border-[#DED8CE] transition-colors cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between bg-[#EFE9DE] px-3 py-2 rounded-lg border border-[#DED8CE] text-xs">
                <span className="flex items-center gap-1.5 font-medium text-[#1A1715]">
                  <Tag size={13} className="text-[#B85021]" />
                  <span>Code <strong>{appliedPromo.code}</strong> applied</span>
                  {appliedPromo.discountPercent > 0 && <span>(-{appliedPromo.discountPercent}%)</span>}
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-xs text-[#8C847C] hover:text-[#B85021] font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {promoError && (
              <p className="text-[11px] text-[#9E4319]">{promoError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5E5852]">
                <span>Provisions Subtotal</span>
                <span className="font-mono-tabular text-[#1A1715] font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#3D5948] font-medium">
                  <span>Specialty Discount</span>
                  <span className="font-mono-tabular">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#5E5852]">
                <span>Carbon-Neutral Dispatch</span>
                <span className="font-mono-tabular text-[#1A1715] font-medium">
                  {shipping === 0 ? (
                    <span className="text-[#3D5948] font-bold">Complimentary</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#1A1715] pt-2 border-t border-[#DED8CE]">
                <span>Estimated Order Total</span>
                <span className="font-mono-tabular text-lg text-[#B85021]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={openCheckout}
              className="w-full bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2] py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            {/* Freshness Pledge Note */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C847C] text-center pt-1">
              <ShieldCheck size={12} className="text-[#3D5948]" />
              <span>Small-batch roasted &bull; Nitrogen-purged &bull; 100% Guaranteed</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
