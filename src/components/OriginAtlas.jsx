import React, { useState } from 'react';
import { ORIGINS_TERROIR } from '../data/reviewsData';
import { Globe, MapPin, Calendar, Mountain, Layers, ArrowRight } from 'lucide-react';

export default function OriginAtlas({ onSelectOriginLot }) {
  const [selectedOriginId, setSelectedOriginId] = useState('ethiopia');
  const activeOrigin = ORIGINS_TERROIR.find((o) => o.id === selectedOriginId) || ORIGINS_TERROIR[0];

  return (
    <section id="origin-atlas" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#DED8CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#B85021] mb-2">
              <Globe size={14} />
              <span>Geographic Terroir &amp; Traceability</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1715] tracking-tight">
              The Origin Atlas
            </h2>
            <p className="mt-2 text-sm text-[#5E5852] max-w-xl">
              Flavor begins long before the roast. Soil minerals, diurnal temperature swings, and indigenous trees shape each harvest's chemical blueprint.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ORIGINS_TERROIR.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedOriginId(item.id)}
                className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedOriginId === item.id
                    ? 'bg-[#1A1715] text-[#FAF7F2] shadow-xs'
                    : 'bg-[#EFE9DE] text-[#5E5852] hover:bg-[#E5DFD3] border border-[#DED8CE]'
                }`}
              >
                {item.country}
              </button>
            ))}
          </div>
        </div>

        {/* Origin Terroir Display Card */}
        <div className="bg-[#F7F4EE] rounded-2xl border border-[#DED8CE] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto min-h-[320px]">
              <img
                src={activeOrigin.image}
                alt={`${activeOrigin.country} coffee farm`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#EADFC9] block mb-1">
                  Active Terroir Region
                </span>
                <h3 className="font-serif-editorial text-3xl font-semibold">
                  {activeOrigin.country}
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  {activeOrigin.region}
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                
                {/* Title & Profile */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#DED8CE]">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B85021]">
                      Terroir Signature
                    </span>
                    <h4 className="font-serif-editorial text-2xl font-semibold text-[#1A1715] mt-0.5">
                      {activeOrigin.profileTitle}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {activeOrigin.flavorNotes.map((note, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-[#EFE9DE] text-[#1A1715] px-2.5 py-1 rounded-md border border-[#DED8CE]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Narrative */}
                <p className="mt-5 text-sm text-[#5E5852] leading-relaxed">
                  {activeOrigin.story}
                </p>

                {/* Terroir Metrics Matrix */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#DED8CE]">
                  <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#DED8CE]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C847C] font-semibold flex items-center gap-1">
                      <Mountain size={12} className="text-[#B85021]" />
                      Elevation
                    </span>
                    <span className="font-mono-tabular text-xs sm:text-sm font-bold text-[#1A1715] block mt-1">
                      {activeOrigin.elevation}
                    </span>
                  </div>

                  <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#DED8CE]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C847C] font-semibold flex items-center gap-1">
                      <Layers size={12} className="text-[#B85021]" />
                      Soil Type
                    </span>
                    <span className="text-xs font-semibold text-[#1A1715] block mt-1 line-clamp-1" title={activeOrigin.soil}>
                      {activeOrigin.soil.split(',')[0]}
                    </span>
                  </div>

                  <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#DED8CE]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C847C] font-semibold flex items-center gap-1">
                      <Calendar size={12} className="text-[#B85021]" />
                      Harvest Window
                    </span>
                    <span className="text-xs font-semibold text-[#1A1715] block mt-1">
                      {activeOrigin.harvestSeason}
                    </span>
                  </div>
                </div>

              </div>

              {/* Active Lots Footer */}
              <div className="mt-8 pt-5 border-t border-[#DED8CE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8C847C] block font-semibold mb-1">
                    Currently Roasting From {activeOrigin.country}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeOrigin.activeLots.map((lot, idx) => (
                      <span key={idx} className="text-xs font-mono-tabular font-semibold text-[#1A1715]">
                        {lot} {idx < activeOrigin.activeLots.length - 1 ? '&bull;' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#catalog"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B85021] hover:text-[#9E4319] hover:underline whitespace-nowrap cursor-pointer"
                >
                  <span>Filter {activeOrigin.country} Coffees</span>
                  <ArrowRight size={14} />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
