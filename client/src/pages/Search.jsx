import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { essayService } from '../services/api';
import EssayCard from '../components/EssayCard';
import Breadcrumbs from '../components/Breadcrumbs';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    async function performSearch() {
      if (!query.trim()) {
        setEssays([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await essayService.getAll({ q: query, limit: 20, status: 'published' });
        if (res.data.success) {
          setEssays(res.data.data);
        }
      } catch (err) {
        console.error('Search query error:', err);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="container" style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(0.875rem, 3vw, 1.5rem) 5rem clamp(0.875rem, 3vw, 1.5rem)' }}>
      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      <div style={{ maxWidth: '680px', margin: '0 auto clamp(2rem, 4vw, 3.5rem) auto', textAlign: 'center' }}>
        <h1 className="serif-heading" style={{ fontSize: 'clamp(1.85rem, 4.5vw, 2.5rem)', marginBottom: '1rem' }}>
          Search ORAANIS
        </h1>

        <form onSubmit={handleSearchSubmit} className="search-page-form" style={{ display: 'flex', gap: '0.6rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <SearchIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search essays by title, topic, author, or keyword..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem 0.8rem 2.6rem',
                fontSize: '16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', flexShrink: 0 }}>
            Search
          </button>
        </form>

        {query && !loading && (
          <p style={{ marginTop: '1rem', fontSize: '0.925rem', color: 'var(--text-muted)' }}>
            Found <strong>{essays.length}</strong> {essays.length === 1 ? 'essay' : 'essays'} for "{query}"
          </p>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton type="grid" count={6} />
      ) : !query ? (
        <EmptyState
          title="Search the Publication"
          description="Type any keyword above to search through our archive of essays."
          actionText="Browse All Essays"
          actionLink="/essays"
        />
      ) : essays.length === 0 ? (
        <EmptyState
          title={`No results for "${query}"`}
          description="We couldn't find any essays matching your search terms. Try searching for broader keywords like 'AI', 'silence', or 'morality'."
          actionText="Explore All Essays"
          actionLink="/essays"
        />
      ) : (
        <div className="grid-3">
          {essays.map(essay => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .search-page-form {
            flex-direction: column !important;
          }
          .search-page-form button {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
