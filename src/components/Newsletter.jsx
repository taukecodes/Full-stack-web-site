import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Sparkles, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Newsletter() {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('both');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsSubscribed(true);
    showToast('Subscribed to The Roaster’s Dispatch! Your 10% discount code is FIRSTPOUR.', 'success');
  };

  return (
    <section className="py-16 md:py-20 bg-[#FAF7F2] border-b border-[#DED8CE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-12 h-12 rounded-full bg-[#EFE9DE] text-[#B85021] flex items-center justify-center mx-auto mb-4">
          <Mail size={22} />
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#B85021] mb-2">
          <span>The Roaster&rsquo;s Dispatch</span>
        </div>

        <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1715] tracking-tight">
          Letters on origin terroir and roast curves.
        </h2>

        <p className="mt-3 text-sm text-[#5E5852] max-w-xl mx-auto leading-relaxed">
          Bi-weekly dispatches from our cupping table. First access to 30kg microlot harvests, seasonal harvest arrivals, and calibrated brew water chemistry notes.
        </p>

        {/* Form Container */}
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@domain.com"
                className="flex-1 px-4 py-3 bg-[#F7F4EE] border border-[#DED8CE] rounded-xl text-xs text-[#1A1715] placeholder:text-[#8C847C] focus:outline-hidden focus:border-[#B85021] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2] text-xs font-semibold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-[#5E5852] pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  checked={interest === 'harvest'}
                  onChange={() => setInterest('harvest')}
                  className="accent-[#B85021]"
                />
                <span>Harvest Releases</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  checked={interest === 'both'}
                  onChange={() => setInterest('both')}
                  className="accent-[#B85021]"
                />
                <span>All Dispatches &amp; Recipes</span>
              </label>
            </div>

            <p className="text-[11px] text-[#8C847C] mt-2">
              Receive 10% off your initial bag order upon confirmation &bull; No marketing spam.
            </p>
          </form>
        ) : (
          <div className="mt-8 p-6 rounded-2xl bg-[#E2EBE5] border border-[#C5D8CC] max-w-md mx-auto text-center animate-in zoom-in-95 duration-200">
            <CheckCircle2 size={24} className="text-[#3D5948] mx-auto mb-2" />
            <h4 className="font-serif-editorial text-xl font-semibold text-[#1A1715]">
              Welcome to the Cupping Table
            </h4>
            <p className="text-xs text-[#3D5948] mt-1">
              We&rsquo;ve reserved your 10% welcome discount. Use code:
            </p>
            <div className="mt-3 inline-block font-mono-tabular font-bold text-sm bg-white px-4 py-1.5 rounded-lg border border-[#A9C4B2] text-[#1A1715]">
              FIRSTPOUR
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
