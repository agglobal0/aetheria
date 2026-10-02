import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'The Person Behind This', path: '/person-behind-this' },
    { name: 'RAJSAAR', path: '/rajsaar' },
    { name: 'Share Perspective', path: '/share' },
    { name: 'Reflections', path: '/category/reflections' },
    { name: 'Wisdom', path: '/category/wisdom' },
    { name: 'Emotional Intelligence', path: '/category/emotional-intelligence' },
    { name: 'Healing', path: '/category/healing' },
    { name: 'Stories', path: '/essays' }
  ];

  return (
    <footer style={{
      backgroundColor: '#16281E',
      color: '#E3EBE4',
      padding: '3rem 0 2.5rem 0',
      borderTop: '1px solid #233B2D',
      fontSize: '0.85rem'
    }}>
      <div className="container">
        <div className="footer-main-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.75rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>

          {/* Brand with Oraanis Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#FFFFFF'
          }}>
            <BrandLogo height={42} variant="light" />
          </Link>

          {/* Center Nav Links */}
          <nav className="footer-nav-links" style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.25rem',
            justifyContent: 'center'
          }}>
            {footerLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                style={{
                  color: '#CAD8CD',
                  fontSize: '0.825rem',
                  fontWeight: '400',
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                  padding: '0.25rem 0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#CAD8CD'}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Social Icons & Tagline */}
          <div className="footer-social-col" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.6rem'
          }}>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', color: '#D4A76A' }}>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'inherit', padding: '0.35rem', display: 'inline-flex' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{ color: 'inherit', padding: '0.35rem', display: 'inline-flex' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'inherit', padding: '0.35rem', display: 'inline-flex' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'inherit', padding: '0.35rem', display: 'inline-flex' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: 'inherit', padding: '0.35rem', display: 'inline-flex' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Tagline */}
            <span style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: '0.88rem',
              color: '#9CB2A2'
            }}>
              Good thoughts. Better tomorrows.
            </span>
          </div>

        </div>

        {/* Subfooter Copyright */}
        <div className="footer-subfooter" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '1.5rem',
          fontSize: '0.75rem',
          color: '#7F9685'
        }}>
          <div>
            © {currentYear} Monika Chopra. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ color: '#7F9685' }}>Privacy</Link>
            <Link to="/about" style={{ color: '#7F9685' }}>Terms</Link>
            <Link to="/contact" style={{ color: '#7F9685' }}>Editorial Inquiries</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .footer-main-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 1.5rem !important;
          }
          .footer-social-col {
            align-items: center !important;
          }
          .footer-nav-links {
            gap: 0.85rem 1.25rem !important;
          }
          .footer-subfooter {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
