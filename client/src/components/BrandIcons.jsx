export function OraanisEmblem({ size = 38, color = "#B38245" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      {/* 8-pointed geometric flower / starburst */}
      <g stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Vertical petal pair */}
        <path d="M50 6 C43 25 43 75 50 94 C57 75 57 25 50 6 Z" fill={color} fillOpacity="0.06" />
        {/* Horizontal petal pair */}
        <path d="M6 50 C25 43 75 43 94 50 C75 57 25 57 6 50 Z" fill={color} fillOpacity="0.06" />
        {/* Diagonal 45-deg petal pair */}
        <path d="M18.9 18.9 C34.5 23.5 69.5 58.5 81.1 81.1 C65.5 76.5 30.5 41.5 18.9 18.9 Z" fill={color} fillOpacity="0.06" />
        {/* Diagonal 135-deg petal pair */}
        <path d="M81.1 18.9 C76.5 34.5 41.5 69.5 18.9 81.1 C23.5 65.5 58.5 30.5 81.1 18.9 Z" fill={color} fillOpacity="0.06" />
        {/* Central rings */}
        <circle cx="50" cy="50" r="11" stroke={color} strokeWidth="1.8" fill="none" opacity="0.65" />
        <circle cx="50" cy="50" r="3.5" fill={color} stroke="none" />
      </g>
    </svg>
  );
}

export function LotusLogo({ size = 34, color = "#B38245" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      {/* Central petal */}
      <path
        d="M24 6C24 6 18.5 17 18.5 27C18.5 33 21 37.5 24 39.5C27 37.5 29.5 33 29.5 27C29.5 17 24 6 24 6Z"
        fill={color}
        fillOpacity="0.18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left major petal */}
      <path
        d="M17.5 19C12 21 6 26.5 7.5 34C9 38 15 39 20 39"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right major petal */}
      <path
        d="M30.5 19C36 21 42 26.5 40.5 34C39 38 33 39 28 39"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lower base curve */}
      <path
        d="M14 41.5C19 43 29 43 34 41.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
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
