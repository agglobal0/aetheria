import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const PALETTES = [
  { id: 'oraanis', name: 'Premium ORAANIS', color: '#1C2541' },
  { id: 'amber', name: 'Warm Amber Wisdom', color: '#B86B27' },
  { id: 'emerald', name: 'Emerald Growth', color: '#1B6B48' },
  { id: 'midnight', name: 'Deep Midnight', color: '#0B132B' },
  { id: 'terracotta', name: 'Terracotta Reflection', color: '#C05638' }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aetheria_theme') || 'light';
  });

  const [palette, setPalette] = useState(() => {
    return localStorage.getItem('aetheria_palette') || 'oraanis';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-palette', palette);
    localStorage.setItem('aetheria_theme', theme);
    localStorage.setItem('aetheria_palette', palette);
  }, [theme, palette]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const changePalette = (newPalette) => {
    if (PALETTES.some(p => p.id === newPalette)) {
      setPalette(newPalette);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, palette, changePalette, PALETTES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

