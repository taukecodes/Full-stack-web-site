import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, Sparkles, Flame, Sliders, ShieldCheck, MapPin } from 'lucide-react';
import { COFFEE_PRODUCTS } from '../data/coffeeData';

export default function Hero({ onExploreClick, onCalculatorClick }) {
  const { addItem, openQuickView } = useCart();
  const spotlightCoffee = COFFEE_PRODUCTS[0]; // Guji Uraga Natural

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#DED8CE]">
      {/* Subtle organic watermark / background warmth */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#EFE4D2]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-[#E8DCC8]/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Moniker */}
        <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest font-semibold text-[#8C847C]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#B85021] animate-pulse" />
          <span>Small-Batch Roastery &bull; Current Drum Lot #042</span>
          <span className="hidden sm:inline">&bull; Dispatched 24h Post-Roast</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Expressive Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-[#1A1715] font-normal">
              Coffee roasted with <span className="italic font-light text-[#B85021]">unhurried reverence</span> for origin terroir.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#5E5852] max-w-xl font-normal leading-relaxed">
              We source transparent microlots directly from smallholder washing stations in Oromia, Huila, and Nyeri. Roasted on our Loring convection drum in calibrated 12.5kg batches—preserving fragile floral aromatics and natural sucrose without smoky bitterness.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2] px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2.5 shadow-sm active:scale-98 cursor-pointer"
              >
                <span>Explore Current Harvest</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onCalculatorClick}
                className="bg-[#FAF7F2] hover:bg-[#EFE9DE] text-[#1A1715] px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200 border border-[#DED8CE] flex items-center gap-2 cursor-pointer"
              >
                <Sliders size={16} className="text-[#B85021]" />
                <span>Interactive Brew Calculator</span>
              </button>
            </div>

            {/* Proof Points Strip */}
            <div className="mt-12 pt-8 border-t border-[#DED8CE] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#5E5852]">
              <div>
                <span className="block font-mono-tabular text-lg font-semibold text-[#1A1715]">
                  100%
                </span>
                <span className="font-medium">Direct-Trade Traceability</span>
              </div>
              <div>
                <span className="block font-mono-tabular text-lg font-semibold text-[#1A1715]">
                  Loring S15
                </span>
                <span className="font-medium">Single-Pass Clean Convection</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-mono-tabular text-lg font-semibold text-[#1A1715]">
                  74 / 88
                </span>
                <span className="font-medium">Agtron Nordic Light Calibration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tactile "Currently on the Drum" Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#DED8CE] shadow-md hover:shadow-lg transition-all duration-300">
              
              {/* Badge strip */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#EADFC9] text-[#1A1715] border border-[#D8CEBC]">
                  <Flame size={12} className="text-[#B85021]" />
                  <span>Featured Drum Batch</span>
                </span>
                <span className="text-xs font-mono-tabular text-[#8C847C]">
                  Lot #042 &bull; 250g
                </span>
              </div>

              {/* Coffee Card Image Container */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-5 bg-[#EFE9DE] border border-[#E4DFD5] group">
                <img
                  src={spotlightCoffee.image}
                  alt={spotlightCoffee.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-mono-tabular font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                    <MapPin size={11} className="text-[#EADFC9]" />
                    {spotlightCoffee.elevation}
                  </span>
                  <span className="bg-[#B85021] text-white px-2 py-0.5 rounded text-[11px] font-semibold">
                    {spotlightCoffee.process.split(' ')[0]} Process
                  </span>
                </div>
              </div>

              {/* Title & Origin */}
              <div>
                <p className="text-xs font-medium text-[#B85021] uppercase tracking-wider">
                  {spotlightCoffee.origin}
                </p>
                <h3 className="font-serif-editorial text-2xl font-semibold text-[#1A1715] mt-1">
                  {spotlightCoffee.name}
                </h3>
                <p className="text-xs text-[#5E5852] mt-1.5 line-clamp-2 leading-relaxed">
                  {spotlightCoffee.description}
                </p>
              </div>

              {/* Tasting Notes Tags */}
              <div className="mt-4 pt-4 border-t border-[#E8E2D8]">
                <span className="text-[10px] uppercase tracking-wider text-[#8C847C] font-semibold block mb-2">
                  Cupping Notes (Sensory Lab):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {spotlightCoffee.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-[#EFE9DE] text-[#1A1715] px-2.5 py-1 rounded-md border border-[#DED8CE]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Price & Actions */}
              <div className="mt-6 pt-4 border-t border-[#E8E2D8] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C847C] block font-medium">
                    Whole Bean / 250g
                  </span>
                  <span className="font-mono-tabular text-xl font-bold text-[#1A1715]">
                    ${spotlightCoffee.basePrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openQuickView(spotlightCoffee)}
                    className="text-xs font-semibold text-[#1A1715] hover:text-[#B85021] px-3 py-2 rounded-lg border border-[#DED8CE] hover:border-[#B85021] transition-colors cursor-pointer"
                  >
                    View Dossier
                  </button>
                  <button
                    onClick={() => addItem(spotlightCoffee, '250g', 'Whole Bean', 1)}
                    className="bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2] text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
