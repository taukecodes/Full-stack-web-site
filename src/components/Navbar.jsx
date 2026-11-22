import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Menu, X, Coffee, Compass } from 'lucide-react';

export default function Navbar({ onSelectCategory, onFocusSearch }) {
  const { itemCount, openCart, subtotal } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (sectionId, categoryFilter = null) => {
    if (categoryFilter && onSelectCategory) {
      onSelectCategory(categoryFilter);
    }
    scrollToSection(sectionId);
  };

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F4EE]/95 backdrop-blur-md shadow-xs border-b border-[#DED8CE]'
          : 'bg-[#F7F4EE] border-b border-[#E8E2D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="group flex items-center gap-2.5 text-left focus:outline-hidden"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-9 h-9 rounded-full bg-[#1A1715] flex items-center justify-center text-[#F7F4EE] group-hover:bg-[#B85021] transition-colors duration-200">
                <Coffee size={18} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-editorial text-2xl sm:text-2xl tracking-tight text-[#1A1715] font-semibold leading-none">
                  Kalo &amp; Crumb
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#5E5852] font-medium mt-1">
                  Small-Batch Roastery &bull; Est. 2021
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-wider font-semibold text-[#5E5852]">
            <button
              onClick={() => handleNavClick('catalog', 'All Provisions')}
              className="hover:text-[#B85021] transition-colors py-1 cursor-pointer"
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Single Origin')}
              className="hover:text-[#B85021] transition-colors py-1 cursor-pointer"
            >
              Single Origins
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Espresso Blends')}
              className="hover:text-[#B85021] transition-colors py-1 cursor-pointer"
            >
              Espresso Blends
            </button>
            <button
              onClick={() => handleNavClick('brew-calculator')}
              className="hover:text-[#B85021] transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              <span>Brew Calculator</span>
              <span className="text-[9px] bg-[#EADFC9] text-[#1A1715] px-1.5 py-0.5 rounded font-mono-tabular">Ratio</span>
            </button>
            <button
              onClick={() => handleNavClick('craft-process')}
              className="hover:text-[#B85021] transition-colors py-1 cursor-pointer"
            >
              Roast Craft
            </button>
            <button
              onClick={() => handleNavClick('origin-atlas')}
              className="hover:text-[#B85021] transition-colors py-1 cursor-pointer"
            >
              Origin Atlas
            </button>
            <button
              onClick={() => handleNavClick('community-reviews')}
              className="hover:text-[#B85021] transition-colors py-1 cursor-pointer"
            >
              Reviews
            </button>
          </nav>

          {/* Actions: Search & Shopping Bag */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                scrollToSection('catalog');
                if (onFocusSearch) onFocusSearch();
              }}
              className="flex items-center gap-2 text-xs font-medium text-[#5E5852] hover:text-[#1A1715] bg-[#EFE9DE]/80 hover:bg-[#EAE3D6] px-3 py-2 rounded-full border border-[#DED8CE] transition-all cursor-pointer"
              title="Search coffee and brewing gear"
              aria-label="Search coffee and brewing gear"
            >
              <Search size={15} />
              <span className="hidden sm:inline">Search Lots</span>
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2.5 bg-[#1A1715] hover:bg-[#B85021] text-[#FAF7F2] px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              aria-label={`Shopping bag with ${itemCount} items`}
            >
              <ShoppingBag size={16} />
              <span className="font-mono-tabular">Bag ({itemCount})</span>
              {subtotal > 0 && (
                <span className="hidden md:inline font-mono-tabular text-[#EADFC9] border-l border-white/20 pl-2">
                  ${subtotal.toFixed(2)}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#1A1715] p-2 hover:bg-[#EFE9DE] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#DED8CE] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium text-[#1A1715]">
            <button
              onClick={() => handleNavClick('catalog', 'All Provisions')}
              className="text-left py-2 border-b border-[#E8E2D8] hover:text-[#B85021] flex items-center justify-between"
            >
              <span>Explore All Provisions</span>
              <span className="text-xs text-[#8C847C]">Full Catalog</span>
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Single Origin')}
              className="text-left py-2 border-b border-[#E8E2D8] hover:text-[#B85021] flex items-center justify-between"
            >
              <span>Single Origin Lots</span>
              <span className="text-xs text-[#8C847C]">Nordic Light</span>
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Espresso Blends')}
              className="text-left py-2 border-b border-[#E8E2D8] hover:text-[#B85021] flex items-center justify-between"
            >
              <span>Espresso &amp; House Blends</span>
              <span className="text-xs text-[#8C847C]">Balanced</span>
            </button>
            <button
              onClick={() => handleNavClick('brew-calculator')}
              className="text-left py-2 border-b border-[#E8E2D8] hover:text-[#B85021] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>Interactive Brew Calculator</span>
                <span className="text-[10px] bg-[#EADFC9] text-[#1A1715] px-1.5 py-0.5 rounded font-mono-tabular">Ratio Tool</span>
              </div>
            </button>
            <button
              onClick={() => handleNavClick('craft-process')}
              className="text-left py-2 border-b border-[#E8E2D8] hover:text-[#B85021]"
            >
              The Roastery Discipline
            </button>
            <button
              onClick={() => handleNavClick('origin-atlas')}
              className="text-left py-2 border-b border-[#E8E2D8] hover:text-[#B85021]"
            >
              Origin Atlas &amp; Terroir
            </button>
            <button
              onClick={() => handleNavClick('community-reviews')}
              className="text-left py-2 hover:text-[#B85021]"
            >
              Customer Reviews
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
