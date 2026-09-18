import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass, Users, Feather, Cpu, ArrowRight } from 'lucide-react';
import { categoryService, essayService } from '../services/api';
import EssayCard from '../components/EssayCard';
import FeaturedEssay from '../components/FeaturedEssay';
import Breadcrumbs from '../components/Breadcrumbs';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Pagination from '../components/Pagination';

export default function Category() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [essays, setEssays] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getCategoryIcon = (catSlug) => {
    switch (catSlug) {
      case 'ethics': return <Compass size={40} />;
      case 'human-behaviour': return <Users size={40} />;
      case 'life-reflection': return <Feather size={40} />;
      case 'technology': return <Cpu size={40} />;
      default: return <Compass size={40} />;
    }
  };

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const [catRes, essaysRes, popRes] = await Promise.all([
          categoryService.getBySlug(slug),
          essayService.getAll({ category: slug, page, limit: 9, status: 'published' }),
          essayService.getAll({ category: slug, sort: 'views', limit: 4, status: 'published' })
        ]);

        if (catRes.data.success) {
          setCategory(catRes.data.data);
        }

        if (essaysRes.data.success) {
          setEssays(essaysRes.data.data);
          setTotalPages(essaysRes.data.pagination.totalPages);
        }

        if (popRes.data.success) {
          setPopular(popRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load category data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCategoryData();
  }, [slug, page]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <LoadingSkeleton type="grid" count={6} />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Category Not Found</h2>
        <Link to="/essays" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Essays</Link>
      </div>
    );
  }

  const featured = essays.find(e => e.featured === 1) || essays[0];
  const remainingEssays = essays.filter(e => e.id !== featured?.id);

  return (
    <div className="container" style={{ padding: 'clamp(2rem, 4vw, 2.5rem) clamp(0.875rem, 3vw, 1.5rem) 5rem clamp(0.875rem, 3vw, 1.5rem)' }}>
      <Breadcrumbs items={[{ label: 'Categories', link: '/essays' }, { label: category.name }]} />

      {/* Category Landing Banner */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: 'clamp(1.75rem, 4vw, 3.5rem) clamp(1.25rem, 3vw, 2.5rem)',
        marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden'
      }} className="animate-fade-in">
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          backgroundColor: category.accent_color || 'var(--text-primary)'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: 'min(100%, 280px)' }}>
            <div style={{
              display: 'inline-flex',
              padding: '0.75rem',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              color: category.accent_color || 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              {getCategoryIcon(category.slug)}
            </div>

            <h1 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
              {category.name}
            </h1>

            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: '1.7', color: 'var(--text-secondary)', maxWidth: '680px' }}>
              {category.description}
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-tertiary)',
            padding: '1rem 1.75rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            alignSelf: 'flex-start'
          }}>
            <span style={{ fontSize: '2.2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', color: category.accent_color || 'var(--text-primary)', display: 'block', lineHeight: '1.1' }}>
              {category.essay_count || essays.length}
            </span>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--text-muted)' }}>
              Published Essays
            </span>
          </div>
        </div>
      </div>

      {/* Featured Essay in Category */}
      {featured && (
        <section style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '1.25rem' }}>
            Featured in {category.name}
          </h2>
          <FeaturedEssay essay={featured} />
        </section>
      )}

      {/* Main Essays Stream */}
      <div>
        <h2 className="serif-heading" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.8rem)', marginBottom: '1.75rem' }}>
          All Essays in {category.name}
        </h2>

        <div className="grid-3">
          {remainingEssays.map(essay => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
      </div>
    </div>
  );
}
