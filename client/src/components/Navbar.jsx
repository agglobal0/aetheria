import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Ethics', slug: 'ethics', class: 'category-ethics' },
    { name: 'Human Behaviour', slug: 'human-behaviour', class: 'category-human-behaviour' },
    { name: 'Life Reflection', slug: 'life-reflection', class: 'category-life-reflection' },
    { name: 'Technology', slug: 'technology', class: 'category-technology' }
  ];

  return (
    <header className="nav-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.75rem' }}>

        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-title)', fontSize: '1.35rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: '1.2' }}>
            PROF. MONIKA CHOPRA
          </span>
          <span style={{ fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: '700', marginTop: '0.1rem', lineHeight: '1' }}>
            Life Lessons & Moral Wisdom
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', mdDisplay: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
          <Link to="/" style={{ fontSize: '0.9rem', fontWeight: location.pathname === '/' ? '600' : '400', color: location.pathname === '/' ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            Home
          </Link>
          <Link to="/essays" style={{ fontSize: '0.9rem', fontWeight: location.pathname === '/essays' ? '600' : '400', color: location.pathname === '/essays' ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            Essays
          </Link>

          {/* Category Quick Links */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingLeft: '0.75rem', borderLeft: '1px solid var(--border-color)' }}>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: location.pathname === `/category/${cat.slug}` ? '600' : '500',
                  whiteSpace: 'nowrap',
                  color: location.pathname === `/category/${cat.slug}` ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <Link to="/about" style={{ fontSize: '0.9rem', color: location.pathname === '/about' ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            About Prof. Chopra
          </Link>
          <Link to="/contact" style={{ fontSize: '0.9rem', color: location.pathname === '/contact' ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            Contact
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search articles"
            style={{ color: 'var(--text-primary)', padding: '0.4rem', cursor: 'pointer' }}
          >
            <Search size={20} />
          </button>

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Inline Search Bar Drawer */}
      {searchOpen && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem 0',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div className="container">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Search size={20} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search essays by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.6rem 0',
                  fontSize: '1.05rem',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '4.5rem',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--bg-primary)',
          zIndex: 99,
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: '600' }}>
            Home
          </Link>
          <Link to="/essays" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: '600' }}>
            All Essays
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: '600' }}>
              Categories
            </span>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className={cat.class}
                style={{ fontSize: '1rem', fontWeight: '500' }}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem' }}>
            About Prof. Chopra
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem' }}>
            Contact Us
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
