import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function EssayCard({ essay, layout = 'grid' }) {
  const getCategoryClass = (slug) => {
    switch (slug) {
      case 'ethics': return 'category-ethics';
      case 'human-behaviour': return 'category-human-behaviour';
      case 'life-reflection': return 'category-life-reflection';
      case 'technology': return 'category-technology';
      default: return 'category-ethics';
    }
  };

  const isBlog = essay.type === 'blog';

  if (layout === 'list') {
    return (
      <article style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1.5rem',
        padding: '1.5rem 0',
        borderBottom: '1px solid var(--border-color)',
        alignItems: 'flex-start'
      }} className="animate-fade-in">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <Link to={`/category/${essay.category_slug}`} className={`category-badge ${getCategoryClass(essay.category_slug)}`}>
              {essay.category_name}
            </Link>
            <span style={{
              fontSize: '0.725rem',
              fontWeight: '700',
              padding: '0.15rem 0.55rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isBlog ? 'rgba(43, 89, 195, 0.1)' : 'rgba(139, 38, 62, 0.1)',
              color: isBlog ? '#2B59C3' : '#8B263E',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}>
              {isBlog ? 'Reflective Blog' : 'Academic Essay'}
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.4rem', lineHeight: '1.3' }}>
            <Link to={`/essay/${essay.slug}`} style={{ color: 'var(--text-primary)' }}>
              {essay.title}
            </Link>
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {essay.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>By Prof. Monika Chopra</span>
            <span>•</span>
            <span>{formatDate(essay.published_at)}</span>
            {essay.reading_time && (
              <>
                <span>•</span>
                <span>{essay.reading_time} min read</span>
              </>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      transition: 'all var(--transition-normal)'
    }} 
    onMouseOver={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
    onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
    className="animate-fade-in"
    >
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
          <Link to={`/category/${essay.category_slug}`} className={`category-badge ${getCategoryClass(essay.category_slug)}`}>
            {essay.category_name}
          </Link>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isBlog ? 'rgba(43, 89, 195, 0.1)' : 'rgba(139, 38, 62, 0.1)',
            color: isBlog ? '#2B59C3' : '#8B263E',
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}>
            {isBlog ? 'Reflective Blog' : 'Academic Essay'}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: '600', marginBottom: '0.6rem', lineHeight: '1.3' }}>
          <Link to={`/essay/${essay.slug}`} style={{ color: 'var(--text-primary)' }}>
            {essay.title}
          </Link>
        </h3>

        <p style={{
          fontSize: '0.925rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1.5rem',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {essay.excerpt}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
              Prof. Monika Chopra
            </span>
          </div>
          <div>
            <span>{formatDate(essay.published_at)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
