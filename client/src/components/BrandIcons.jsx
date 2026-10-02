import React from 'react';

export function BrandLogo({ height = 40, variant = "auto", className = "" }) {
  return (
    <img
      src="/logo.png"
      alt="ORAANIS — Where Experience Becomes Wisdom"
      className={`brand-logo-img ${variant === 'light' ? 'brand-logo-light' : ''} ${className}`.trim()}
      style={{
        height: `${height}px`,
        width: 'auto',
        maxHeight: `${height}px`,
        maxWidth: '240px',
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
}

export function OraanisEmblem({ size = 38, color = "#C2A366", style = {} }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ flexShrink: 0, ...style }}
    >
      <g stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Top Dot */}
        <circle cx="50" cy="11.5" r="2.2" fill={color} stroke="none" />
        
        {/* Center Petal */}
        <path d="M50 16.5 C41.5 29 40 48 50 76 C60 48 58.5 29 50 16.5 Z" />
        
        {/* Inner Left Petal */}
        <path d="M43.5 39 C34 31 23.5 34 25.5 53 C27.5 65 37 74.5 50 80.5" />
        
        {/* Inner Right Petal */}
        <path d="M56.5 39 C66 31 76.5 34 74.5 53 C72.5 65 63 74.5 50 80.5" />
        
        {/* Outer Left Petal */}
        <path d="M30 58 C18 53 7 57 9 66 C11.5 75 28 80.5 47 82" />
        
        {/* Outer Right Petal */}
        <path d="M70 58 C82 53 93 57 91 66 C88.5 75 72 80.5 53 82" />
        
        {/* Bottom Lotus Base Anchor */}
        <path d="M46 81.5 L50 86 L54 81.5" />
      </g>
    </svg>
  );
}

export function LotusLogo({ size = 38, color = "#C2A366", style = {} }) {
  return <OraanisEmblem size={size} color={color} style={style} />;
}

export function LeafIcon({ size = 18, color = "#5A7A5E", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export function LeafBullet({ size = 15, color = "#6C8A6F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} style={{ flexShrink: 0, marginTop: '3px' }}>
      <path d="M17.4 3.6c-4.8-.8-10.2 2-12.7 6.4C3.2 12.6 3.6 15 4.5 16.5c.3.5.9.6 1.4.3.4-.3.5-.9.3-1.4-.6-1.1-.9-3 0-5.1 2-4.1 6.8-6.4 10.6-5.8.6.1 1.1-.3 1.2-.9.1-.6-.3-1.1-.9-1.2l.3 1.2z" />
      <path d="M5.4 16.1c-.8.8-1.9 1.4-3.1 1.7-.5.1-.9.6-.8 1.1.1.5.6.9 1.1.8 1.8-.4 3.4-1.3 4.5-2.5.4-.4.3-1.1-.1-1.5-.4-.4-1.2-.4-1.6.4z" />
    </svg>
  );
}
