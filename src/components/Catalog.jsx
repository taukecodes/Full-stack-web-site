import React, { useState, useMemo, forwardRef } from 'react';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import ProductCard from './ProductCard';
import { Search, X, SlidersHorizontal, ArrowUpDown, Filter, Sparkles, Coffee } from 'lucide-react';

const CATEGORIES = [
  'All Provisions',
  'Single Origin',
  'Espresso Blends',
  'Decaf & Low-Caf',
  'Brewing Gear & Ceramics'
];

const ROAST_LEVELS = [
  'All Roasts',
  'Nordic Light',
  'Light-Medium',
  'Medium'
];

const Catalog = forwardRef(function Catalog({ initialCategory = 'All Provisions' }, searchInputRef) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRoast, setSelectedRoast] = useState('All Roasts');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return COFFEE_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All Provisions' && product.category !== selectedCategory) {
        return false;
      }

      // Roast filter
      if (selectedRoast !== 'All Roasts') {
        if (product.category === 'Brewing Gear & Ceramics') return false;
        if (product.roastLevel !== selectedRoast) return false;
      }

      // Search query (matches title, origin, tasting notes, varietal)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchOrigin = product.origin ? product.origin.toLowerCase().includes(query) : false;
        const matchNotes = product.tastingNotes ? product.tastingNotes.some((n) => n.toLowerCase().includes(query)) : false;
        const matchVarietal = product.varietal ? product.varietal.toLowerCase().includes(query) : false;
        const matchDesc = product.description ? product.description.toLowerCase().includes(query) : false;

        if (!matchName && !matchOrigin && !matchNotes && !matchVarietal && !matchDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'elevation') {
        const elevA = parseInt(a.elevation?.replace(/[^0-9]/g, '') || '0', 10);
        const elevB = parseInt(b.elevation?.replace(/[^0-9]/g, '') || '0', 10);
        return elevB - elevA;
      }
      // default: featured lots
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, selectedRoast, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All Provisions');
    setSelectedRoast('All Roasts');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'All Provisions' || selectedRoast !== 'All Roasts' || searchQuery !== '';

  return (
    <section id="catalog" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#DED8CE]">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#B85021] mb-2">
            <Coffee size={14} />
            <span>Seasonal Provisions &bull; Small-Batch Inventory</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1715] tracking-tight">
            Current Drum Roasts &amp; Gear
          </h2>
          <p className="mt-2 text-sm text-[#5E5852] max-w-xl">
            Each lot is roasted to order, packaged into recyclable nitrogen-purged pouches, and dispatched with roast date stamping.
          </p>
        </div>

        {/* Results count pill */}
        <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#5E5852]">
          <span>Showing</span>
          <span className="font-bold text-[#1A1715] bg-[#EFE9DE] px-2.5 py-1 rounded border border-[#DED8CE]">
            {filteredProducts.length} lots
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col gap-5 mb-8">
        
        {/* Top bar: Category tabs scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E2D8] scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1A1715] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#FAF7F2] text-[#5E5852] hover:bg-[#EFE9DE] border border-[#DED8CE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Bar: Search, Roast filter, Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C847C]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by lot name, tasting notes, origin, or varietal..."
              className="w-full pl-9 pr-8 py-2.5 bg-[#FAF7F2] border border-[#DED8CE] rounded-lg text-xs text-[#1A1715] placeholder:text-[#8C847C] focus:outline-hidden focus:border-[#B85021] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C847C] hover:text-[#1A1715] p-0.5"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Roast Level filter chips */}
          <div className="md:col-span-3 flex items-center gap-1.5 overflow-x-auto">
            {ROAST_LEVELS.map((roast) => (
              <button
                key={roast}
                onClick={() => setSelectedRoast(roast)}
                className={`text-[11px] px-2.5 py-1.5 rounded-md whitespace-nowrap transition-all cursor-pointer ${
                  selectedRoast === roast
                    ? 'bg-[#B85021] text-white font-semibold'
                    : 'bg-[#EFE9DE] text-[#5E5852] hover:bg-[#E2DCCE]'
                }`}
              >
                {roast}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="md:col-span-3 flex items-center justify-end gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#8C847C] font-medium shrink-0">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-[#FAF7F2] border border-[#DED8CE] rounded-lg px-2.5 py-2 text-[#1A1715] focus:outline-hidden focus:border-[#B85021] cursor-pointer"
            >
              <option value="featured">Featured Harvests</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="elevation">Highest Elevation</option>
            </select>
          </div>

        </div>

        {/* Active Filters Clear tag */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-xs text-[#5E5852]">
            <span>Active filters:</span>
            {selectedCategory !== 'All Provisions' && (
              <span className="bg-[#EFE9DE] px-2 py-0.5 rounded text-[11px] font-medium text-[#1A1715] flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All Provisions')}>&times;</button>
              </span>
            )}
            {selectedRoast !== 'All Roasts' && (
              <span className="bg-[#EFE9DE] px-2 py-0.5 rounded text-[11px] font-medium text-[#1A1715] flex items-center gap-1">
                {selectedRoast}
                <button onClick={() => setSelectedRoast('All Roasts')}>&times;</button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-[#EFE9DE] px-2 py-0.5 rounded text-[11px] font-medium text-[#1A1715] flex items-center gap-1">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')}>&times;</button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[#B85021] hover:underline font-semibold text-[11px] ml-2 cursor-pointer"
            >
              Reset all
            </button>
          </div>
        )}

      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DED8CE] p-8">
          <div className="w-12 h-12 rounded-full bg-[#EFE9DE] flex items-center justify-center mx-auto text-[#B85021] mb-3">
            <Search size={22} />
          </div>
          <h3 className="font-serif-editorial text-2xl font-semibold text-[#1A1715]">
            No matching coffees or gear found
          </h3>
          <p className="mt-2 text-xs text-[#5E5852] max-w-md mx-auto">
            We couldn&rsquo;t find anything matching your search. Try searching for &ldquo;Guji&rdquo;, &ldquo;Pink Bourbon&rdquo;, &ldquo;Espresso&rdquo;, or &ldquo;Ceramic&rdquo;.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 inline-flex items-center gap-2 bg-[#1A1715] text-[#FAF7F2] text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#B85021] transition-colors cursor-pointer"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

    </section>
  );
});

export default Catalog;
