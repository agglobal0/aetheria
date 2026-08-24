import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Users, Feather, Cpu } from 'lucide-react';

export default function CategoryCard({ category }) {
  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'ethics': return <Compass size={28} />;
      case 'human-behaviour': return <Users size={28} />;
      case 'life-reflection': return <Feather size={28} />;
      case 'technology': return <Cpu size={28} />;
      default: return <Compass size={28} />;
    }
  };

  const getCategoryClass = (slug) => {
    switch (slug) {
      case 'ethics': return 'category-ethics';
      case 'human-behaviour': return 'category-human-behaviour';
      case 'life-reflection': return 'category-life-reflection';
      case 'technology': return 'category-technology';
      default: return 'category-ethics';
    }
  };

  return (
    <Link
      to={`/category/${category.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        padding: '2rem',
        textDecoration: 'none',
        transition: 'all var(--transition-normal)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = category.accent_color || 'var(--text-primary)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
      className="animate-fade-in"
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: category.accent_color || 'var(--text-primary)'
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <span className={getCategoryClass(category.slug)} style={{ padding: '0.6rem', borderRadius: '50%', display: 'inline-flex' }}>
          {getCategoryIcon(category.slug)}
        </span>
        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>
          {category.essay_count || 5} Essays
        </span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
        {category.name}
      </h3>

      <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.75rem', flex: 1 }}>
        {category.description}
      </p>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: category.accent_color || 'var(--text-primary)'
      }}>
        Explore World <ArrowRight size={16} />
      </div>
    </Link>
  );
}
