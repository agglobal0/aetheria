import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User } from 'lucide-react';
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
      <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.75rem' }}>
          <Breadcrumbs items={[{ label: 'About Aetheria' }]} />
        </div>

        {/* =========================================================================
            ABOUT AETHERIA EDITORIAL ESSAY
            ========================================================================= */}
        <article style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: 'clamp(2.25rem, 5vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem)',
          boxShadow: '0 4px 24px rgba(44, 38, 33, 0.03)'
        }}>
          
          {/* Header */}
          <header style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
              <LeafIcon size={18} color="var(--accent-primary)" />
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3rem)',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              About Aetheria
            </h1>

            <div style={{
              width: '40px',
              height: '2px',
              backgroundColor: 'var(--accent-primary)',
              marginTop: '1rem',
              opacity: 0.6
            }} />
          </header>

          {/* Continuous Flowing Prose */}
          <div style={{
            fontSize: 'clamp(1rem, 2vw, 1.075rem)',
            lineHeight: '1.85',
            color: 'var(--text-primary)'
          }}>

            <p style={{ marginBottom: '1.25rem' }}>
              Some spaces are built with walls.
            </p>

            <p style={{ marginBottom: '1.25rem' }}>
              Some are built with words.
            </p>

            <p style={{ marginBottom: '2.25rem', fontWeight: '600' }}>
              Aetheria is one of the latter.
            </p>

            <p style={{ marginBottom: '1.25rem' }}>
              It was born from a simple realisation:
            </p>

            <p style={{ marginBottom: '1.25rem' }}>
              People do not always need advice.<br />
              Sometimes, they need a thought that helps them understand their own.
            </p>

            <p style={{ margin: '2.25rem 0 1.25rem 0', color: 'var(--text-secondary)' }}>
              Life gives us experiences, but rarely gives us their explanations.
            </p>

            <div style={{
              padding: '0.5rem 0 0.5rem 1.25rem',
              borderLeft: '2px solid var(--accent-primary)',
              margin: '1.5rem 0 2rem 0',
              lineHeight: '2',
              color: 'var(--text-primary)',
              fontStyle: 'italic'
            }}>
              <div>Why do some people stay when they should leave?</div>
              <div>Why do some endings hurt before they heal?</div>
              <div>Why do we seek approval from people who cannot see our worth?</div>
              <div>Why do we lose ourselves trying to hold on to what was never meant to stay?</div>
            </div>

            <p style={{ marginBottom: '1.5rem', fontWeight: '600' }}>
              Aetheria lives in these questions.
            </p>

            <p style={{ marginBottom: '2.25rem' }}>
              It is a space for reflection, emotional intelligence, human behaviour, relationships, resilience, wisdom, spirituality and the lessons that life quietly teaches us.
            </p>

            <p style={{ marginBottom: '1rem' }}>
              Some words here may comfort you.
            </p>

            <p style={{ marginBottom: '1rem' }}>
              Some may challenge you.
            </p>

            <p style={{ marginBottom: '1rem' }}>
              Some may make you question something you have believed for years.
            </p>

            <p style={{ marginBottom: '2.25rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              And perhaps that is exactly how it should be.
            </p>

            <p style={{ marginBottom: '1.25rem' }}>
              Aetheria does not promise answers to every question.<br />
              <strong style={{ fontWeight: '600' }}>It simply creates room for better questions.</strong>
            </p>

            <p style={{ marginTop: '2.25rem', marginBottom: '0.75rem' }}>
              Here, a difficult experience is not merely a wound.
            </p>

            <p style={{ marginBottom: '0.75rem', fontWeight: '500' }}>
              It can become wisdom.
            </p>

            <p style={{ marginBottom: '0.75rem' }}>
              A rejection can become redirection.
            </p>

            <p style={{ marginBottom: '0.75rem' }}>
              A closed door can become clarity.
            </p>

            <p style={{ marginBottom: '0.75rem' }}>
              Silence can become understanding.
            </p>

            <p style={{ marginBottom: '2.25rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
              And sometimes, losing your way can be the beginning of finding yourself.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              There is also a quieter side to Aetheria, a space where you can share what you cannot easily say elsewhere. Without labels. Without judgement. Without the pressure to reveal who you are.
            </p>

            <p style={{ marginBottom: '2.25rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Because sometimes, anonymity gives honesty a voice.
            </p>

            <p style={{ marginBottom: '0.75rem' }}>
              This is not a place for perfect lives or perfect people.
            </p>

            <p style={{ marginBottom: '2.25rem', fontWeight: '600' }}>
              It is for real people navigating imperfect lives.
            </p>

            <div style={{ margin: '2rem 0', lineHeight: '2' }}>
              <div>Read something that speaks to you.</div>
              <div>Question something that doesn’t.</div>
              <div>Leave with a thought you did not arrive with.</div>
            </div>

            <p style={{ margin: '2.25rem 0 1rem 0', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              And if, somewhere between these words, you recognise a part of yourself,
            </p>

            <p style={{ marginBottom: '3rem', fontWeight: '600' }}>
              then Aetheria has already done what it was created to do.
            </p>

            {/* Closing Mantra & Sign-off */}
            <div style={{
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)',
              textAlign: 'left'
            }}>
              <div style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.65rem'
              }}>
                Aetheria
              </div>

              <div style={{
                color: 'var(--text-secondary)',
                fontSize: '0.98rem',
                lineHeight: '1.8',
                marginBottom: '1.5rem',
                fontStyle: 'italic'
              }}>
                <div>A space to pause.</div>
                <div>A thought to carry.</div>
                <div>A perspective to discover.</div>
              </div>

              <div style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '2.5rem'
              }}>
                Monika Chopra
              </div>

              {/* Navigation Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Link to="/person-behind-this" className="btn-dark-green">
                  <User size={16} /> The Person Behind This
                </Link>
                <Link to="/essays" className="btn-warm-pill">
                  Explore Reflections <ArrowRight size={15} />
                </Link>
              </div>
            </div>

          </div>
        </article>

      </div>
    </div>
  );
}
