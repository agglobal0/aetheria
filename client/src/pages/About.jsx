import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Compass, Feather } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { profPortraitImg } from '../assets/images';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: 'clamp(1.5rem, 3vw, 2.5rem) 0 clamp(4rem, 8vw, 7rem) 0' }}>
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumbs items={[{ label: 'About Aetheria' }]} />
        </div>

        {/* =========================================================================
            1. ABOUT AETHERIA MANIFESTO
            ========================================================================= */}
        <article style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)',
          boxShadow: '0 4px 20px rgba(44, 38, 33, 0.04)',
          marginBottom: '3rem'
        }}>
          
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <h1 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.4rem, 5.5vw, 3.5rem)',
              fontWeight: '700',
              letterSpacing: '-0.01em',
              lineHeight: '1.15',
              marginBottom: '0.75rem',
              color: 'var(--text-primary)',
              textTransform: 'none'
            }}>
              About Aetheria
            </h1>
            <div style={{
              width: '45px',
              height: '2px',
              backgroundColor: 'var(--accent-primary)',
              margin: '1rem auto 0 auto',
              opacity: 0.7
            }} />
          </header>

          {/* Continuous Editorial Essay Prose */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.08rem, 2.2vw, 1.22rem)',
            lineHeight: '1.9',
            color: 'var(--text-primary)'
          }}>

            <p style={{ marginBottom: '1.25rem' }}>Some spaces are built with walls.</p>
            <p style={{ marginBottom: '1.25rem' }}>Some are built with words.</p>
            <p style={{ marginBottom: '2.25rem', fontWeight: '600' }}>Aetheria is one of the latter.</p>

            <p style={{ marginBottom: '1.25rem' }}>It was born from a simple realisation:</p>

            <blockquote style={{
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 2.4vw, 1.3rem)',
              lineHeight: '1.75',
              color: 'var(--accent-primary)',
              borderLeft: '3px solid var(--accent-primary)',
              paddingLeft: '1.25rem',
              margin: '2rem 0',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '1.25rem 1.5rem',
              borderRadius: '0 8px 8px 0'
            }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>People do not always need advice.</p>
              <p style={{ margin: 0 }}>Sometimes, they need a thought that helps them understand their own.</p>
            </blockquote>

            <p style={{ margin: '2.25rem 0 1.25rem 0', color: 'var(--text-secondary)' }}>
              Life gives us experiences, but rarely gives us their explanations.
            </p>

            <div style={{
              padding: '1rem 0 1.5rem 0',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: '2.1',
              marginBottom: '1rem'
            }}>
              <div>Why do some people stay when they should leave?</div>
              <div>Why do some endings hurt before they heal?</div>
              <div>Why do we seek approval from people who cannot see our worth?</div>
              <div>Why do we lose ourselves trying to hold on to what was never meant to stay?</div>
            </div>

            <p style={{ marginBottom: '1.5rem', fontWeight: '600' }}>
              Aetheria lives in these questions.
            </p>

            <p style={{ marginBottom: '2.25rem', lineHeight: '1.85' }}>
              It is a space for reflection, emotional intelligence, human behaviour, relationships, resilience, wisdom, spirituality and the lessons that life quietly teaches us.
            </p>

            <p style={{ marginBottom: '0.85rem' }}>Some words here may comfort you.</p>
            <p style={{ marginBottom: '0.85rem' }}>Some may challenge you.</p>
            <p style={{ marginBottom: '1.25rem' }}>Some may make you question something you have believed for years.</p>
            <p style={{ marginBottom: '2.25rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              And perhaps that is exactly how it should be.
            </p>

            <div style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              margin: '2.25rem 0',
              lineHeight: '1.75',
              borderLeft: '3px solid var(--accent-primary)'
            }}>
              <p style={{ margin: '0 0 0.4rem 0' }}>Aetheria does not promise answers to every question.</p>
              <p style={{ margin: 0, fontWeight: '600' }}>It simply creates room for better questions.</p>
            </div>

            <p style={{ marginBottom: '0.85rem' }}>Here, a difficult experience is not merely a wound.</p>
            <p style={{ marginBottom: '0.85rem', fontStyle: 'italic' }}>It can become wisdom.</p>
            <p style={{ marginBottom: '0.85rem' }}>A rejection can become redirection.</p>
            <p style={{ marginBottom: '0.85rem' }}>A closed door can become clarity.</p>
            <p style={{ marginBottom: '1.25rem' }}>Silence can become understanding.</p>
            <p style={{ marginBottom: '2.25rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
              And sometimes, losing your way can be the beginning of finding yourself.
            </p>

            <p style={{ marginBottom: '1.5rem', lineHeight: '1.85' }}>
              There is also a quieter side to Aetheria, a space where you can share what you cannot easily say elsewhere. Without labels. Without judgement. Without the pressure to reveal who you are.
            </p>

            <p style={{ marginBottom: '2.25rem', fontStyle: 'italic' }}>
              Because sometimes, anonymity gives honesty a voice.
            </p>

            <p style={{ marginBottom: '0.75rem' }}>This is not a place for perfect lives or perfect people.</p>
            <p style={{ marginBottom: '2.25rem', fontWeight: '600' }}>It is for real people navigating imperfect lives.</p>

            <div style={{ margin: '2rem 0', lineHeight: '2' }}>
              <div>Read something that speaks to you.</div>
              <div>Question something that doesn’t.</div>
              <div>Leave with a thought you did not arrive with.</div>
            </div>

            <p style={{ margin: '2.25rem 0 1rem 0', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              And if, somewhere between these words, you recognise a part of yourself,
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '600' }}>
              then Aetheria has already done what it was created to do.
            </p>

            {/* Aetheria Closing Mantra */}
            <div style={{
              marginTop: '3rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '0.85rem',
                color: 'var(--text-primary)'
              }}>
                Aetheria
              </h3>

              <div style={{
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                lineHeight: '2',
                marginBottom: '1rem'
              }}>
                <div>A space to pause.</div>
                <div>A thought to carry.</div>
                <div>A perspective to discover.</div>
              </div>
            </div>

          </div>
        </article>

        {/* =========================================================================
            2. THE PERSON BEHIND THIS (AUTHOR SECTION)
            ========================================================================= */}
        <section
          id="author"
          style={{
            scrollMarginTop: '6rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
            boxShadow: '0 4px 20px rgba(44, 38, 33, 0.04)'
          }}
        >
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent-primary)',
              marginBottom: '0.5rem'
            }}>
              <Compass size={14} /> Founder & Author
            </span>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              lineHeight: '1.2'
            }}>
              The Person Behind This
            </h2>
            <div style={{
              width: '40px',
              height: '2px',
              backgroundColor: 'var(--accent-primary)',
              margin: '0.85rem auto 0 auto',
              opacity: 0.7
            }} />
          </div>

          {/* Author Layout Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            alignItems: 'center'
          }}>
            
            {/* Portrait Column */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                maxWidth: '320px',
                width: '100%',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(44, 38, 33, 0.12)',
                border: '3px solid var(--bg-tertiary)'
              }}>
                <img
                  src={profPortraitImg}
                  alt="Prof. Monika Chopra"
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '4 / 5',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '0.2rem'
                }}>
                  Prof. Monika Chopra
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.04em'
                }}>
                  Educator & Writer
                </p>
              </div>
            </div>

            {/* Narrative Bio Column */}
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.05rem, 2vw, 1.15rem)',
              lineHeight: '1.85',
              color: 'var(--text-primary)'
            }}>
              <p style={{ marginBottom: '1.25rem' }}>
                I am <strong style={{ color: 'var(--accent-primary)' }}>Prof. Monika Chopra</strong>, an educator in Information Technology with nearly three decades of teaching, reading, observing, and learning from people and life.
              </p>

              <p style={{ marginBottom: '1.25rem' }}>
                Technology has been my profession. Human beings have been my deeper subject of study.
              </p>

              <p style={{ marginBottom: '1.25rem' }}>
                Aetheria was born from this intersection — of decades spent listening to students, colleagues, and friends navigating the unspoken complexities of life, career, relationships, and self-worth.
              </p>

              <p style={{
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                borderLeft: '2px solid var(--accent-primary)',
                paddingLeft: '1rem'
              }}>
                "I write to explore those lessons — not because I have figured life out, but because I continue to learn from it."
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
                <Link to="/essays" className="btn btn-dark-green" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                  Explore Essays <ArrowRight size={15} />
                </Link>
                <Link to="/share" className="btn btn-secondary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                  <Feather size={15} /> Share Anonymously
                </Link>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
