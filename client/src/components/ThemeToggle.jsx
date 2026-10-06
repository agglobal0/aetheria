import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
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
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-teal)';
        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
      }}
    >
      {theme === 'light' ? <Moon size={17} style={{ color: 'var(--accent-teal)' }} /> : <Sun size={17} style={{ color: 'var(--accent-inner)' }} />}
    </button>
  );
}

