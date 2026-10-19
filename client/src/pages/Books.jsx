import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  Award,
  ChevronRight,
  ArrowRight,
  Heart,
  Eye,
  CheckCircle2,
  Compass
} from 'lucide-react';
import SEO from '../components/SEO';
import BookReader from '../components/BookReader';
import { LeafIcon, LeafBullet } from '../components/BrandIcons';

export default function Books() {
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerInitialPage, setReaderInitialPage] = useState(1);

  const openReaderAt = (pageNum = 1) => {
    setReaderInitialPage(pageNum);
    setIsReaderOpen(true);
  };

  const chapters = [
    {
      num: '01',
      title: 'WITHIN',
      quote: 'The journey begins with the self.',
      page: 11,
      topics: ['Self-discovery', 'Quiet lessons', 'Inner gentleness', 'Authentic choices']
    },
    {
      num: '02',
      title: 'THE PEOPLE WE CARRY',
      quote: 'Some people become memories. Some become lessons.',
      page: 17,
      topics: ['First bonds', 'Parental shade', 'Unmeasured friendship', 'Letting love be free']
    },
    {
      num: '03',
      title: 'WHAT LIFE TAKES, WHAT IT LEAVES',
      quote: 'Loss changes us, but it does not have to diminish us.',
      page: 28,
      topics: ['Healed does not mean forgotten', 'Open cages', 'Moving forward', 'Meaning of sorrow']
    },
    {
      num: '04',
      title: 'CHARACTER',
      quote: 'Who we are becomes clearest when approval is no longer the goal.',
      page: 38,
      topics: ['Boundaries with goodness', 'Conformity vs truth', 'Dignity in disagreement', 'Integrity in silence']
    },
    {
      num: '05',
      title: 'POWER & HUMAN NATURE',
      quote: 'Power reveals what character tries to hide.',
      page: 43,
      topics: ['Voice vs the crowd', 'Flawed humanity', 'Vision beyond doubt', 'Authority with grace']
    },
    {
      num: '06',
      title: 'BECOMING',
      quote: 'Growth changes not only where we stand, but what we can see.',
      page: 50,
      topics: ['Thresholds of proximity', 'Breaking as transformation', 'Dignity in loss', 'Walking in storms']
    },
    {
      num: '07',
      title: 'WISDOM',
      quote: 'Perhaps we have not lost the world. Perhaps we have lost the wisdom to see it.',
      page: 58,
      topics: ['Seeing paradise', 'Returning what was never ours', 'Enduring grace', 'Silent maturity']
    },
    {
      num: '08',
      title: 'BEYOND THE OBVIOUS',
      quote: 'Some questions take us beyond what we think we know.',
      page: 69,
      topics: ['Vulnerability & strength', 'Stories beneath silence', 'Restraint in power', 'Truth beyond first impressions']
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <SEO
        title="Books & Publications — REFLECTIONS Part 1 | Monika Chopra | ORAANIS"
        description="Read 'REFLECTIONS — Part 1: On life, people, and the quiet lessons that shape us' by Monika Chopra. An interactive, animated digital publication available exclusively on ORAANIS."
        canonical="/books"
      />

      {/* Interactive FlipBook Modal Reader */}
      {isReaderOpen && (
        <BookReader
          bookUrl="/books/reflections-part-1.pdf"
          bookTitle="REFLECTIONS — Part 1"
          bookAuthor="Monika Chopra"
          initialPage={readerInitialPage}
          onClose={() => setIsReaderOpen(false)}
        />
      )}

      {/* =========================================================================
          HERO BANNER: ORAANIS Library Header
          ========================================================================= */}
      <section
        style={{
          padding: '4.5rem 0 3.5rem 0',
          background: 'linear-gradient(180deg, rgba(28, 37, 65, 0.08) 0%, rgba(11, 19, 43, 0.02) 100%)',
          borderBottom: '1px solid var(--border-color)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '900px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: '999px',
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}
          >
            <BookOpen size={15} />
            <span>ORAANIS Library & Publications</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
              fontWeight: '700',
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              marginBottom: '1.2rem',
              color: 'var(--text-primary)'
            }}
          >
            Books of Contemplation & Quiet Wisdom
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.68,
              maxWidth: '720px',
              margin: '0 auto'
            }}
          >
            Curated volumes designed to be read slowly, returned to often, and experienced directly on the site.
            No downloads, no distractions — just space to reflect.
          </p>
        </div>
      </section>

      {/* =========================================================================
          FEATURED BOOK SHOWCASE: REFLECTIONS — Part 1
          ========================================================================= */}
      <section style={{ padding: '4.5rem 0 4rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1160px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Left: 3D Hardcover Book Mockup Presentation */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  perspective: '1200px',
                  width: 'min(360px, 85vw)'
                }}
              >
                <div
                  className="book-3d-card"
                  onClick={() => openReaderAt(1)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1.48',
                    borderRadius: '8px 14px 14px 8px',
                    boxShadow: '18px 24px 50px -8px rgba(11, 19, 43, 0.55), 2px 0 10px rgba(0,0,0,0.4)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    border: '1px solid #7D2D44',
                    transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    transform: 'rotateY(-10deg) rotateX(4deg)',
                    transformOrigin: 'left center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(-8px)';
                    e.currentTarget.style.boxShadow = '24px 32px 65px -8px rgba(11, 19, 43, 0.65), 4px 0 16px rgba(0,0,0,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateY(-10deg) rotateX(4deg)';
                    e.currentTarget.style.boxShadow = '18px 24px 50px -8px rgba(11, 19, 43, 0.55), 2px 0 10px rgba(0,0,0,0.4)';
                  }}
                >
                  <img
                    src="/books/reflections/page-1.jpg"
                    alt="REFLECTIONS Part 1 by Monika Chopra"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Book Spine Crease Illusion */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: '26px',
                      background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.25) 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Click To Open Floating Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(11, 19, 43, 0.92)',
                      backdropFilter: 'blur(8px)',
                      color: '#F8FAFC',
                      padding: '0.4rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.74rem',
                      fontWeight: '700',
                      border: '1px solid #D4AF37',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                      zIndex: 3
                    }}
                  >
                    <BookOpen size={13} color="#D4AF37" />
                    <span>Click to Open FlipBook</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Information & Action CTA */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(58, 80, 107, 0.12)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.76rem',
                  fontWeight: '600',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                <Sparkles size={13} />
                <span>First Digital Edition • 2026</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
                  fontWeight: '700',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)'
                }}
              >
                REFLECTIONS — Part 1
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: '1.18rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.25rem'
                }}
              >
                On life, people, and the quiet lessons that shape us
              </p>

              <p
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  marginBottom: '1.75rem',
                  textAlign: 'justify'
                }}
              >
                Life rarely announces its lessons. They arrive through ordinary conversations,
                unexpected silences, changing relationships, difficult choices, and moments we
                understand only much later. In forty-three short reflections and eight quiet pauses,
                Monika Chopra invites you to read slowly, question gently, and see something familiar
                in a way you have never considered before.
              </p>

              {/* Publication Specs Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '0.85rem',
                  marginBottom: '2rem'
                }}
              >
                <div
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pages</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.15rem' }}>82 Pages</div>
                </div>

                <div
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Chapters</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.15rem' }}>8 Parts</div>
                </div>

                <div
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Quiet Pauses</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.15rem' }}>8 Inquiries</div>
                </div>

                <div
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Experience</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-primary)', marginTop: '0.15rem' }}>Animated Book</div>
                </div>
              </div>

              {/* Main Call to Action: Open Book */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openReaderAt(1)}
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: '#F8FAFC',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem 1.85rem',
                    fontSize: '0.96rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    boxShadow: '0 4px 14px rgba(28, 37, 65, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0B132B';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <BookOpen size={18} />
                  <span>Open & Read Book Online</span>
                </button>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <ShieldCheck size={16} color="var(--accent-primary)" />
                  <span>Protected Reading • In-Site Only (No Download)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTERS EXPLORER / TABLE OF CONTENTS GRID
          ========================================================================= */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1160px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.25rem' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '600',
                color: 'var(--accent-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              The 8 Journeys Within
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: '700',
                color: 'var(--text-primary)',
                margin: 0
              }}
            >
              Explore the Chapters
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.96rem',
                maxWidth: '600px',
                margin: '0.65rem auto 0 auto'
              }}
            >
              Click any chapter below to open the animated book directly at that page.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                onClick={() => openReaderAt(ch.page)}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(28, 37, 65, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.35rem',
                        fontWeight: '700',
                        color: 'var(--accent-primary)'
                      }}
                    >
                      {ch.num}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: 'var(--accent-light)',
                        color: 'var(--accent-primary)',
                        fontWeight: '600'
                      }}
                    >
                      p. {ch.page}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.18rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3
                    }}
                  >
                    {ch.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      fontStyle: 'italic',
                      fontSize: '0.86rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '1rem'
                    }}
                  >
                    "{ch.quote}"
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
                    {ch.topics.map((t, tidx) => (
                      <span
                        key={tidx}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.12rem 0.45rem',
                          borderRadius: '4px',
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-muted)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: 'var(--accent-primary)'
                    }}
                  >
                    <span>Read this section</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL NOTE: Why This Book Lives Only on ORAANIS
          ========================================================================= */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              margin: '0 auto 1.25rem auto'
            }}
          >
            <ShieldCheck size={24} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}
          >
            An Intentional Reading Sanctuary
          </h2>

          <p
            style={{
              fontSize: '0.98rem',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              textAlign: 'justify'
            }}
          >
            In an era of rapid skimming and disposable files, <em>REFLECTIONS — Part 1</em> has been
            crafted as a sanctuary. We deliberately host this edition exclusively within our interactive
            in-browser reader rather than providing downloadable files. This preserves the visual cadence,
            the deliberate pauses, the artwork, and the quiet sanctity intended by Monika Chopra.
            You can return whenever you wish, explore at your own pace, and let each page settle.
          </p>

          <button
            onClick={() => openReaderAt(1)}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#F8FAFC',
              border: 'none',
              borderRadius: '8px',
              padding: '0.85rem 2rem',
              fontSize: '0.96rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0B132B';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <BookOpen size={18} />
            <span>Begin Reading Reflections</span>
          </button>
        </div>
      </section>
    </div>
  );
}
