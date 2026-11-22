import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Truck } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1A1715] text-[#FAF7F2] text-xs py-2 px-4 border-b border-[#2E2824] relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-xs tracking-wide">
          <span className="inline-flex items-center gap-1 text-[#B85021] font-medium">
            <Truck size={13} className="shrink-0" />
            <span>ROAST &amp; DISPATCH CYCLE:</span>
          </span>
          <span className="text-[#D8D2C7] hidden sm:inline">
            Fresh drum batches roasted every Monday &amp; Wednesday.
          </span>
          <span className="text-[#FAF7F2] font-medium">
            Complimentary shipping on coffee orders over $55
          </span>
          <span className="hidden md:inline-block text-[#8C847C]">•</span>
          <span className="hidden md:inline-block text-[#EADFC9] bg-[#2E2824] px-2 py-0.5 rounded border border-[#3E3731] font-mono-tabular">
            Use code <strong className="text-[#FAF7F2]">FIRSTPOUR</strong> for 10% off
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#8C847C] hover:text-[#FAF7F2] p-1 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
