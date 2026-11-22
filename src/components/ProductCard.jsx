import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { GRIND_OPTIONS, SIZE_OPTIONS } from '../data/coffeeData';
import { Eye, Plus, Check, MapPin, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addItem, openQuickView } = useCart();
  const isGear = product.category === 'Brewing Gear & Ceramics';

  const [selectedSize, setSelectedSize] = useState('250g');
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  // Price computation based on selected size
  let currentPrice = product.basePrice;
  if (!isGear) {
    if (selectedSize === '500g') currentPrice = Math.round(product.basePrice * 1.85 * 100) / 100;
    if (selectedSize === '1kg') currentPrice = Math.round(product.basePrice * 3.4 * 100) / 100;
  }

  const handleAdd = () => {
    addItem(product, selectedSize, selectedGrind, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  return (
    <article className="group bg-[#FAF7F2] rounded-xl border border-[#DED8CE] overflow-hidden flex flex-col justify-between hover:border-[#B85021]/60 hover:shadow-md transition-all duration-300">
      
      {/* Top visual area */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#EFE9DE]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.badge && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#1A1715]/90 text-[#FAF7F2] backdrop-blur-xs">
              {product.badge}
            </span>
          )}
          {product.isLimited && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#B85021] text-white">
              Limited Lot
            </span>
          )}
        </div>

        {/* Quick View Button overlay */}
        <button
          onClick={() => openQuickView(product)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1A1715] flex items-center justify-center shadow-xs transition-transform duration-200 hover:scale-110 cursor-pointer"
          aria-label={`Quick view details for ${product.name}`}
          title="Quick view product details"
        >
          <Eye size={15} />
        </button>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-between text-white text-xs">
          {!isGear && product.elevation ? (
            <span className="flex items-center gap-1 font-mono-tabular text-[11px]">
              <MapPin size={11} className="text-[#EADFC9]" />
              {product.elevation}
            </span>
          ) : (
            <span className="text-[11px] text-[#FAF7F2]/90 font-medium">
              {product.origin}
            </span>
          )}

          {!isGear && (
            <span className="text-[10px] font-mono-tabular bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">
              {product.roastLevel}
            </span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Terroir */}
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C847C] mb-1">
            {isGear ? product.subCategory : product.origin}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openQuickView(product)}
            className="font-serif-editorial text-xl font-semibold text-[#1A1715] leading-snug hover:text-[#B85021] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Tasting Notes / Feature tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.tastingNotes.slice(0, 3).map((note, index) => (
              <span
                key={index}
                className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#EFE9DE] text-[#5E5852] border border-[#E4DFD5]"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Sensory / Process summary snippet */}
          <p className="mt-3 text-xs text-[#5E5852] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Customization Controls: Size & Grind (For Coffee) */}
        <div className="mt-5 pt-4 border-t border-[#E8E2D8] flex flex-col gap-3">
          
          {!isGear ? (
            <>
              {/* Bag Size Selector */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#5E5852] mb-1.5">
                  <span className="font-medium">Bag Weight</span>
                  <span className="font-mono-tabular text-[#8C847C]">
                    {selectedSize === '250g' ? '~15 cups' : selectedSize === '500g' ? '~30 cups' : '~60 cups'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {SIZE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSize(opt.id)}
                      className={`text-xs py-1 px-1.5 rounded text-center transition-all cursor-pointer font-mono-tabular ${
                        selectedSize === opt.id
                          ? 'bg-[#1A1715] text-[#FAF7F2] font-semibold shadow-xs'
                          : 'bg-[#EFE9DE] text-[#5E5852] hover:bg-[#E5DFD3]'
                      }`}
                    >
                      {opt.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              <div>
                <label className="block text-[11px] font-medium text-[#5E5852] mb-1">
                  Grind Profile
                </label>
                <select
                  value={selectedGrind}
                  onChange={(e) => setSelectedGrind(e.target.value)}
                  className="w-full text-xs bg-[#FAF7F2] border border-[#DED8CE] rounded px-2.5 py-1.5 text-[#1A1715] focus:outline-hidden focus:border-[#B85021] cursor-pointer"
                >
                  {GRIND_OPTIONS.map((g) => (
                    <option key={g.id} value={g.label}>
                      {g.label} ({g.desc.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div className="py-1">
              <span className="text-[11px] text-[#5E5852]">
                Specification: <strong className="text-[#1A1715]">{product.material || product.capacity}</strong>
              </span>
            </div>
          )}

          {/* Pricing & Add to Bag Action */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C847C] block font-medium">
                Price
              </span>
              <span className="font-mono-tabular text-lg font-bold text-[#1A1715]">
                ${currentPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-xs active:scale-98 ${
                isAddedRecently
                  ? 'bg-[#3D5948] text-white'
                  : 'bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2]'
              }`}
            >
              {isAddedRecently ? (
                <>
                  <Check size={14} />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <Plus size={14} />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </article>
  );
}
