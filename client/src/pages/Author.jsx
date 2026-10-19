import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Feather, BookOpen } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { profPortraitImg } from '../assets/images';

export default function Author() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: 'clamp(1.5rem, 3vw, 2.5rem) 0 clamp(4rem, 8vw, 7rem) 0' }}>
      <SEO
        title="Monika Chopra — Educator, Observer & Founder of ORAANIS"
        description="Meet Monika Chopra: an educator, mentor, and writer who created ORAANIS to give everyday observations, emotional wisdom, and unspoken reflections a thoughtful space."
        canonical="/person-behind-this"
        author="Monika Chopra"
      />
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumbs items={[{ label: 'The Person Behind This' }]} />
        </div>

        {/* Main Content Article */}
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
              <Compass size={14} /> Founder & Writer
            </span>

            <h1 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.3rem, 5.5vw, 3.4rem)',
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

          {/* Portrait Banner / Card */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)'
          }}>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '300px',
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
            <div style={{ marginTop: '1rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.65rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.15rem'
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

          {/* Continuous Editorial Essay Prose */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.08rem, 2.2vw, 1.22rem)',
            lineHeight: '1.9',
            color: 'var(--text-primary)',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2.5rem',
            textAlign: 'justify'
          }}>

            <p style={{ marginBottom: '1.25rem' }}>
              I did not create this space because I had something extraordinary to say.
            </p>

            <p style={{ marginBottom: '2rem', fontWeight: '600' }}>
              I created it because, over the years, I realised how many ordinary thoughts remain unspoken.
            </p>

            <div style={{
              padding: '0.75rem 0 1.25rem 0',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: '2.1',
              marginBottom: '1rem'
            }}>
              <div>A question we carry for years.</div>
              <div>A lesson we understand too late.</div>
              <div>A relationship we struggle to understand.</div>
              <div>A phase of life we survive quietly.</div>
              <div>Or simply a thought that keeps returning to us, asking to be understood.</div>
            </div>

            <p style={{ margin: '2rem 0 1.25rem 0' }}>
              I have spent almost three decades in education. Teaching has been my profession, but learning has never been limited to a classroom.
            </p>

            <div style={{ margin: '1.5rem 0', lineHeight: '2' }}>
              <div>Books taught me to look beyond what is obvious.</div>
              <div>People taught me that everyone carries a world that may not be visible.</div>
              <div>Life taught me that some of the deepest lessons arrive without announcements.</div>
              <div>And experience taught me that sometimes, a single thought at the right moment can change the way we look at everything.</div>
            </div>

            <p style={{ marginBottom: '1.25rem' }}>
                I am Monika Chopra — an educator, an avid reader, a writer, and, above all, someone who continues to learn from life.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                Writing has always been my way of making sense of what I read, experience and feel.
              </p>

            <p style={{ marginBottom: '1.5rem' }}>
              This platform grew from that habit.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              It is not meant to be another place telling people what they should believe, how they should live, or what they should do.
            </p>

            <div style={{ margin: '1.5rem 0', lineHeight: '2' }}>
              <div>It is a space where thoughts can breathe.</div>
              <div>Where experiences can be shared.</div>
              <div>Where difficult questions do not need immediate answers.</div>
              <div>Where words can sometimes say what we have struggled to say ourselves.</div>
            </div>

            <div style={{ margin: '1.5rem 0', lineHeight: '2' }}>
              <div>Some writings here may make you think.</div>
              <div>Some may challenge you.</div>
              <div>Some may comfort you.</div>
              <div>Some may simply stay with you for a while.</div>
            </div>

            <p style={{ margin: '2rem 0 1.25rem 0', fontWeight: '600' }}>
              And that is enough.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              Because I believe words do not always have to solve something.
            </p>

            <p style={{ marginBottom: '2rem', fontStyle: 'italic', color: 'var(--accent-primary)' }}>
              Sometimes, they only need to reach the right person at the right time.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              This is also my invitation to look at life beyond its obvious definitions — beyond success and failure, right and wrong, gain and loss.
            </p>

            <div style={{ margin: '1.5rem 0', lineHeight: '2' }}>
              <div>To read not just for information, but for meaning.</div>
              <div>To reflect without judging ourselves too quickly.</div>
              <div>To question without being afraid of the answers.</div>
              <div>And to keep becoming, because none of us is ever a finished story.</div>
            </div>

            <p style={{ margin: '2rem 0 1rem 0' }}>
              There will be my writings here.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              There will be other voices too.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              Because this space is not meant to be only about me.
            </p>

            <p style={{ marginBottom: '2rem', fontWeight: '600' }}>
              It is about the conversations that begin when one person’s thought meets another person’s experience.
            </p>

            <div style={{ margin: '1.5rem 0', lineHeight: '2', fontStyle: 'italic' }}>
              <div>Perhaps you will find something here that puts words to a feeling you could not explain.</div>
              <div>Perhaps you will discover a perspective you had never considered.</div>
              <div>Or perhaps you will simply pause for a moment in the middle of a busy life.</div>
            </div>

            <p style={{ margin: '2rem 0 1.5rem 0', fontWeight: '600', color: 'var(--accent-primary)' }}>
              If that happens, this journey has already found its purpose.
            </p>

            <p style={{ marginBottom: '1rem' }}>
              I am not here to give you a formula for life.
            </p>

            <p style={{ marginBottom: '2rem' }}>
              I am here to share what I have read, lived, questioned and understood along the way.
            </p>

            <div style={{ margin: '1.5rem 0', lineHeight: '2' }}>
              <div>Take what speaks to you.</div>
              <div>Question what does not.</div>
              <div>And keep discovering your own way.</div>
            </div>

            {/* Closing Signature & Tagline */}
            <div style={{
              textAlign: 'center',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)',
              marginTop: '3rem'
            }}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.65rem',
                fontWeight: '700',
                color: 'var(--accent-primary)',
                marginBottom: '0.5rem',
                letterSpacing: '0.02em'
              }}>
                Welcome
              </p>

              <div style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.35rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
                marginBottom: '1.5rem'
              }}>
                Read. Reflect. Become.
              </div>

              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.85rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                margin: '0 0 2rem 0'
              }}>
                Monika Chopra
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Link to="/essays" className="btn-dark-green">
                  Explore Essays <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn-warm-pill">
                  <BookOpen size={16} /> About ORAANIS
                </Link>
              </div>
            </div>

          </div>

        </article>

      </div>
    </div>
  );
}
