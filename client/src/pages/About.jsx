import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, BookOpen, Sparkles, Heart, Compass } from 'lucide-react';
import { LeafIcon } from '../components/BrandIcons';
import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      minHeight: '100vh',
      padding: 'clamp(1.5rem, 3vw, 2.5rem) 0 clamp(4rem, 8vw, 7rem) 0',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)'
    }}>
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.75rem' }}>
          <Breadcrumbs items={[{ label: 'About ORAANIS' }]} />
        </div>

        {/* =========================================================================
            ABOUT ORAANIS MANIFESTO CARD
            ========================================================================= */}
        <article style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: 'clamp(2.25rem, 5vw, 4.5rem) clamp(1.5rem, 5vw, 3.75rem)',
          boxShadow: '0 8px 32px rgba(44, 38, 33, 0.04)'
        }}>
          
          {/* Header Section */}
          <header style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
              <LeafIcon size={20} color="var(--accent-primary)" />
              <span style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)'
              }}>
                The Manifesto
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              marginBottom: '0.75rem',
              color: 'var(--text-primary)'
            }}>
              About ORAANIS
            </h1>

            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              A space to pause. A thought to carry. A perspective to discover.
            </p>

            <div style={{
              width: '48px',
              height: '2px',
              backgroundColor: 'var(--accent-primary)',
              margin: '1.5rem auto 0 auto',
              opacity: 0.6,
              borderRadius: '2px'
            }} />
          </header>

          {/* Main Manifesto Prose */}
          <div style={{
            fontSize: 'clamp(1rem, 2vw, 1.075rem)',
            lineHeight: '1.85',
            color: 'var(--text-primary)'
          }}>

            {/* Opening Intro Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(92, 122, 96, 0.06) 0%, rgba(212, 160, 89, 0.05) 100%)',
              borderLeft: '4px solid var(--accent-primary)',
              borderRadius: '0 12px 12px 0',
              padding: '1.5rem 1.75rem',
              marginBottom: '2.5rem'
            }}>
              <p style={{ fontSize: '1.15rem', fontWeight: '500', lineHeight: '1.7', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                Some spaces are built with walls. Some are built with words.
              </p>
              <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-primary)', margin: 0 }}>
                ORAANIS is one of the latter.
              </p>
            </div>

            {/* Genesis Paragraphs */}
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
                It was born from a simple realisation:
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                People do not always need advice.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Sometimes, they simply need a thought that helps them understand their own.
              </p>
            </div>

            {/* Central Questions Box */}
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '2rem',
              marginBottom: '2.5rem'
            }}>
              <p style={{
                fontSize: '0.92rem',
                fontWeight: '600',
                letterSpacing: '0.04em',
                color: 'var(--accent-primary)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase'
              }}>
                Life gives us experiences, but rarely gives us their explanations.
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
                marginBottom: '1.5rem'
              }}>
                {[
                  'Why do some people stay when they should leave?',
                  'Why do some endings hurt before they heal?',
                  'Why do we seek approval from people who cannot see our worth?',
                  'Why do we lose ourselves trying to hold on to what was never meant to stay?'
                ].map((q, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    lineHeight: '1.6'
                  }}>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>—</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>

              <div style={{
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-color)',
                fontSize: '1.05rem',
                fontWeight: '700',
                color: 'var(--text-primary)'
              }}>
                ORAANIS lives in these questions.
              </div>
            </div>

            {/* Scope & Mission */}
            <p style={{ marginBottom: '2rem', lineHeight: '1.85', color: 'var(--text-secondary)' }}>
              It is a space for reflection, emotional intelligence, human behaviour, relationships, resilience, wisdom, spirituality, and the quiet lessons life teaches us each day.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{
                backgroundColor: 'var(--bg-primary)',
                padding: '1.25rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Comfort & Challenge</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Some words here may comfort you. Some may challenge you. Some may question lifelong assumptions.
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-primary)',
                padding: '1.25rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Better Questions</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  ORAANIS does not promise answers to every question. It simply creates room for better questions.
                </div>
              </div>
            </div>

            {/* Perspective Transformations */}
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '14px',
              padding: '1.75rem',
              border: '1px solid var(--border-color)',
              marginBottom: '2.5rem'
            }}>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '1rem'
              }}>
                Reframing Life's Experiences
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.85rem'
              }}>
                {[
                  { from: 'A difficult experience', to: 'Wisdom' },
                  { from: 'A rejection', to: 'Redirection' },
                  { from: 'A closed door', to: 'Clarity' },
                  { from: 'Silence', to: 'Understanding' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.92rem'
                  }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.from}</span>
                    <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>➔ {item.to}</span>
                  </div>
                ))}
              </div>

              <p style={{
                marginTop: '1.25rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                lineHeight: '1.6'
              }}>
                And sometimes, losing your way can be the beginning of finding yourself.
              </p>
            </div>

            {/* Quieter Side & Anonymity */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.85rem'
              }}>
                A Safe and Unfiltered Space
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                There is also a quieter side to ORAANIS — a space where you can share what you cannot easily say elsewhere. Without labels. Without judgement. Without the pressure to reveal who you are.
              </p>
              <p style={{
                fontSize: '1.05rem',
                fontWeight: '600',
                color: 'var(--accent-primary)',
                lineHeight: '1.7'
              }}>
                Because sometimes, anonymity gives honesty a voice.
              </p>
            </div>

            {/* 3 Pillars of Engagement */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              padding: '1.5rem',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              marginBottom: '2.5rem'
            }}>
              {[
                'Read something that speaks to you.',
                'Question something that doesn’t.',
                'Leave with a thought you did not arrive with.'
              ].map((step, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.98rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Final Reflection */}
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.75rem'
            }}>
              And if, somewhere between these words, you recognise a part of yourself,
            </p>
            <p style={{
              fontSize: '1.15rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '3rem'
            }}>
              then ORAANIS has already done what it was created to do.
            </p>

            {/* Closing Mantra & CTA Footer */}
            <div style={{
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                ORAANIS
              </div>

              <div style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: '1.8',
                marginBottom: '2rem'
              }}>
                <div>A space to pause.</div>
                <div>A thought to carry.</div>
                <div>A perspective to discover.</div>
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                <Link to="/person-behind-this" className="btn-dark-green">
                  <User size={16} /> The Person Behind This
                </Link>
                <Link to="/essays" className="btn-warm-pill">
                  Explore Essays <ArrowRight size={15} />
                </Link>
              </div>
            </div>

          </div>
        </article>

      </div>
    </div>
  );
}
