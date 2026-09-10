import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, BookOpen, User, Mail, Sparkles, Scale, Users, Compass, Cpu, Feather } from 'lucide-react';
import { LotusLogo } from './BrandIcons';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setOpenDropdown(null);
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
    {
      name: 'Reflections',
      path: '/category/life-reflection',
      hasDropdown: true,
      items: [
        { label: 'All Life Reflections', path: '/category/life-reflection' },
        { label: 'Wisdom in Few Words', path: '/essays' },
        { label: 'Life Perspectives', path: '/essays' }
      ]
    },
    {
      name: 'Human Behaviour',
      path: '/category/human-behaviour',
      hasDropdown: true,
      items: [
        { label: 'Human Behaviour Essays', path: '/category/human-behaviour' },
        { label: 'Understanding People', path: '/category/human-behaviour' },
        { label: 'Emotional Resilience', path: '/category/human-behaviour' }
      ]
    },
    {
      name: 'Ethics',
      path: '/category/ethics',
      hasDropdown: true,
      items: [
        { label: 'Ethics & Dilemmas', path: '/category/ethics' },
        { label: 'Moral Philosophy', path: '/category/ethics' },
        { label: 'Right and Wrong', path: '/category/ethics' }
      ]
    },
    {
      name: 'Technology & Humanity',
      path: '/category/technology',
      hasDropdown: true,
      items: [
        { label: 'Technology & Humanity', path: '/category/technology' },
        { label: 'Digital Ethics', path: '/category/technology' },
        { label: 'Mindful Technology', path: '/category/technology' }
      ]
    },
    {
      name: 'Stories',
      path: '/essays',
      hasDropdown: true,
      items: [
        { label: 'Stories & Experiences', path: '/essays' },
        { label: 'Teaching Moments', path: '/essays' },
        { label: 'Observations from Life', path: '/essays' }
      ]
    },
    {
      name: 'More',
      path: '/contact',
      hasDropdown: true,
      items: [
        { label: 'Editorial Ethos', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Search Archive', path: '/search' },
        { label: 'Admin Login', path: '/login' }
      ]
    }
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

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-ref" style={{
          display: 'none',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          {navLinks.map((item, idx) => {
            const isActive = location.pathname === item.path || (item.isHome && location.pathname === '/');
            return (
              <div
                key={idx}
                className="nav-dropdown-item"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
                style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
              >
                <Link
                  to={item.path}
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: isActive ? '600' : '450',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    padding: '0.4rem 0.1rem',
                    borderBottom: isActive ? '2px solid var(--text-primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown size={13} style={{ opacity: 0.6, marginTop: '1px' }} />
                  )}
                </Link>

                {/* Submenu Dropdown */}
                {item.hasDropdown && openDropdown === item.name && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: '210px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    padding: '0.5rem 0',
                    zIndex: 1100,
                    animation: 'fadeIn 0.15s ease'
                  }}>
                    {item.items.map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        to={sub.path}
                        style={{
                          display: 'block',
                          padding: '0.55rem 1rem',
                          fontSize: '0.84rem',
                          color: 'var(--text-secondary)',
                          transition: 'background 0.15s ease, color 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, ThemeToggle, Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search articles"
            style={{
              color: 'var(--text-primary)',
              width: '36px',
              height: '36px',
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
            <Search size={18} />
          </button>

          {/* Theme Toggle (dark/light) */}
          <ThemeToggle />

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{
              color: 'var(--text-primary)',
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              backgroundColor: 'transparent'
            }}
            className="mobile-menu-trigger"
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
                <ChevronDown size={16} style={{ opacity: 0.6, transform: 'rotate(-90deg)' }} />
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
