import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { essayService } from '../services/api';
import { formatDate, formatEssayContent } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import ReadingProgress from '../components/ReadingProgress';
import SocialShare from '../components/SocialShare';
import CommentSection from '../components/CommentSection';
import NewsletterForm from '../components/NewsletterForm';
import EssayCard from '../components/EssayCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function SingleEssay() {
  const { slug } = useParams();
  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEssay() {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const res = await essayService.getBySlug(slug);
        if (res.data.success) {
          setEssay(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch essay:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEssay();
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <LoadingSkeleton type="single" />
      </div>
    );
  }

  if (!essay) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2>Essay Not Found</h2>
        <p style={{ margin: '1rem 0 2rem 0', color: 'var(--text-secondary)' }}>
          The essay you are looking for may have been moved or removed.
        </p>
        <Link to="/essays" className="btn btn-primary">Return to Essays</Link>
      </div>
    );
  }
  const getCategoryClass = (catSlug) => {
    switch (catSlug) {
      case 'reflections':
      case 'life-reflection': return 'category-reflections';
      case 'emotional-intelligence': return 'category-emotional-intelligence';
      case 'healing': return 'category-healing';
      case 'wisdom':
      case 'human-behaviour': return 'category-wisdom';
      case 'spirituality':
      case 'ethics': return 'category-spirituality';
      case 'technology': return 'category-technology';
      default: return 'category-reflections';
    }
  };

  return (
    <div>
      <ReadingProgress />

      <article style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) 0 clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="reading-container">
          
          <Breadcrumbs items={[{ label: essay.category_name, link: `/category/${essay.category_slug}` }, { label: essay.title }]} />

          {/* Article Header */}
          <header style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <Link to={`/category/${essay.category_slug}`} className={`category-badge ${getCategoryClass(essay.category_slug)}`}>
                {essay.category_name}
              </Link>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: essay.type === 'blog' ? 'rgba(58, 80, 107, 0.12)' : 'rgba(28, 37, 65, 0.08)',
                color: essay.type === 'blog' ? 'var(--accent-teal)' : 'var(--text-primary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                {essay.type === 'blog' ? 'Reflective Blog Post' : 'Academic Essay'}
              </span>
            </div>

            <h1 className="serif-heading" style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 3.2rem)',
              fontWeight: '700',
              lineHeight: '1.18',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              {essay.title}
            </h1>

            {essay.subtitle && (
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                marginBottom: '1.75rem',
                fontStyle: 'italic'
              }}>
                {essay.subtitle}
              </p>
            )}

            {/* Author Byline & Metadata */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.25rem',
              paddingBottom: '1.25rem',
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {(() => {
                const isRajsaar = essay.author_slug === 'rajsaar' || 
                  (essay.author_name && essay.author_name.toLowerCase().includes('rajsaar')) || 
                  essay.author_id === 2;
                const authorName = isRajsaar ? 'RAJSAAR' : (essay.author_name || 'Monika Chopra');
                const authorLink = isRajsaar ? '/rajsaar' : '/person-behind-this';
                const authorRole = isRajsaar ? 'Mentor & Contributor' : 'Writer & Educator';

                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Written by</span>
                        <Link 
                          to={authorLink}
                          style={{ 
                            fontWeight: '600', 
                            color: 'var(--text-primary)', 
                            fontSize: '0.95rem',
                            textDecoration: 'none',
                            borderBottom: '1px dotted var(--text-muted)'
                          }}
                        >
                          {authorName}
                        </Link>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {authorRole} • Published {formatDate(essay.published_at)}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </header>

          {/* Social Share */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <SocialShare title={essay.title} />
          </div>

          {/* Featured Hero Cover Image */}
          {essay.featured_image && (
            <div style={{
              marginBottom: '2.5rem',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
            }}>
              <img
                src={essay.featured_image}
                alt={essay.title}
                style={{ width: '100%', maxHeight: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          {/* Formatted Longform Article Body */}
          <div
            className="editorial-body"
            dangerouslySetInnerHTML={{ __html: formatEssayContent(essay.content, essay.title) }}
          />

          {/* Bottom Social Share */}
          <div style={{
            padding: '1.25rem 0',
            marginTop: '3rem',
            borderTop: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              Enjoyed this piece? Share it:
            </span>
            <SocialShare title={essay.title} />
          </div>

          {/* About The Author Section */}
          {(() => {
            const isRajsaar = essay.author_slug === 'rajsaar' || 
              (essay.author_name && essay.author_name.toLowerCase().includes('rajsaar')) || 
              essay.author_id === 2;
            const authorName = isRajsaar ? 'RAJSAAR' : (essay.author_name || 'Monika Chopra');
            const authorLink = isRajsaar ? '/rajsaar' : '/person-behind-this';
            const authorBio = isRajsaar 
              ? "Observer • Thinker • Educator • Voice of Experience — reflections born from quiet observation, character, mentorship, and life lessons."
              : (essay.author_bio || 'Writer and Educator exploring human behaviour, emotional intelligence, wisdom, and life reflections.');

            return (
              <div style={{
                marginTop: '2.5rem',
                padding: '1.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '700' }}>
                  About The Author
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>
                  <Link to={authorLink} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {authorName}
                  </Link>
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {authorBio}
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                  <Link to={authorLink} style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--accent-teal)', textDecoration: 'none' }}>
                    View Profile & All Essays by {authorName} →
                  </Link>
                </div>
              </div>
            );
          })()}

          {/* Previous / Next Navigation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1rem',
            margin: '2.5rem 0'
          }}>
            {essay.prev ? (
              <Link to={`/essay/${essay.prev.slug}`} style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.15rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ArrowLeft size={12} /> Previous Essay
                </span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.975rem', fontWeight: '600', color: 'var(--text-primary)', lineClamp: 1, WebkitLineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {essay.prev.title}
                </span>
              </Link>
            ) : null}

            {essay.next ? (
              <Link to={`/essay/${essay.next.slug}`} style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.15rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                textAlign: 'right'
              }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.3rem' }}>
                  Next Essay <ArrowRight size={12} />
                </span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.975rem', fontWeight: '600', color: 'var(--text-primary)', lineClamp: 1, WebkitLineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {essay.next.title}
                </span>
              </Link>
            ) : null}
          </div>

          {/* Interactive Comments Section */}
          <CommentSection essayId={essay.id} />

        </div>
      </article>

      {/* Related Essays Stream */}
      {essay.related && essay.related.length > 0 && (
        <section style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <h3 className="serif-heading" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', marginBottom: '2rem', textAlign: 'center' }}>
              Further Reading in {essay.category_name}
            </h3>
            <div className="grid-3">
              {essay.related.map(rel => (
                <EssayCard key={rel.id} essay={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <NewsletterForm />
      </div>
    </div>
  );
}
