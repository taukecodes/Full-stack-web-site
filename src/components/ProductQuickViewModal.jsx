import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { GRIND_OPTIONS, SIZE_OPTIONS } from '../data/coffeeData';
import { X, Check, MapPin, Thermometer, Clock, Sliders, ShieldCheck, Flame, Plus, Minus } from 'lucide-react';

export default function ProductQuickViewModal() {
  const { quickViewProduct, closeQuickView, addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('250g');
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Reset defaults when product changes
    setSelectedSize('250g');
    setSelectedGrind('Whole Bean');
    setQuantity(1);
    setIsAdded(false);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeQuickView();
    };
    if (quickViewProduct) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isGear = quickViewProduct.category === 'Brewing Gear & Ceramics';

  let currentPrice = quickViewProduct.basePrice;
  if (!isGear) {
    if (selectedSize === '500g') currentPrice = Math.round(quickViewProduct.basePrice * 1.85 * 100) / 100;
    if (selectedSize === '1kg') currentPrice = Math.round(quickViewProduct.basePrice * 3.4 * 100) / 100;
  }
  const totalItemPrice = Math.round(currentPrice * quantity * 100) / 100;

  const handleAddToCart = () => {
    addItem(quickViewProduct, selectedSize, selectedGrind, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={closeQuickView}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-3xl w-full border border-[#DED8CE] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2]/90 hover:bg-[#1A1715] text-[#1A1715] hover:text-[#FAF7F2] border border-[#DED8CE] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close product view"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image & Origin Details */}
          <div className="md:col-span-5 bg-[#EFE9DE] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#DED8CE]">
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-xs mb-4">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                {quickViewProduct.badge && (
                  <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#1A1715] text-[#FAF7F2]">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Terroir / Tech Specs Matrix */}
              {!isGear ? (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#DED8CE]/60">
                    <span className="text-[#8C847C] font-medium">Elevation</span>
                    <span className="font-mono-tabular font-semibold text-[#1A1715]">{quickViewProduct.elevation}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#DED8CE]/60">
                    <span className="text-[#8C847C] font-medium">Varietal</span>
                    <span className="font-semibold text-[#1A1715] text-right">{quickViewProduct.varietal}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#DED8CE]/60">
                    <span className="text-[#8C847C] font-medium">Processing</span>
                    <span className="font-semibold text-[#1A1715] text-right">{quickViewProduct.process}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#DED8CE]/60">
                    <span className="text-[#8C847C] font-medium">Agtron Roast Score</span>
                    <span className="font-mono-tabular font-semibold text-[#B85021]">{quickViewProduct.agtron}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8C847C] font-medium">Harvest</span>
                    <span className="font-semibold text-[#1A1715]">{quickViewProduct.harvest}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#DED8CE]/60">
                    <span className="text-[#8C847C] font-medium">Material</span>
                    <span className="font-semibold text-[#1A1715]">{quickViewProduct.material}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#DED8CE]/60">
                    <span className="text-[#8C847C] font-medium">Capacity</span>
                    <span className="font-semibold text-[#1A1715]">{quickViewProduct.capacity}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8C847C] font-medium">Origin</span>
                    <span className="font-semibold text-[#1A1715]">{quickViewProduct.origin}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Freshness Pledge Note */}
            <div className="mt-6 pt-4 border-t border-[#DED8CE] flex items-center gap-2 text-[11px] text-[#5E5852]">
              <ShieldCheck size={16} className="text-[#3D5948] shrink-0" />
              <span>Small-batch drum roasted &bull; Nitrogen-flushed valve pouch</span>
            </div>
          </div>

          {/* Right Column: Copy, Cupping Radar & Customization */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#B85021]">
                {quickViewProduct.origin}
              </div>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#1A1715] mt-1">
                {quickViewProduct.name}
              </h2>

              {/* Tasting notes pills */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {quickViewProduct.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EFE9DE] text-[#1A1715] border border-[#DED8CE]"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#5E5852] leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Cupping Flavor Profile Bars (If Coffee) */}
              {!isGear && (
                <div className="mt-5 p-4 rounded-xl bg-[#EFE9DE]/60 border border-[#E4DFD5]">
                  <span className="text-[11px] font-semibold text-[#1A1715] uppercase tracking-wider block mb-2.5">
                    Sensory Balance Breakdown
                  </span>
                  
                  <div className="space-y-2">
                    {/* Acidity */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-20 text-[#5E5852] font-medium">Acidity</span>
                      <div className="flex-1 bg-[#DED8CE] h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-[#B85021] h-full rounded-full transition-all"
                          style={{ width: `${(quickViewProduct.acidity / 5) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono-tabular text-[11px] text-[#1A1715] w-6 text-right">
                        {quickViewProduct.acidity}/5
                      </span>
                    </div>

                    {/* Sweetness */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-20 text-[#5E5852] font-medium">Sweetness</span>
                      <div className="flex-1 bg-[#DED8CE] h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-[#C88A36] h-full rounded-full transition-all"
                          style={{ width: `${(quickViewProduct.sweetness / 5) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono-tabular text-[11px] text-[#1A1715] w-6 text-right">
                        {quickViewProduct.sweetness}/5
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-20 text-[#5E5852] font-medium">Body</span>
                      <div className="flex-1 bg-[#DED8CE] h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-[#5E5852] h-full rounded-full transition-all"
                          style={{ width: `${(quickViewProduct.body / 5) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono-tabular text-[11px] text-[#1A1715] w-6 text-right">
                        {quickViewProduct.body}/5
                      </span>
                    </div>
                  </div>

                  {/* Roaster's Note quote */}
                  {quickViewProduct.roasterNote && (
                    <p className="mt-3 text-[11px] italic text-[#5E5852] border-t border-[#DED8CE] pt-2">
                      &ldquo;{quickViewProduct.roasterNote}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Customization & Add to Cart form */}
            <div className="mt-6 pt-5 border-t border-[#DED8CE] space-y-4">
              
              {!isGear && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Size buttons */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#5E5852] mb-1.5">
                      Bag Weight
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {SIZE_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedSize(opt.id)}
                          className={`text-xs py-1.5 px-1 rounded text-center transition-all cursor-pointer font-mono-tabular ${
                            selectedSize === opt.id
                              ? 'bg-[#1A1715] text-[#FAF7F2] font-semibold'
                              : 'bg-[#EFE9DE] text-[#5E5852] hover:bg-[#E5DFD3]'
                          }`}
                        >
                          {opt.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grind options */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#5E5852] mb-1.5">
                      Grind Style
                    </label>
                    <select
                      value={selectedGrind}
                      onChange={(e) => setSelectedGrind(e.target.value)}
                      className="w-full text-xs bg-[#FAF7F2] border border-[#DED8CE] rounded px-3 py-1.5 text-[#1A1715] focus:outline-hidden focus:border-[#B85021] cursor-pointer"
                    >
                      {GRIND_OPTIONS.map((g) => (
                        <option key={g.id} value={g.label}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Quantity & Action Row */}
              <div className="flex items-center justify-between gap-4 pt-2">
                
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#DED8CE] rounded-lg bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#5E5852] hover:text-[#1A1715] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-mono-tabular text-sm font-semibold text-[#1A1715]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#5E5852] hover:text-[#1A1715] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Subtotal & Add button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                    isAdded
                      ? 'bg-[#3D5948] text-white'
                      : 'bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span className="text-[#EADFC9] font-mono-tabular">
                        &bull; ${totalItemPrice.toFixed(2)}
                      </span>
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
