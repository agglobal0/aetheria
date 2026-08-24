import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { TwitterIcon, LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2.5rem 0',
      marginTop: '5rem',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                PROF. MONIKA CHOPRA
              </span>
            </Link>
            <p style={{ fontSize: '0.925rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Official academic and editorial platform of Professor Monika Chopra. Exploring ethics, human behaviour, life reflections, and technology.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-primary)' }}>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <Link to="/category/ethics" className="category-ethics" style={{ fontWeight: '500' }}>Ethics</Link>
              </li>
              <li>
                <Link to="/category/human-behaviour" className="category-human-behaviour" style={{ fontWeight: '500' }}>Human Behaviour</Link>
              </li>
              <li>
                <Link to="/category/life-reflection" className="category-life-reflection" style={{ fontWeight: '500' }}>Life Reflection</Link>
              </li>
              <li>
                <Link to="/category/technology" className="category-technology" style={{ fontWeight: '500' }}>Technology</Link>
              </li>
            </ul>
          </div>

          {/* Publication Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Publication
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link to="/essays">All Essays</Link></li>
              <li><Link to="/about">About Prof. Chopra</Link></li>
              <li><Link to="/contact">Editorial Contact</Link></li>
            </ul>
          </div>

          {/* Ethos Statement */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Editorial Ethos
            </h4>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              Blog posts and reflections designed for deep reading, slow contemplation, and academic insight.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.825rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} Professor Monika Chopra. All rights reserved. Built for thoughtful readers.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about">Privacy Policy</Link>
            <Link to="/about">Terms of Service</Link>
            <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: 'var(--text-primary)' }}>
              Back to Top <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
