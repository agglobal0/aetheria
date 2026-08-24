import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({ title = 'No essays found', description = 'We could not find any essays matching your criteria.', actionText = 'Browse All Essays', actionLink = '/essays' }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      margin: '2rem 0'
    }}>
      <div style={{
        display: 'inline-flex',
        padding: '1rem',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--text-muted)',
        marginBottom: '1.25rem'
      }}>
        <BookOpen size={36} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
        {description}
      </p>
      {actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionText}
        </Link>
      )}
    </div>
  );
}
