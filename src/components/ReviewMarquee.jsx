import React from 'react';
import { REVIEWS } from '../data/reviewsData';
import { Star, CheckCircle, Coffee, MessageSquareHeart } from 'lucide-react';

export default function ReviewMarquee() {
  // Duplicate reviews to create infinite seamless loop
  const marqueeItems = [...REVIEWS, ...REVIEWS];

  return (
    <section id="community-reviews" className="py-16 md:py-24 border-b border-[#DED8CE] overflow-hidden bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#B85021] mb-2">
            <MessageSquareHeart size={14} />
            <span>Voices From The Morning Ritual</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715] tracking-tight">
            Notes from home baristas and cupping tables.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5E5852]">
            Unfiltered feedback from coffee obsessives, cafe owners, and daily pour-over ritualists around the world.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Soft edge blur masks for continuous editorial fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[#F7F4EE] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[#F7F4EE] to-transparent" />

        <div className="animate-marquee flex gap-6">
          {marqueeItems.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-80 sm:w-96 shrink-0 bg-[#FAF7F2] rounded-2xl p-6 border border-[#DED8CE] shadow-2xs hover:border-[#B85021] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & verified tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#C88A36]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-[10px] font-semibold text-[#3D5948] bg-[#E2EBE5] px-2 py-0.5 rounded-full">
                    <CheckCircle size={10} />
                    Verified Brewer
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#1A1715] font-normal leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-5 pt-4 border-t border-[#E8E2D8]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1A1715]">
                    {review.reviewer}
                  </span>
                  <span className="text-[11px] text-[#8C847C]">
                    {review.location}
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between text-[11px] text-[#5E5852]">
                  <span className="truncate max-w-[190px]">
                    Setup: <strong className="font-medium text-[#1A1715]">{review.brewMethod}</strong>
                  </span>
                  <span className="font-mono-tabular text-[#B85021] text-[10px] shrink-0">
                    {review.coffeePurchased.split(' ')[0]} Lot
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Marquee Hint */}
      <div className="text-center mt-6">
        <span className="text-[11px] text-[#8C847C] font-mono-tabular">
          Hover to pause carousel &bull; 4.9/5 average rating across 1,420+ lots dispatched
        </span>
      </div>
    </section>
  );
}
