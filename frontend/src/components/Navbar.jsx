import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Globe, ChevronDown, Flame, Sparkles, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const LANGUAGES = [
  { code: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'TE', flag: '🇮🇳', name: 'Telugu (తెలుగు)' },
  { code: 'HI', flag: '🇮🇳', name: 'Hindi (हिंदी)' }
];

const Navbar = () => {
  const { cartItems, grandTotal } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState('EN');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  const selectLanguage = (code) => {
    setCurrentLang(code);
    setLangDropdownOpen(false);
  };

  return (
    <>
      {/* Top Gold Announcement Marquee Bar */}
      <div className="announcement-bar">
        <div className="announcement-marquee-track">
          <div className="announcement-item">
            <span className="announcement-fire"><Flame size={14} /></span>
            <span>
              <strong>Fresh Batch Hot Deal:</strong> Use code <strong className="promo-code-pill">ANU10</strong> for 10% OFF · Free Express Shipping on orders above ₹500 · Handcrafted Andhra Pickles
            </span>
            <Link to="/shop" className="announcement-link">
              Shop Pickles Now →
            </Link>
          </div>

          <div className="announcement-item">
            <span className="announcement-fire"><Flame size={14} /></span>
            <span>
              <strong>Fresh Batch Hot Deal:</strong> Use code <strong className="promo-code-pill">ANU10</strong> for 10% OFF · Free Express Shipping on orders above ₹500 · Handcrafted Andhra Pickles
            </span>
            <Link to="/shop" className="announcement-link">
              Shop Pickles Now →
            </Link>
          </div>

          <div className="announcement-item">
            <span className="announcement-fire"><Flame size={14} /></span>
            <span>
              <strong>Fresh Batch Hot Deal:</strong> Use code <strong className="promo-code-pill">ANU10</strong> for 10% OFF · Free Express Shipping on orders above ₹500 · Handcrafted Andhra Pickles
            </span>
            <Link to="/shop" className="announcement-link">
              Shop Pickles Now →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Navbar */}
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="navbar-logo-wrapper">
            <div className="ahf-badge-container">
              <div className="ahf-badge">AHF</div>
              <div className="badge-pulse-ring" />
            </div>
            <div className="navbar-logo-text">
              <span className="brand-name">ANU HOME FOODS</span>
              <span className="brand-tagline">"Eat Good and Feel Good!"</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Shop Pickles
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Our Story
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Contact Us
            </NavLink>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            {/* Language Selector Dropdown */}
            <div className="lang-selector-wrapper">
              <button
                className="lang-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                title="Change Language"
              >
                <Globe size={15} color="var(--mustard-gold)" />
                <span>{currentLang}</span>
                <ChevronDown size={13} />
              </button>

              {langDropdownOpen && (
                <div className="lang-dropdown-menu">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-dropdown-item ${currentLang === lang.code ? 'active' : ''}`}
                      onClick={() => selectLanguage(lang.code)}
                    >
                      <span className="lang-flag">{lang.flag}</span>
                      <span className="lang-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Search Icon Toggle */}
            <button className="nav-icon-btn" onClick={() => setShowSearchModal(!showSearchModal)} title="Search Pickles">
              <Search size={19} />
            </button>

            {/* Wishlist Heart Icon */}
            <Link to="/shop?wishlist=true" className="nav-icon-btn" title="Saved Wishlist Pickles">
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="cart-badge-count wishlist-badge">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Profile / Auth Action */}
            {user ? (
              <div className="user-profile-pill" onClick={logout} title={`Logged in as ${user.full_name}. Click to Logout`}>
                <User size={16} color="var(--mustard-gold)" />
                <span className="user-firstname">{user.full_name.split(' ')[0]}</span>
                <LogOut size={13} style={{ opacity: 0.7 }} />
              </div>
            ) : (
              <Link to="/login" className="nav-icon-btn" title="Login or Create Account">
                <User size={19} />
              </Link>
            )}

            {/* Floating Shopping Cart Button */}
            <Link to="/cart" className="header-cart-btn" title="View Shopping Cart">
              <div className="cart-icon-container">
                <ShoppingBag size={18} />
                {totalCartCount > 0 && <span className="cart-badge-count">{totalCartCount}</span>}
              </div>
              {totalCartCount > 0 && <span className="cart-header-price">₹{grandTotal}</span>}
            </Link>

            {/* Mobile Drawer Hamburger Button */}
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Navigation Menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Expandable Live Search Modal Bar */}
        {showSearchModal && (
          <div className="search-modal-overlay">
            <div className="container">
              <form onSubmit={handleSearchSubmit} className="search-form-inline">
                <Search size={20} color="var(--chili-red)" style={{ marginLeft: '14px' }} />
                <input
                  type="text"
                  placeholder="Search pickles by name, ingredient (e.g. Mango, Gongura, Garlic, Chicken)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="search-modal-input"
                />
                <button type="submit" className="btn-primary-gradient" style={{ padding: '8px 22px', borderRadius: 'var(--border-radius-pill)' }}>
                  Search
                </button>
                <button type="button" onClick={() => setShowSearchModal(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '5px' }}>
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Full-Height Side Slide Bar Drawer & Backdrop */}
        {mobileMenuOpen && (
          <div className="mobile-sidebar-overlay" onClick={() => setMobileMenuOpen(false)}>
            <div className="mobile-sidebar-panel" onClick={(e) => e.stopPropagation()}>
              {/* Drawer Header */}
              <div className="mobile-sidebar-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="ahf-badge" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>AHF</div>
                  <span className="brand-name" style={{ fontSize: '1.05rem' }}>ANU HOME FOODS</span>
                </div>
                <button className="mobile-sidebar-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close Side Menu">
                  <X size={22} color="var(--cream)" />
                </button>
              </div>

              {/* Drawer Nav Links */}
              <nav className="mobile-nav-links">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                  <Home size={18} color="var(--mustard-gold)" /> Home
                </NavLink>
                <NavLink to="/shop" onClick={() => setMobileMenuOpen(false)}>
                  <ShoppingBag size={18} color="var(--mustard-gold)" /> Shop Pickles
                </NavLink>
                <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                  <BookOpen size={18} color="var(--mustard-gold)" /> Our Story
                </NavLink>
                <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Phone size={18} color="var(--mustard-gold)" /> Contact Us
                </NavLink>
                <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)}>
                  <ShoppingBag size={18} color="var(--mustard-gold)" /> Shopping Cart ({totalCartCount})
                </NavLink>
                <NavLink to="/shop?wishlist=true" onClick={() => setMobileMenuOpen(false)}>
                  <Heart size={18} color="var(--mustard-gold)" /> Wishlist ({wishlist.length})
                </NavLink>

                {/* Mobile Language Selector Row */}
                <div className="mobile-lang-box">
                  <span className="mobile-lang-title">
                    🌐 SELECT LANGUAGE:
                  </span>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { selectLanguage(lang.code); setMobileMenuOpen(false); }}
                        className={`mobile-lang-chip ${currentLang === lang.code ? 'active' : ''}`}
                      >
                        {lang.flag} {lang.code}
                      </button>
                    ))}
                  </div>
                </div>

                {user ? (
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="mobile-logout-btn">
                    <LogOut size={16} /> Logout ({user.full_name})
                  </button>
                ) : (
                  <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <User size={18} color="var(--mustard-gold)" /> Login / Register
                  </NavLink>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
