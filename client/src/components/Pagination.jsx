import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '3.5rem' }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="btn btn-outline"
        style={{ padding: '0.5rem 0.85rem', opacity: page <= 1 ? 0.4 : 1 }}
      >
        <ChevronLeft size={16} /> Previous
      </button>

      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '0 0.75rem' }}>
        Page <strong>{page}</strong> of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="btn btn-outline"
        style={{ padding: '0.5rem 0.85rem', opacity: page >= totalPages ? 0.4 : 1 }}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
