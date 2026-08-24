import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
      <ol style={{
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.825rem',
        color: 'var(--text-muted)',
        flexWrap: 'wrap'
      }}>
        <li>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: 'var(--text-muted)' }}>
            <Home size={14} /> Home
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <ChevronRight size={12} />
            </li>
            <li>
              {item.link ? (
                <Link to={item.link} style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
