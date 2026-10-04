import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass, Users, Feather, Cpu, ArrowRight, BookOpen, Brain, HeartPulse, Lightbulb, Flower2 } from 'lucide-react';
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

  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'essay' | 'blog'

  const getCategoryIcon = (catSlug) => {
    switch (catSlug) {
      case 'reflections':
      case 'life-reflection': return <BookOpen size={40} />;
      case 'emotional-intelligence': return <Brain size={40} />;
      case 'healing': return <HeartPulse size={40} />;
      case 'wisdom':
      case 'human-behaviour':
      case 'ethics': return <Lightbulb size={40} />;
      case 'spirituality': return <Flower2 size={40} />;
      case 'technology': return <Cpu size={40} />;
      default: return <Compass size={40} />;
    }
  };

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const queryPayload = {
          category: slug,
          page,
          limit: 9,
          status: 'published'
        };
        if (typeFilter !== 'all') {
          queryPayload.type = typeFilter;
        }

        const [catRes, essaysRes, popRes] = await Promise.all([
          categoryService.getBySlug(slug),
          essayService.getAll(queryPayload),
          essayService.getAll({ category: slug, sort: 'views', limit: 4, status: 'published' })
        ]);

        const fallbackMeta = {
          'reflections': { name: 'Reflections', description: 'Thoughtful examinations of time, personal growth, quiet wisdom, and life reflections.', accent_color: '#A67C46' },
          'emotional-intelligence': { name: 'Emotional Intelligence', description: 'Exploring psychology, human nature, empathy, social dynamics, and self-awareness.', accent_color: '#2B59C3' },
          'healing': { name: 'Healing', description: 'Nurturing resilience, emotional recovery, self-forgiveness, and inner peace.', accent_color: '#D97706' },
          'wisdom': { name: 'Wisdom', description: 'Timeless insights, moral integrity, ethics, and enduring human life lessons.', accent_color: '#8B263E' },
          'spirituality': { name: 'Spirituality', description: 'Meditations on purpose, transcendence, quiet consciousness, and inner depth.', accent_color: '#0284C7' },
          'technology': { name: 'Technology', description: 'Reflections on the evolving balance between humanity and the digital world.', accent_color: '#4B5563' }
        };

        if (catRes.data && catRes.data.success) {
          setCategory(catRes.data.data);
        } else if (fallbackMeta[slug]) {
          setCategory(fallbackMeta[slug]);
        }

        if (essaysRes.data && essaysRes.data.success) {
          const rawData = essaysRes.data.data || [];
          const filtered = slug
            ? rawData.filter(e => {
                const s = (e.category_slug || '').toLowerCase();
                const n = (e.category_name || '').toLowerCase();
                const target = slug.toLowerCase();
                return s === target || n === target || String(e.category_id) === target;
              })
            : rawData;
          setEssays(filtered);
          setTotalPages(essaysRes.data.pagination?.totalPages || 1);
        } else {
          setEssays([]);
          setTotalPages(1);
        }

        if (popRes.data && popRes.data.success) {
          const rawPop = popRes.data.data || [];
          const filteredPop = slug
            ? rawPop.filter(e => {
                const s = (e.category_slug || '').toLowerCase();
                const n = (e.category_name || '').toLowerCase();
                const target = slug.toLowerCase();
                return s === target || n === target || String(e.category_id) === target;
              })
            : rawPop;
          setPopular(filteredPop);
        } else {
          setPopular([]);
        }
      } catch (err) {
        console.error('Failed to load category data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCategoryData();
  }, [slug, page, typeFilter]);

  if (loading && !category) {
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
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            alignSelf: 'flex-start'
          }}>
            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'var(--font-serif)', color: '#8B263E', display: 'block', lineHeight: '1.1' }}>
                {category.essay_count || 0}
              </span>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', color: 'var(--text-muted)' }}>
                Essays
              </span>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'var(--font-serif)', color: '#2B59C3', display: 'block', lineHeight: '1.1' }}>
                {category.blog_count || 0}
              </span>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', color: 'var(--text-muted)' }}>
                Blogs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Type Filter Buttons */}
      <div style={{
        display: 'flex',
        gap: '0.6rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.75rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => { setTypeFilter('all'); setPage(1); }}
          className={`btn ${typeFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-full)' }}
        >
          All Publications ({(Number(category.essay_count) || 0) + (Number(category.blog_count) || 0)})
        </button>
        <button
          onClick={() => { setTypeFilter('essay'); setPage(1); }}
          className={`btn ${typeFilter === 'essay' ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-full)' }}
        >
          📜 Academic Essays ({category.essay_count || 0})
        </button>
        <button
          onClick={() => { setTypeFilter('blog'); setPage(1); }}
          className={`btn ${typeFilter === 'blog' ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-full)' }}
        >
          ✍️ Reflective Blogs ({category.blog_count || 0})
        </button>
      </div>

      {/* Featured Essay in Category */}
      {featured && typeFilter === 'all' && (
        <section style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '1.25rem' }}>
            Featured in {category.name}
          </h2>
          <FeaturedEssay essay={featured} />
        </section>
      )}

      {/* Main Stream */}
      <div>
        <h2 className="serif-heading" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.8rem)', marginBottom: '1.75rem' }}>
          {typeFilter === 'essay' ? `Academic Essays in ${category.name}` : typeFilter === 'blog' ? `Reflective Blogs in ${category.name}` : `All Content in ${category.name}`}
        </h2>

        {loading ? (
          <LoadingSkeleton type="grid" count={6} />
        ) : essays.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No articles found for the selected filter.</p>
          </div>
        ) : (
          <>
            <div className="grid-3">
              {(typeFilter === 'all' ? remainingEssays : essays).map(essay => (
                <EssayCard key={essay.id} essay={essay} />
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
          </>
        )}
      </div>
    </div>
  );
}
