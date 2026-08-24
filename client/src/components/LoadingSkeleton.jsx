import React from 'react';

export default function LoadingSkeleton({ type = 'grid', count = 6 }) {
  if (type === 'single') {
    return (
      <div className="reading-container" style={{ paddingTop: '3rem' }}>
        <div className="skeleton" style={{ height: '24px', width: '30%', marginBottom: '1rem' }} />
        <div className="skeleton" style={{ height: '48px', width: '90%', marginBottom: '1.5rem' }} />
        <div className="skeleton" style={{ height: '18px', width: '100%', marginBottom: '0.75rem' }} />
        <div className="skeleton" style={{ height: '18px', width: '95%', marginBottom: '0.75rem' }} />
        <div className="skeleton" style={{ height: '18px', width: '88%', marginBottom: '0.75rem' }} />
      </div>
    );
  }

  return (
    <div className="grid-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div className="skeleton" style={{ height: '20px', width: '40%' }} />
          <div className="skeleton" style={{ height: '28px', width: '90%' }} />
          <div className="skeleton" style={{ height: '16px', width: '100%' }} />
          <div className="skeleton" style={{ height: '16px', width: '70%' }} />
        </div>
      ))}
    </div>
  );
}
