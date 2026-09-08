import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, palette, changePalette, PALETTES } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
      {/* Light/Dark Toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme mode"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          transition: 'all var(--transition-fast)',
          cursor: 'pointer'
        }}
        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      {/* Palette Picker Trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Color Palette Settings"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
        title="Choose Motivational Palette"
      >
        <Palette size={18} style={{ color: 'var(--accent-primary)' }} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div style={{
          position: 'absolute',
          top: '125%',
          right: 0,
          width: '230px',
          maxWidth: 'calc(100vw - 2rem)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          padding: '0.75rem',
          zIndex: 100000,
          animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: '700',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
            padding: '0 0.25rem'
          }}>
            Theme Palettes
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {PALETTES.map((p) => {
              const isActive = palette === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    changePalette(p.id);
                    setOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? '600' : '500',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: p.color,
                      border: '1px solid rgba(0,0,0,0.15)',
                      display: 'inline-block'
                    }} />
                    {p.name}
                  </div>
                  {isActive && <Check size={14} style={{ color: 'var(--accent-primary)' }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
