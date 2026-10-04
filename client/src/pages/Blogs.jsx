import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, LayoutGrid, List, SlidersHorizontal, BookOpen, Sparkles } from 'lucide-react';
import { essayService, categoryService } from '../services/api';
import EssayCard from '../components/EssayCard';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('newest');
  const [layout, setLayout] = useState('grid');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryService.getAll();
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    if (cat !== selectedCategory) {
      setSelectedCategory(cat);
      setPage(1);
    }
    const q = searchParams.get('search') || '';
    if (q !== searchQuery) {
      setSearchQuery(q);
      setPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const res = await essayService.getAll({
          type: 'blog',
          category: selectedCategory,
          q: searchQuery,
          sort: sortBy,
          page,
          limit: 9,
          status: 'published'
        });

        if (res.data.success) {
          const rawData = res.data.data || [];
          const filtered = selectedCategory
            ? rawData.filter(e => {
                const s = (e.category_slug || '').toLowerCase();
                const n = (e.category_name || '').toLowerCase();
                const target = selectedCategory.toLowerCase();
                return s === target || n === target || String(e.category_id) === target;
              })
            : rawData;
          setBlogs(filtered);
          setTotalPages(res.data.pagination?.totalPages || 1);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [selectedCategory, searchQuery, sortBy, page]);

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (slug) newParams.set('category', slug);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) newParams.set('search', searchQuery);
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  return (
    <div className="container" style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(0.875rem, 3vw, 1.5rem) 5rem clamp(0.875rem, 3vw, 1.5rem)' }}>

      {/* Header Banner */}
      <div style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(43, 89, 195, 0.1)',
          color: '#2B59C3',
          fontSize: '0.825rem',
          fontWeight: '700',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '0.85rem'
        }}>
          <BookOpen size={15} /> Reflective Musings & Life Lessons
        </div>
        <h1 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '0.75rem' }}>
          Reflective Blog Posts
        </h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', lineHeight: '1.6' }}>
          Conversational reflections, daily observations, and practical wisdom by Monika Chopra on human relationships, empathy, and navigating life’s subtle moments.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>

        {/* Search & Sort Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>

          <form onSubmit={handleSearchSubmit} style={{ flex: '1', minWidth: '220px', display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search blog reflections by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                  fontSize: '16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
            <button type="submit" className="btn btn-outline" style={{ padding: '0.65rem 1rem', flexShrink: 0 }}>
              Search
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <SlidersHorizontal size={16} />
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="newest">Sort by: Newest First</option>
                <option value="oldest">Sort by: Oldest First</option>
                <option value="views">Sort by: Most Viewed</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <button
                onClick={() => setLayout('grid')}
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: layout === 'grid' ? 'var(--bg-tertiary)' : 'transparent',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setLayout('list')}
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: layout === 'list' ? 'var(--bg-tertiary)' : 'transparent',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
                title="List View"
                aria-label="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => handleCategorySelect('')}
            className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.825rem', borderRadius: 'var(--radius-full)', minHeight: '34px' }}
          >
            All Blogs
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`btn ${selectedCategory === cat.slug ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.825rem', borderRadius: 'var(--radius-full)', minHeight: '34px' }}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Blogs Stream */}
      {loading ? (
        <LoadingSkeleton type="grid" count={6} />
      ) : blogs.length === 0 ? (
        <EmptyState
          title="No blog posts found"
          description="Try adjusting your search terms or category filter."
          actionText="Browse All Blogs"
          actionLink="/blogs"
        />
      ) : (
        <>
          <div className={layout === 'grid' ? 'grid-3' : ''}>
            {blogs.map(blog => (
              <EssayCard key={blog.id} essay={blog} layout={layout} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
        </>
      )}

    </div>
  );
}
