import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/products';

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  priceLimit,
  setPriceLimit,
  sortBy,
  setSortBy,
  resetFilters
}) => {
  return (
    <aside className="filter-sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--chili-red)" /> Filter Pickles
        </h3>
        <button
          onClick={resetFilters}
          style={{ background: 'none', border: 'none', color: 'var(--chili-red)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      {/* Categories Filter */}
      <div className="filter-group">
        <h4 className="filter-title">Pickle Category</h4>
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            className={`filter-option ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <h4 className="filter-title">Max Price: ₹{priceLimit}</h4>
        <input
          type="range"
          min="150"
          max="1200"
          step="50"
          value={priceLimit}
          onChange={(e) => setPriceLimit(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--chili-red)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#776a5c', marginTop: '4px' }}>
          <span>₹150</span>
          <span>₹1200</span>
        </div>
      </div>

      {/* Sort Option */}
      <div className="filter-group">
        <h4 className="filter-title">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', background: 'var(--cream)' }}
        >
          <option value="featured">Featured Pickles</option>
          <option value="bestseller">Bestsellers First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
