import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import api from '../services/api';
import { useWishlist } from '../context/WishlistContext';

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get('category') || 'all';
  const urlSearch = queryParams.get('search') || '';
  const urlWishlist = queryParams.get('wishlist') === 'true';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [priceLimit, setPriceLimit] = useState(1200);
  const [sortBy, setSortBy] = useState('featured');

  const { wishlist } = useWishlist();

  useEffect(() => {
    document.title = 'Shop Homemade Pickles | ANU HOME FOODS';
  }, []);

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setSearchTerm(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      if (urlWishlist) {
        setProducts(wishlist);
        setLoading(false);
        return;
      }

      const res = await api.getProducts({
        category: selectedCategory,
        search: searchTerm,
        priceRange: priceLimit,
        sortBy
      });

      if (res.success) {
        setProducts(res.data);
      }
      setLoading(false);
    };

    fetchFilteredProducts();
  }, [selectedCategory, searchTerm, priceLimit, sortBy, urlWishlist, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setPriceLimit(1200);
    setSortBy('featured');
  };

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div style={{ padding: '30px 0 80px 0', background: 'var(--cream)' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--dark-brown)', fontWeight: 600 }}>
            {urlWishlist ? 'My Favorite Wishlist Pickles' : 'Shop Pickles'}
          </span>
        </div>

        {/* Header Title Banner */}
        <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="shop-page-title" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark-brown)', fontWeight: 800 }}>
              {urlWishlist ? 'Your Wishlist Pickles' : 'Shop Homemade Pickles'}
            </h1>
            <p style={{ color: '#776a5c', marginTop: '4px', fontSize: '0.92rem' }}>
              Showing {products.length} authentic homemade pickle varieties
            </p>
          </div>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="mobile-filter-bar">
          <button
            className="mobile-filter-btn"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            ⚙️ Filters & Sorting ({selectedCategory !== 'all' ? selectedCategory : 'All'})
          </button>
        </div>

        {/* Main Shop Layout */}
        <div className="shop-layout">
          <div className={`filter-sidebar-wrapper ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={(cat) => { setSelectedCategory(cat); setMobileFilterOpen(false); }}
              priceLimit={priceLimit}
              setPriceLimit={setPriceLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              resetFilters={resetFilters}
            />
          </div>

          <div>
            {loading ? <Loading /> : <ProductGrid products={products} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
