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
    { name: 'Share', path: '/share' },
    { name: 'Connect', path: '/contact' },
    { name: 'Reflections', path: '/category/reflections' },
    { name: 'Wisdom', path: '/category/wisdom' },
    { name: 'Emotional Intelligence', path: '/category/emotional-intelligence' },
    { name: 'Healing', path: '/category/healing' },
    { name: 'Stories', path: '/essays' }
  ];

  return (
    <footer style={{
      backgroundColor: '#0B132B',
      color: '#F8FAFC',
      padding: '3rem 0 2.25rem 0',
      borderTop: '1px solid #1C2541',
      fontSize: '0.85rem'
    }}>
      <div className="container">
        
        {/* Top Row: Brand Logo on Left, Tagline & Social Icons on Right */}
        <div className="footer-top-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '1.75rem'
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

          {/* Right Social Icons & Tagline */}
          <div className="footer-social-col" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {/* Tagline */}
            <span style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: '#A9BCD0',
              letterSpacing: '0.02em'
            }}>
              Good thoughts. Better tomorrows.
            </span>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', color: '#A9BCD0' }}>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/oraanis2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: 'inherit', padding: '0.35rem', display: 'inline-flex', transition: 'transform 0.2s ease, color 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#A9BCD0'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/Oraanis/61594778447105/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: 'inherit', padding: '0.35rem', display: 'inline-flex', transition: 'transform 0.2s ease, color 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#A9BCD0'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Center Nav Links Row */}
        <nav className="footer-nav-links" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem 1.75rem',
          justifyContent: 'center',
          padding: '1.5rem 0',
          borderTop: '1px solid rgba(169, 188, 208, 0.12)',
          borderBottom: '1px solid rgba(169, 188, 208, 0.12)'
        }}>
          {footerLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              style={{
                color: '#A9BCD0',
                fontSize: '0.85rem',
                fontWeight: '400',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
                padding: '0.2rem 0'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#A9BCD0'}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Subfooter Copyright */}
        <div className="footer-subfooter" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '1.5rem',
          fontSize: '0.75rem',
          color: '#6E87A4'
        }}>
          <div>
            © {currentYear} Monika Chopra. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ color: '#6E87A4', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#A9BCD0'} onMouseLeave={e => e.currentTarget.style.color = '#6E87A4'}>Privacy</Link>
            <Link to="/about" style={{ color: '#6E87A4', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#A9BCD0'} onMouseLeave={e => e.currentTarget.style.color = '#6E87A4'}>Terms</Link>
            <Link to="/contact" style={{ color: '#6E87A4', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#A9BCD0'} onMouseLeave={e => e.currentTarget.style.color = '#6E87A4'}>Editorial Inquiries</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .footer-top-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 1.25rem !important;
          }
          .footer-social-col {
            flex-direction: column !important;
            align-items: center !important;
            gap: 0.75rem !important;
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
