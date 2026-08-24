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
    <div className="container" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      <div style={{ maxWidth: '680px', margin: '0 auto 3.5rem auto', textAlign: 'center' }}>
        <h1 className="serif-heading" style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>
          Search Aetheria
        </h1>

        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <SearchIcon size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search essays by title, topic, author, or keyword..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.8rem',
                fontSize: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
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
    </div>
  );
}
