import React, { useRef, useState } from 'react';
import { CartProvider } from './context/CartContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import BrewCalculator from './components/BrewCalculator';
import RoastProcess from './components/RoastProcess';
import OriginAtlas from './components/OriginAtlas';
import ReviewMarquee from './components/ReviewMarquee';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';

export default function App() {
  const catalogSearchRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All Provisions');

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFocusSearch = () => {
    if (catalogSearchRef.current) {
      catalogSearchRef.current.focus();
    }
  };

  const handleExploreClick = () => {
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCalculatorClick = () => {
    const calc = document.getElementById('brew-calculator');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1A1715] selection:bg-[#B85021] selection:text-[#FAF7F2]">
        
        {/* Top Fresh Roast Cycle Announcement */}
        <AnnouncementBar />

        {/* Sticky Editorial Navigation */}
        <Navbar
          onSelectCategory={handleSelectCategory}
          onFocusSearch={handleFocusSearch}
        />

        {/* Main Brand Content Sections */}
        <main className="flex-1">
          {/* Editorial Hero */}
          <Hero
            onExploreClick={handleExploreClick}
            onCalculatorClick={handleCalculatorClick}
          />

          {/* Interactive Coffee & Gear Catalog */}
          <Catalog
            ref={catalogSearchRef}
            initialCategory={activeCategory}
          />

          {/* Interactive Brew Ratio & Extraction Calculator */}
          <BrewCalculator />

          {/* Roast-to-Cup Process & Storytelling */}
          <RoastProcess />

          {/* Geographic Terroir & Origin Atlas */}
          <OriginAtlas
            onSelectOriginLot={handleSelectCategory}
          />

          {/* Continuous Authentic Community Review Marquee */}
          <ReviewMarquee />

          {/* Roaster's Dispatch Newsletter */}
          <Newsletter />
        </main>

        {/* Rich Studio Footer */}
        <Footer onCategoryClick={handleSelectCategory} />

        {/* Overlay Modals & Drawers */}
        <ProductQuickViewModal />
        <CartDrawer />
        <CheckoutModal />

        {/* Floating Notification System */}
        <Toast />

      </div>
    </CartProvider>
  );
}
