import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  BookOpen, 
  Brain, 
  HeartPulse, 
  Lightbulb, 
  Flower2 
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

// Custom Botanical Leaf Branch Separator matching the user reference
const LeafSeparator = () => (
  <span className="navbar-leaf-sep" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', margin: '0 0.35rem', opacity: 0.85, flexShrink: 0 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C12 22 12.5 15 16 11C18.5 8 21.5 6.5 21.5 6.5C21.5 6.5 19.5 10 16.5 12.5C14 14.5 12 22 12 22Z" fill="#7FA98E" fillOpacity="0.45" stroke="#5E8B6F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22C12 22 11.5 16 8 13.5C5.5 11.5 2.5 11 2.5 11C2.5 11 5.5 9 9.5 11.5C11 12.5 12 22 12 22Z" fill="#7FA98E" fillOpacity="0.45" stroke="#5E8B6F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22V11" stroke="#5E8B6F" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  </span>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  
  const exploreRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setExploreOpen(false);
    setMobileExploreOpen(false);
  }, [location.pathname]);

  // Click outside to close explore dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const categories = [
    {
      name: 'Reflections',
      path: '/category/reflections',
      icon: <BookOpen size={16} color="#0D9488" />,
      bg: '#E6F4F1'
    },
    {
      name: 'Emotional Intelligence',
      path: '/category/emotional-intelligence',
      icon: <Brain size={16} color="#16A34A" />,
      bg: '#EAF7EE'
    },
    {
      name: 'Healing',
      path: '/category/healing',
      icon: <HeartPulse size={16} color="#D97706" />,
      bg: '#FDF2E9'
    },
    {
      name: 'Wisdom',
      path: '/category/wisdom',
      icon: <Lightbulb size={16} color="#CA8A04" />,
      bg: '#FEF9C3'
    },
    {
      name: 'Spirituality',
      path: '/category/spirituality',
      icon: <Flower2 size={16} color="#0284C7" />,
      bg: '#E0F2FE'
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
      boxShadow: '0 2px 12px rgba(44, 38, 33, 0.03)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.75rem',
        padding: '0 clamp(1rem, 3vw, 2rem)',
        position: 'relative'
      }}>

        {/* Left Side: Brand Identity (Mobile & Compact Desktop) */}
        <Link to="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          flexShrink: 0
        }}>
          <span className="navbar-brand-text" style={{
            fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            color: 'var(--accent-primary)',
            fontWeight: '600',
            letterSpacing: '0.02em',
            lineHeight: 1
          }}>
            Aetheria
          </span>
        </Link>

        {/* Center: Botanical Script Navigation Links */}
        <nav className="botanical-navbar-links" style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.2rem',
          flex: 1,
          margin: '0 1rem'
        }}>
          {/* 1. Home */}
          <Link
            to="/"
            className="botanical-nav-item"
            style={{
              fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
              fontSize: 'clamp(1.35rem, 1.8vw, 1.65rem)',
              color: location.pathname === '/' ? 'var(--accent-primary)' : 'var(--text-primary)',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              transition: 'color 0.2s ease, transform 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            Home
          </Link>

          <LeafSeparator />

          {/* 2. About Aetheria */}
          <Link
            to="/about"
            className="botanical-nav-item"
            style={{
              fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
              fontSize: 'clamp(1.35rem, 1.8vw, 1.65rem)',
              color: location.pathname === '/about' ? 'var(--accent-primary)' : 'var(--text-primary)',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              transition: 'color 0.2s ease, transform 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            About Aetheria
          </Link>

          <LeafSeparator />

          {/* 3. The Person Behind This */}
          <Link
            to="/about#author"
            className="botanical-nav-item"
            style={{
              fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
              fontSize: 'clamp(1.35rem, 1.8vw, 1.65rem)',
              color: location.hash === '#author' ? 'var(--accent-primary)' : 'var(--text-primary)',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              transition: 'color 0.2s ease, transform 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            The Person Behind This
          </Link>

          <LeafSeparator />

          {/* 4. Explore (Dropdown) */}
          <div 
            ref={exploreRef}
            style={{ position: 'relative' }}
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className="botanical-nav-item"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                fontSize: 'clamp(1.35rem, 1.8vw, 1.65rem)',
                color: (exploreOpen || location.pathname.startsWith('/category')) ? 'var(--accent-primary)' : 'var(--text-primary)',
                padding: '0.25rem 0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <span>Explore</span>
              <ChevronDown 
                size={14} 
                style={{ 
                  transition: 'transform 0.2s ease',
                  transform: exploreOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  opacity: 0.7
                }} 
              />
            </button>

            {/* Explore Dropdown Card matching the user's screenshot */}
            {exploreOpen && (
              <div 
                className="explore-dropdown-card"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '0.65rem',
                  boxShadow: '0 12px 36px rgba(44, 38, 33, 0.12)',
                  minWidth: '230px',
                  zIndex: 1100,
                  animation: 'dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Speech Bubble Arrow Tip */}
                <div style={{
                  position: 'absolute',
                  top: '-7px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderTop: '1px solid var(--border-color)',
                  borderLeft: '1px solid var(--border-color)',
                  zIndex: 1101
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', position: 'relative', zIndex: 1102 }}>
                  {categories.map((cat, idx) => {
                    const isCatActive = location.pathname === cat.path;
                    return (
                      <Link
                        key={idx}
                        to={cat.path}
                        onClick={() => setExploreOpen(false)}
                        className="explore-dropdown-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.55rem 0.75rem',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          color: isCatActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                          backgroundColor: isCatActive ? 'var(--accent-light)' : 'transparent',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: cat.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                        }}>
                          {cat.icon}
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          fontWeight: '500',
                          whiteSpace: 'nowrap'
                        }}>
                          {cat.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <LeafSeparator />

          {/* 5. Share */}
          <Link
            to="/confessions"
            className="botanical-nav-item"
            style={{
              fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
              fontSize: 'clamp(1.35rem, 1.8vw, 1.65rem)',
              color: location.pathname === '/confessions' ? 'var(--accent-primary)' : 'var(--text-primary)',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              transition: 'color 0.2s ease, transform 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            Share
          </Link>

          <LeafSeparator />

          {/* 6. Connect */}
          <Link
            to="/contact"
            className="botanical-nav-item"
            style={{
              fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
              fontSize: 'clamp(1.35rem, 1.8vw, 1.65rem)',
              color: location.pathname === '/contact' ? 'var(--accent-primary)' : 'var(--text-primary)',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              transition: 'color 0.2s ease, transform 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            Connect
          </Link>
        </nav>

        {/* Right Side Controls: Search, Theme Toggle, and Mobile Hamburger */}
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
              border: 'none',
              backgroundColor: searchOpen ? 'var(--bg-tertiary)' : 'transparent',
              transition: 'background 0.2s ease',
              touchAction: 'manipulation'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => { if (!searchOpen) e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <Search size={18} />
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
              backgroundColor: mobileMenuOpen ? 'var(--bg-tertiary)' : 'transparent',
              transition: 'background 0.2s ease',
              touchAction: 'manipulation'
            }}
            className="mobile-menu-trigger"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => { if (!mobileMenuOpen) e.currentTarget.style.backgroundColor = 'transparent'; }}
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
                placeholder="Search reflections, wisdom, healing, and life lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.6rem 0.5rem',
                  fontSize: '16px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)'
                }}
              />
              <button type="submit" className="btn btn-dark-green" style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem', flexShrink: 0 }}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fade-in" style={{ padding: '1.25rem' }}>
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                  fontSize: '16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
            <button type="submit" className="btn btn-dark-green" style={{ padding: '0.75rem 1.15rem', fontSize: '0.875rem', flexShrink: 0 }}>
              Go
            </button>
          </form>

          {/* Navigation Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                fontSize: '1.6rem',
                padding: '0.6rem 1rem'
              }}
            >
              <span>Home</span>
              <span style={{ fontSize: '1rem', opacity: 0.5 }}>›</span>
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                fontSize: '1.6rem',
                padding: '0.6rem 1rem'
              }}
            >
              <span>About Aetheria</span>
              <span style={{ fontSize: '1rem', opacity: 0.5 }}>›</span>
            </Link>

            <Link
              to="/about#author"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                fontSize: '1.6rem',
                padding: '0.6rem 1rem'
              }}
            >
              <span>The Person Behind This</span>
              <span style={{ fontSize: '1rem', opacity: 0.5 }}>›</span>
            </Link>

            {/* Mobile Explore Accordion */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                  fontSize: '1.6rem',
                  color: 'var(--text-primary)'
                }}
              >
                <span>Explore</span>
                <ChevronDown size={18} style={{ transform: mobileExploreOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
              </button>

              {mobileExploreOpen && (
                <div style={{ padding: '0.5rem 0.75rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)' }}>
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      to={cat.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: cat.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {cat.icon}
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/confessions"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                fontSize: '1.6rem',
                padding: '0.6rem 1rem'
              }}
            >
              <span>Share</span>
              <span style={{ fontSize: '1rem', opacity: 0.5 }}>›</span>
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                fontSize: '1.6rem',
                padding: '0.6rem 1rem'
              }}
            >
              <span>Connect</span>
              <span style={{ fontSize: '1rem', opacity: 0.5 }}>›</span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -6px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .botanical-nav-item:hover {
          color: var(--accent-primary) !important;
          transform: translateY(-1px);
        }
        .explore-dropdown-item:hover {
          background-color: var(--accent-light) !important;
          transform: translateX(2px);
        }
        @media (min-width: 900px) {
          .botanical-navbar-links { display: flex !important; }
          .mobile-menu-trigger { display: none !important; }
        }
        @media (max-width: 899px) {
          .botanical-navbar-links { display: none !important; }
          .mobile-menu-trigger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

