import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function FeaturedEssay({ essay }) {
  if (!essay) return null;

  const getCategoryClass = (slug) => {
    switch (slug) {
      case 'reflections':
      case 'life-reflection': return 'category-reflections';
      case 'emotional-intelligence':
      case 'human-behaviour': return 'category-human-behaviour';
      case 'healing': return 'category-healing';
      case 'wisdom':
      case 'ethics': return 'category-ethics';
      case 'spirituality': return 'category-spirituality';
      case 'technology': return 'category-technology';
      default: return 'category-reflections';
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 3.5vw, 2.5rem)',
      marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
      position: 'relative'
    }} className="featured-essay-block animate-fade-in">
      <div style={{ maxWidth: '850px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Featured Essay
            </span>
            <Link to={`/category/${essay.category_slug}`} className={`category-badge ${getCategoryClass(essay.category_slug)}`}>
              {essay.category_name}
            </Link>
          </div>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 3.8vw, 2.5rem)',
          fontWeight: '700',
          lineHeight: '1.2',
          marginBottom: '1.25rem',
          color: 'var(--text-primary)',
          overflowWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          <Link to={`/essay/${essay.slug}`} style={{ color: 'var(--text-primary)' }}>
            {essay.title}
          </Link>
        </h2>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.75rem', overflowWrap: 'break-word' }}>
          {essay.excerpt}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
              Prof. Monika Chopra
            </span>
            <span>•</span>
            <span>{formatDate(essay.published_at)}</span>
          </div>

          <Link to={`/essay/${essay.slug}`} className="btn btn-primary" style={{ gap: '0.5rem', padding: '0.75rem 1.35rem' }}>
            Read Full Essay <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
