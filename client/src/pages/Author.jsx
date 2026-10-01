import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Feather, BookOpen, Heart, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { profPortraitImg } from '../assets/images';

export default function Author() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: 'clamp(1.5rem, 3vw, 2.5rem) 0 clamp(4rem, 8vw, 7rem) 0' }}>
      <div className="container" style={{ maxWidth: '880px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumbs items={[{ label: 'The Person Behind This' }]} />
        </div>

        {/* Main Content Card */}
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
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent-primary)',
              marginBottom: '0.6rem'
            }}>
              <Compass size={14} /> Founder & Author
            </span>

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
              The Person Behind This
            </h1>

            <div style={{
              width: '45px',
              height: '2px',
              backgroundColor: 'var(--accent-primary)',
              margin: '1rem auto 0 auto',
              opacity: 0.7
            }} />
          </header>

          {/* Author Grid: Portrait & Intro Bio */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            alignItems: 'center',
            marginBottom: '3rem'
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
                boxShadow: '0 10px 30px rgba(44, 38, 33, 0.12)',
                border: '4px solid var(--bg-tertiary)'
              }}>
                <img
                  src={profPortraitImg}
                  alt="Monika Chopra"
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '4 / 5',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{ marginTop: '1.1rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.65rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '0.2rem'
                }}>
                  Monika Chopra
                </h2>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.04em'
                }}>
                  Educator • Observer • Writer
                </p>
              </div>
            </div>

            {/* Introductory Narrative */}
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.08rem, 2.2vw, 1.2rem)',
              lineHeight: '1.9',
              color: 'var(--text-primary)'
            }}>
              <p style={{ marginBottom: '1.25rem' }}>
                I am <strong style={{ color: 'var(--accent-primary)' }}>Monika Chopra</strong>, an educator in Information Technology with nearly three decades of teaching, reading, observing, and learning from people and life.
              </p>

              <p style={{ marginBottom: '1.25rem' }}>
                Technology has been my profession. Human beings have been my deeper subject of study.
              </p>

              <blockquote style={{
                fontStyle: 'italic',
                fontSize: '1.15rem',
                lineHeight: '1.75',
                color: 'var(--accent-primary)',
                borderLeft: '3px solid var(--accent-primary)',
                paddingLeft: '1.25rem',
                margin: '1.5rem 0',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1rem 1.25rem',
                borderRadius: '0 8px 8px 0'
              }}>
                "I write to explore those lessons — not because I have figured life out, but because I continue to learn from it."
              </blockquote>
            </div>

          </div>

          {/* Full Narrative Essay */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.08rem, 2.2vw, 1.2rem)',
            lineHeight: '1.9',
            color: 'var(--text-primary)',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2.5rem'
          }}>

            <p style={{ marginBottom: '1.5rem' }}>
              Over the decades spent in academic halls, mentoring sessions, and quiet everyday conversations, I came to realise a fundamental truth:
            </p>

            <p style={{ marginBottom: '1.5rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
              Regardless of who we are, where we come from, or what title we hold, we all navigate the same unspoken vulnerabilities.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              We all wonder why certain relationships fall apart, how to recover our sense of self-worth after a quiet betrayal, why some goodbyes sting before they heal, and how to find courage when our plans do not turn out as intended.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              Aetheria was born from this space of listening. It is not an advice column, nor a rulebook for how one ought to live. It is a quiet place of companionship for the mind — a mirror where experiences are transformed into perspective, and pain is given room to turn into wisdom.
            </p>

            <p style={{ marginBottom: '2.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              If a single line here helps you feel understood, makes you pause to breathe, or brings you clarity on a path you are walking, then this journey has achieved its purpose.
            </p>

            {/* Signature & Closing */}
            <div style={{
              textAlign: 'center',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-color)',
              marginTop: '2.5rem'
            }}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.75rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                margin: '0 0 0.35rem 0'
              }}>
                Monika Chopra
              </p>
              <p style={{
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}>
                Aetheria — Life Lessons & Wisdom
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Link to="/essays" className="btn btn-dark-green" style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}>
                  Explore Essays <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn btn-secondary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}>
                  <BookOpen size={16} /> About Aetheria
                </Link>
                <Link to="/share" className="btn btn-secondary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}>
                  <Feather size={16} /> Share Anonymously
                </Link>
              </div>
            </div>

          </div>

        </article>

      </div>
    </div>
  );
}
