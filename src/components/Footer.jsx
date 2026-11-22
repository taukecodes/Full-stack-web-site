import React from 'react';
import { Coffee, ShieldCheck, Heart, MapPin, Clock, ArrowUp, Leaf, Award } from 'lucide-react';

export default function Footer({ onCategoryClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1715] text-[#FAF7F2] pt-16 pb-12 border-t border-[#2E2824]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#2E2824]">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B85021] flex items-center justify-center text-white">
                <Coffee size={16} />
              </div>
              <span className="font-serif-editorial text-2xl font-semibold tracking-tight text-[#FAF7F2]">
                Kalo &amp; Crumb
              </span>
            </div>

            <p className="text-xs text-[#A8A199] leading-relaxed max-w-sm">
              Independent small-batch specialty coffee roastery. We calibrate micro-lot coffees on our Loring convection roaster, honoring origin terroir and supporting equitable direct-trade farm partnerships.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#A8A199]">
              <span className="bg-[#2E2824] px-2.5 py-1 rounded border border-[#3E3731] flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#B85021]" />
                Direct Trade Gate Price
              </span>
              <span className="bg-[#2E2824] px-2.5 py-1 rounded border border-[#3E3731] flex items-center gap-1">
                <Leaf size={12} className="text-[#3D5948]" />
                1% For Soil Health
              </span>
            </div>
          </div>

          {/* Links Column 1: Provisions (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#EADFC9]">
              Provisions
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A199]">
              <li>
                <a
                  href="#catalog"
                  onClick={() => onCategoryClick && onCategoryClick('Single Origin')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Single Origin Lots
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={() => onCategoryClick && onCategoryClick('Espresso Blends')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Espresso Blends
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={() => onCategoryClick && onCategoryClick('Decaf & Low-Caf')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Mountain Water Decaf
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={() => onCategoryClick && onCategoryClick('Brewing Gear & Ceramics')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Ceramics &amp; Drippers
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={() => onCategoryClick && onCategoryClick('All Provisions')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  All Inventory
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Craft & Story (Col 7-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#EADFC9]">
              Craft &amp; Knowledge
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A199]">
              <li>
                <a href="#brew-calculator" className="hover:text-[#FAF7F2] transition-colors">
                  Interactive Brew Ratio Calculator
                </a>
              </li>
              <li>
                <a href="#craft-process" className="hover:text-[#FAF7F2] transition-colors">
                  Loring S15 Roasting Principles
                </a>
              </li>
              <li>
                <a href="#origin-atlas" className="hover:text-[#FAF7F2] transition-colors">
                  Origin Atlas &amp; Terroir Guide
                </a>
              </li>
              <li>
                <a href="#community-reviews" className="hover:text-[#FAF7F2] transition-colors">
                  Customer &amp; Barista Reviews
                </a>
              </li>
              <li>
                <a href="#craft-process" className="hover:text-[#FAF7F2] transition-colors">
                  Q-Grader Cupping Standards
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: The Roastery Physical Lab (Col 9-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#EADFC9]">
              Roastery &amp; Cupping Room
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#A8A199]">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#B85021] shrink-0 mt-0.5" />
                <span>
                  14 Timber Dock Basin, Wharf 3<br />
                  Specialty Quarter, Portland, OR 97209
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#B85021] shrink-0 mt-0.5" />
                <span>
                  Tasting Room: Thu – Sun (8am – 3pm)<br />
                  Roasting Cycles: Mon &amp; Wed
                </span>
              </div>

              <div className="pt-2 text-[11px] text-[#8C847C]">
                Dispatch Schedule: Dispatched within 24 hours of drum cooling via carbon-neutral ground courier.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C847C]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Kalo &amp; Crumb Roastery Ltd. All rights reserved.</span>
            <span className="hidden md:inline">&bull;</span>
            <span className="hidden md:inline">Slow Roasts &bull; Honest Terroir</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#A8A199] font-mono-tabular text-[11px]">
              Live Batch: Guji Uraga #042
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#2E2824] hover:bg-[#3E3731] text-[#FAF7F2] transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={14} />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
