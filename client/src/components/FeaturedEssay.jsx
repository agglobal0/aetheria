import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function FeaturedEssay({ essay }) {
  if (!essay) return null;

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
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      padding: '3rem 2.5rem',
      marginBottom: '4rem',
      position: 'relative'
    }} className="featured-essay-block animate-fade-in">
      <div style={{ maxWidth: '850px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Featured Essay
            </span>
            <Link to={`/category/${essay.category_slug}`} className={`category-badge ${getCategoryClass(essay.category_slug)}`}>
              {essay.category_name}
            </Link>
          </div>
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '700', lineHeight: '1.2', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          <Link to={`/essay/${essay.slug}`} style={{ color: 'var(--text-primary)' }}>
            {essay.title}
          </Link>
        </h2>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
          {essay.excerpt}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
              Prof. Monika Chopra
            </span>
            <span>•</span>
            <span>{formatDate(essay.published_at)}</span>
          </div>

          <Link to={`/essay/${essay.slug}`} className="btn btn-primary" style={{ gap: '0.6rem' }}>
            Read Full Essay <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
