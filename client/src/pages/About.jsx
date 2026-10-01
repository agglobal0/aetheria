import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="container" style={{ padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 1.5rem) clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 1.5rem)' }}>
      <Breadcrumbs items={[{ label: 'About Aetheria' }]} />

      <article className="reading-container" style={{
        maxWidth: '720px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-secondary)',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        
        {/* Title */}
        <header style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <h1 className="serif-heading" style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            letterSpacing: '-0.01em',
            marginBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            About Aetheria
          </h1>
          <div style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'var(--accent-primary)',
            margin: '1.25rem auto 0 auto',
            opacity: 0.6
          }} />
        </header>

        {/* Continuous Editorial Essay Prose */}
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.1rem, 2.4vw, 1.25rem)',
          lineHeight: '1.85',
          color: 'var(--text-primary)'
        }}>

          <p style={{ marginBottom: '1.25rem' }}>Some spaces are built with walls.</p>
          <p style={{ marginBottom: '1.25rem' }}>Some are built with words.</p>
          <p style={{ marginBottom: '2rem', fontWeight: '600' }}>Aetheria is one of the latter.</p>

          <p style={{ marginBottom: '1.25rem' }}>It was born from a simple realisation:</p>

          <blockquote style={{
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
            lineHeight: '1.7',
            color: 'var(--accent-primary)',
            borderLeft: '3px solid var(--accent-primary)',
            paddingLeft: '1.25rem',
            margin: '1.75rem 0'
          }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>People do not always need advice.</p>
            <p style={{ margin: 0 }}>Sometimes, they need a thought that helps them understand their own.</p>
          </blockquote>

          <p style={{ margin: '2rem 0 1.25rem 0', color: 'var(--text-secondary)' }}>
            Life gives us experiences, but rarely gives us their explanations.
          </p>

          <div style={{
            padding: '1.25rem 0',
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            lineHeight: '2',
            marginBottom: '1.5rem'
          }}>
            <div>Why do some people stay when they should leave?</div>
            <div>Why do some endings hurt before they heal?</div>
            <div>Why do we seek approval from people who cannot see our worth?</div>
            <div>Why do we lose ourselves trying to hold on to what was never meant to stay?</div>
          </div>

          <p style={{ marginBottom: '1.5rem', fontWeight: '600' }}>
            Aetheria lives in these questions.
          </p>

          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
            It is a space for reflection, emotional intelligence, human behaviour, relationships, resilience, wisdom, spirituality and the lessons that life quietly teaches us.
          </p>

          <p style={{ marginBottom: '1rem' }}>Some words here may comfort you.</p>
          <p style={{ marginBottom: '1rem' }}>Some may challenge you.</p>
          <p style={{ marginBottom: '1.25rem' }}>Some may make you question something you have believed for years.</p>
          <p style={{ marginBottom: '2rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            And perhaps that is exactly how it should be.
          </p>

          <div style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            margin: '2rem 0',
            lineHeight: '1.75'
          }}>
            <p style={{ margin: '0 0 0.4rem 0' }}>Aetheria does not promise answers to every question.</p>
            <p style={{ margin: 0, fontWeight: '600' }}>It simply creates room for better questions.</p>
          </div>

          <p style={{ marginBottom: '1rem' }}>Here, a difficult experience is not merely a wound.</p>
          <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>It can become wisdom.</p>
          <p style={{ marginBottom: '1rem' }}>A rejection can become redirection.</p>
          <p style={{ marginBottom: '1rem' }}>A closed door can become clarity.</p>
          <p style={{ marginBottom: '1.25rem' }}>Silence can become understanding.</p>
          <p style={{ marginBottom: '2rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
            And sometimes, losing your way can be the beginning of finding yourself.
          </p>

          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
            There is also a quieter side to Aetheria, a space where you can share what you cannot easily say elsewhere. Without labels. Without judgement. Without the pressure to reveal who you are.
          </p>

          <p style={{ marginBottom: '2rem', fontStyle: 'italic' }}>
            Because sometimes, anonymity gives honesty a voice.
          </p>

          <p style={{ marginBottom: '0.75rem' }}>This is not a place for perfect lives or perfect people.</p>
          <p style={{ marginBottom: '2rem', fontWeight: '600' }}>It is for real people navigating imperfect lives.</p>

          <div style={{ margin: '2rem 0', lineHeight: '1.9' }}>
            <div>Read something that speaks to you.</div>
            <div>Question something that doesn’t.</div>
            <div>Leave with a thought you did not arrive with.</div>
          </div>

          <p style={{ margin: '2rem 0 1rem 0', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            And if, somewhere between these words, you recognise a part of yourself,
          </p>

          <p style={{ marginBottom: '2.5rem', fontWeight: '600' }}>
            then Aetheria has already done what it was created to do.
          </p>

          {/* Mantras & Signature */}
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
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}>
              Aetheria
            </h3>

            <div style={{
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: '2',
              marginBottom: '2rem'
            }}>
              <div>A space to pause.</div>
              <div>A thought to carry.</div>
              <div>A perspective to discover.</div>
            </div>

            <div style={{
              display: 'inline-block',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
              minWidth: '160px',
              marginBottom: '2.5rem'
            }}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                Monika Chopra
              </p>
            </div>

            <div>
              <Link to="/essays" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem' }}>
                Explore Essays <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>

      </article>
    </div>
  );
}
