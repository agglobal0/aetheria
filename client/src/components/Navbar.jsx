import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowRight, BookOpen, User, Mail, Compass, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu and search on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Lock body scroll on iOS/mobile when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
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
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.75rem', gap: '0.5rem' }}>

        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', justifyContent: 'center', minWidth: 0, flexShrink: 1 }}>
          <span style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(1.05rem, 3.8vw, 1.35rem)',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: '1.15',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            PROF. MONIKA CHOPRA
          </span>
          <span style={{
            fontSize: 'clamp(0.55rem, 1.8vw, 0.625rem)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            fontWeight: '700',
            marginTop: '0.15rem',
            lineHeight: '1',
            whiteSpace: 'nowrap'
          }}>
            Life Lessons & Moral Wisdom
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', mdDisplay: 'flex', gap: '1.35rem', alignItems: 'center' }} className="desktop-nav">
          <Link to="/" style={{ fontSize: '0.9rem', fontWeight: location.pathname === '/' ? '700' : '500', color: location.pathname === '/' ? 'var(--accent-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            Home
          </Link>
          <Link to="/essays" style={{ fontSize: '0.9rem', fontWeight: location.pathname === '/essays' ? '700' : '500', color: location.pathname === '/essays' ? 'var(--accent-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            Essays
          </Link>

          {/* Category Quick Links */}
          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', paddingLeft: '0.75rem', borderLeft: '1px solid var(--border-color)' }}>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: location.pathname === `/category/${cat.slug}` ? '700' : '500',
                  whiteSpace: 'nowrap',
                  color: location.pathname === `/category/${cat.slug}` ? 'var(--accent-primary)' : 'var(--text-secondary)'
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <Link to="/about" style={{ fontSize: '0.9rem', fontWeight: location.pathname === '/about' ? '700' : '500', color: location.pathname === '/about' ? 'var(--accent-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            About
          </Link>
          <Link to="/contact" style={{ fontSize: '0.9rem', fontWeight: location.pathname === '/contact' ? '700' : '500', color: location.pathname === '/contact' ? 'var(--accent-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            Contact
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search articles"
            style={{
              color: 'var(--text-primary)',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)'
            }}
          >
            <Search size={18} />
          </button>

          {/* Dark Mode & Palette Toggle */}
          <ThemeToggle />

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{
              color: 'var(--text-primary)',
              cursor: 'pointer',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)'
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Inline Search Bar Drawer */}
      {searchOpen && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0.85rem 0',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div className="container">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search essays by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.6rem 0.5rem',
                  fontSize: '1rem',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', flexShrink: 0 }}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fade-in">
          {/* Quick Search inside Mobile Menu */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search essays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
              Go
            </button>
          </form>

          {/* Main Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                borderColor: location.pathname === '/' ? 'var(--accent-primary)' : 'var(--border-color)',
                color: location.pathname === '/' ? 'var(--accent-primary)' : 'var(--text-primary)'
              }}
            >
              <span>Home</span>
              <ArrowRight size={16} style={{ opacity: 0.6 }} />
            </Link>

            <Link
              to="/essays"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                borderColor: location.pathname === '/essays' ? 'var(--accent-primary)' : 'var(--border-color)',
                color: location.pathname === '/essays' ? 'var(--accent-primary)' : 'var(--text-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={18} style={{ color: 'var(--accent-primary)' }} />
                <span>All Essays</span>
              </div>
              <ArrowRight size={16} style={{ opacity: 0.6 }} />
            </Link>
          </div>

          {/* Four Spheres of Wisdom Categories */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '1.25rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', fontWeight: '700' }}>
              <Sparkles size={13} /> Categories & Wisdom Spheres
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-category-item ${cat.class}`}
                >
                  <span style={{ fontWeight: '600' }}>{cat.name}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Academic & Editorial Pages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                borderColor: location.pathname === '/about' ? 'var(--accent-primary)' : 'var(--border-color)',
                color: location.pathname === '/about' ? 'var(--accent-primary)' : 'var(--text-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} style={{ color: 'var(--accent-primary)' }} />
                <span>About Prof. Monika Chopra</span>
              </div>
              <ArrowRight size={16} style={{ opacity: 0.6 }} />
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                borderColor: location.pathname === '/contact' ? 'var(--accent-primary)' : 'var(--border-color)',
                color: location.pathname === '/contact' ? 'var(--accent-primary)' : 'var(--text-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} style={{ color: 'var(--accent-primary)' }} />
                <span>Editorial Contact</span>
              </div>
              <ArrowRight size={16} style={{ opacity: 0.6 }} />
            </Link>
          </div>

          {/* Admin link */}
          <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '1rem' }}>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              Admin Editorial Login
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
