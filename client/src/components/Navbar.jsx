import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { LotusLogo } from './BrandIcons';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Lock body scroll on mobile drawer
  useEffect(() => {
    if (mobileMenuOpen) {
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

  const navLinks = [
    { name: 'Home', path: '/', isHome: true },
    { name: 'About', path: '/about' },
    { name: 'Reflections', path: '/category/life-reflection' },
    { name: 'Human Behaviour', path: '/category/human-behaviour' },
    { name: 'Ethics', path: '/category/ethics' },
    { name: 'Technology & Humanity', path: '/category/technology' },
    { name: 'Stories', path: '/essays' },
    { name: 'More', path: '/contact' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'var(--nav-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.85rem',
        gap: '0.75rem'
      }}>

        {/* Brand Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          minWidth: 0,
          flexShrink: 0
        }}>
          <LotusLogo size={36} color="var(--accent-gold)" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap'
            }}>
              Prof. Monika Chopra
            </span>
            <span style={{
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)',
              fontWeight: '500',
              marginTop: '0.1rem',
              lineHeight: '1',
              whiteSpace: 'nowrap'
            }}>
              Life Lessons <span style={{ opacity: 0.5, margin: '0 0.2rem' }}>|</span> Moral Wisdom
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Direct clickable links without dropdowns) */}
        <nav className="desktop-nav-ref" style={{
          display: 'none',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          {navLinks.map((item, idx) => {
            const isActive = location.pathname === item.path || (item.isHome && location.pathname === '/');
            return (
              <Link
                key={idx}
                to={item.path}
                style={{
                  fontSize: '0.86rem',
                  fontWeight: isActive ? '600' : '450',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.4rem 0.1rem',
                  borderBottom: isActive ? '2px solid var(--text-primary)' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, Theme Toggle, and Menu Drawer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
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
              border: 'none',
              backgroundColor: 'transparent',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Search size={19} />
          </button>

          {/* Working Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Drawer Toggle */}
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
              border: 'none',
              backgroundColor: 'transparent',
              transition: 'background 0.2s ease'
            }}
            className="mobile-menu-trigger"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                placeholder="Search reflections, essays, and wisdom topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.6rem 0.5rem',
                  fontSize: '0.95rem',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)'
                }}
              />
              <button type="submit" className="btn btn-dark-green" style={{ padding: '0.45rem 1.2rem', fontSize: '0.85rem', flexShrink: 0 }}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fade-in">
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search reflections..."
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
            <button type="submit" className="btn btn-dark-green" style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
              Go
            </button>
          </form>

          {/* Navigation Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1040px) {
          .desktop-nav-ref { display: flex !important; }
          .mobile-menu-trigger { display: none !important; }
        }
        @media (max-width: 1039px) {
          .desktop-nav-ref { display: none !important; }
          .mobile-menu-trigger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
