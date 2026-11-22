import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Lock, ArrowRight, Printer, Sparkles, Coffee } from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cartItems,
    subtotal,
    discountAmount,
    shipping,
    grandTotal,
    clearCart,
    showToast
  } = useCart();

  const [step, setStep] = useState('shipping'); // 'shipping' | 'payment' | 'confirmation'
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'Julian',
    lastName: 'Vance',
    email: 'julian.vance@specialtycupping.com',
    address: '42 Roaster’s Lane, Suite 3B',
    city: 'Portland',
    postalCode: '97209',
    country: 'United States',
    shippingMethod: 'standard', // 'standard' | 'express'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••'
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.address) {
      showToast('Please fill out all required shipping fields.', 'error');
      return;
    }
    setStep('payment');
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generated = `KC-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(generated);
      setStep('confirmation');
      showToast(`Order ${generated} placed successfully! Thank you.`, 'success');
    }, 1200);
  };

  const handleFinishAndReset = () => {
    clearCart();
    closeCheckout();
    setStep('shipping');
  };

  const shippingFee = formData.shippingMethod === 'express' ? 8.00 : shipping;
  const finalPayableTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={closeCheckout}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-2xl w-full border border-[#DED8CE] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#DED8CE] bg-[#F7F4EE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1A1715] text-[#FAF7F2] flex items-center justify-center">
              <Coffee size={16} />
            </div>
            <div>
              <h3 className="font-serif-editorial text-xl font-semibold text-[#1A1715]">
                {step === 'confirmation' ? 'Order Confirmation' : 'Kalo & Crumb Roastery Checkout'}
              </h3>
              <p className="text-[11px] text-[#5E5852]">
                {step === 'shipping' && 'Step 1 of 2: Shipping Destination & Contact'}
                {step === 'payment' && 'Step 2 of 2: Payment Simulation & Verification'}
                {step === 'confirmation' && `Receipt & Dispatch Schedule &bull; Order #${orderId}`}
              </p>
            </div>
          </div>

          {step !== 'confirmation' && (
            <button
              onClick={closeCheckout}
              className="p-1.5 rounded-lg text-[#5E5852] hover:text-[#1A1715] hover:bg-[#EFE9DE] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* STEP 1: SHIPPING FORM */}
        {step === 'shipping' && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1715] mb-3">
                Recipient Contact &amp; Dispatch Dossier
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#5E5852] mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden focus:border-[#B85021]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5E5852] mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden focus:border-[#B85021]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-[#5E5852] mb-1">Email Address (for courier updates &amp; cupping dossier) *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden focus:border-[#B85021]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D8]">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1715] mb-3">
                Delivery Address
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5E5852] mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden focus:border-[#B85021]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5E5852] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden focus:border-[#B85021]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5E5852] mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden focus:border-[#B85021]"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-[#5E5852] mb-1">Country *</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden focus:border-[#B85021]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Courier Choice */}
            <div className="pt-4 border-t border-[#E8E2D8]">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1715] mb-3">
                Dispatch Courier Speed
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.shippingMethod === 'standard'
                      ? 'border-[#B85021] bg-[#EFE9DE]'
                      : 'border-[#DED8CE] bg-[#FAF7F2]'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={() => handleInputChange('shippingMethod', 'standard')}
                    className="mt-1 accent-[#B85021]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#1A1715]">
                      Carbon-Neutral Standard
                    </div>
                    <div className="text-[11px] text-[#5E5852]">
                      2–3 days post roast cooling
                    </div>
                    <div className="text-xs font-mono-tabular font-bold text-[#B85021] mt-1">
                      {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                    </div>
                  </div>
                </label>

                <label
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.shippingMethod === 'express'
                      ? 'border-[#B85021] bg-[#EFE9DE]'
                      : 'border-[#DED8CE] bg-[#FAF7F2]'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={() => handleInputChange('shippingMethod', 'express')}
                    className="mt-1 accent-[#B85021]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#1A1715]">
                      Roastery Express Courier
                    </div>
                    <div className="text-[11px] text-[#5E5852]">
                      Next morning dispatch priority
                    </div>
                    <div className="text-xs font-mono-tabular font-bold text-[#1A1715] mt-1">
                      $8.00 flat rate
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#DED8CE] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8C847C] uppercase tracking-wider block">Total Due</span>
                <span className="font-mono-tabular text-xl font-bold text-[#1A1715]">
                  ${finalPayableTotal.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2] text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT FORM */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-6">
            
            <div className="p-4 rounded-xl bg-[#EFE9DE] border border-[#DED8CE] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#8C847C] block">Delivering fresh roasted lot to:</span>
                <span className="font-semibold text-[#1A1715]">
                  {formData.firstName} {formData.lastName} &bull; {formData.address}, {formData.city}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-[#B85021] font-semibold hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* Payment inputs */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1715] flex items-center gap-1.5">
                  <CreditCard size={15} className="text-[#B85021]" />
                  <span>Payment Method (Simulated Environment)</span>
                </h4>
                <span className="text-[10px] text-[#3D5948] font-semibold bg-[#E2EBE5] px-2 py-0.5 rounded flex items-center gap-1">
                  <Lock size={10} />
                  256-Bit Encrypted
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#5E5852] mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4242 •••• •••• 4242"
                    className="w-full text-xs font-mono p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5E5852] mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      defaultValue="08/28"
                      className="w-full text-xs font-mono p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5E5852] mb-1">Security Code (CVC)</label>
                    <input
                      type="text"
                      defaultValue="739"
                      className="w-full text-xs font-mono p-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-[#1A1715] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary mini table */}
            <div className="pt-4 border-t border-[#E8E2D8] space-y-1.5 text-xs text-[#5E5852]">
              <div className="flex justify-between">
                <span>Items ({cartItems.length} unique lots)</span>
                <span className="font-mono-tabular text-[#1A1715]">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#3D5948]">
                  <span>Specialty Discount</span>
                  <span className="font-mono-tabular">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Dispatch</span>
                <span className="font-mono-tabular text-[#1A1715]">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1A1715] pt-2 border-t border-[#DED8CE]">
                <span>Total Charge</span>
                <span className="font-mono-tabular text-lg text-[#B85021]">${finalPayableTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-[#DED8CE] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs text-[#5E5852] hover:text-[#1A1715] font-semibold cursor-pointer"
              >
                &larr; Back to Shipping
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2] text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Transmitting Roastery Order...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order</span>
                    <span className="font-mono-tabular text-[#EADFC9]">(${finalPayableTotal.toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* STEP 3: ORDER CONFIRMATION STATE */}
        {step === 'confirmation' && (
          <div className="p-6 sm:p-10 space-y-6 text-center animate-in zoom-in-95 duration-300">
            
            <div className="w-16 h-16 rounded-full bg-[#E2EBE5] text-[#3D5948] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#B85021]">
                Roastery Order Logged
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715] mt-1">
                Thank you, {formData.firstName}.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#5E5852] max-w-md mx-auto leading-relaxed">
                Your order <strong className="font-mono-tabular text-[#1A1715]">#{orderId}</strong> has been assigned to our upcoming drum roast queue.
              </p>
            </div>

            {/* Roastery Dispatch Schedule Box */}
            <div className="bg-[#EFE9DE] rounded-xl p-5 border border-[#DED8CE] text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#DED8CE]">
                <span className="text-[#8C847C] font-medium">Roasting Drum Date</span>
                <span className="font-semibold text-[#1A1715]">Next Scheduled Batch</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DED8CE]">
                <span className="text-[#8C847C] font-medium">Courier Destination</span>
                <span className="font-semibold text-[#1A1715]">{formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DED8CE]">
                <span className="text-[#8C847C] font-medium">Confirmation Sent To</span>
                <span className="font-mono font-medium text-[#1A1715]">{formData.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8C847C] font-medium">Total Paid</span>
                <span className="font-mono-tabular font-bold text-[#B85021]">${finalPayableTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#DED8CE] bg-[#FAF7F2] hover:bg-[#EFE9DE] text-xs font-semibold text-[#1A1715] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Printer size={15} />
                <span>Print Roastery Receipt</span>
              </button>

              <button
                onClick={handleFinishAndReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2] text-xs font-semibold cursor-pointer transition-colors"
              >
                Back to Roastery Store
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
