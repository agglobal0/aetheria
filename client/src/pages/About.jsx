import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, HelpCircle, Compass, HeartHandshake, Eye, ArrowRight, Feather } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { profPortraitImg } from '../assets/images';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  const reflectiveQuestions = [
    "Why do some people stay when they should leave?",
    "Why do some endings hurt before they heal?",
    "Why do we seek approval from people who cannot see our worth?",
    "Why do we lose ourselves trying to hold on to what was never meant to stay?"
  ];

  const transformations = [
    { from: "A difficult experience", to: "Wisdom" },
    { from: "A rejection", to: "Redirection" },
    { from: "A closed door", to: "Clarity" },
    { from: "Silence", to: "Understanding" }
  ];

  const topics = [
    "Reflections",
    "Emotional Intelligence",
    "Healing",
    "Relationships",
    "Resilience",
    "Wisdom",
    "Spirituality",
    "Life Lessons"
  ];

  return (
    <div className="container" style={{ padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 1.5rem) clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 1.5rem)' }}>
      <Breadcrumbs items={[{ label: 'About Aetheria' }]} />

      <div className="reading-container" style={{ maxWidth: '780px', margin: '0 auto' }}>
        
        {/* Header Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <span className="category-badge category-reflections" style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} /> Sanctuary of Thought & Reflection
          </span>
          <h1 className="serif-heading" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', marginTop: '0.4rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.15' }}>
            About Aetheria
          </h1>
          
          <div style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.45rem)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--accent-primary)',
            lineHeight: '1.8',
            maxWidth: '620px',
            margin: '0 auto'
          }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>Some spaces are built with walls.</p>
            <p style={{ margin: '0 0 0.75rem 0' }}>Some are built with words.</p>
            <p style={{ fontWeight: '600', color: 'var(--text-primary)', fontStyle: 'normal' }}>
              Aetheria is one of the latter.
            </p>
          </div>
        </div>

        {/* Realisation Box */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: 'clamp(1.75rem, 4vw, 2.5rem)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: 'var(--accent-primary)'
          }} />

          <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '0.75rem' }}>
            The Core Realisation
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', color: 'var(--text-primary)', lineHeight: '1.7', margin: 0 }}>
            "People do not always need advice.<br />
            <strong>Sometimes, they need a thought that helps them understand their own.</strong>"
          </p>
          <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px dashed var(--border-color)', color: 'var(--text-secondary)', fontSize: '1rem', fontStyle: 'italic' }}>
            Life gives us experiences, but rarely gives us their explanations.
          </div>
        </div>

        {/* Questions Section */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <HelpCircle size={20} style={{ color: 'var(--accent-primary)' }} />
            <h2 className="serif-heading" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', margin: 0 }}>
              Aetheria lives in these questions
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}>
            {reflectiveQuestions.map((q, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.6',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: '1' }}>“</span>
                <span>{q}</span>
              </div>
            ))}
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            It is a space for reflection, emotional intelligence, healing, relationships, resilience, wisdom, spirituality and the lessons that life quietly teaches us.
          </p>

          {/* Topics Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {topics.map((topic, i) => (
              <span 
                key={i} 
                style={{
                  padding: '0.35rem 0.85rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* The Nature of the Space */}
        <div style={{
          padding: 'clamp(1.75rem, 4vw, 2.5rem)',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', color: 'var(--text-primary)', lineHeight: '1.75' }}>
            <p style={{ margin: 0 }}>Some words here may comfort you.</p>
            <p style={{ margin: 0 }}>Some may challenge you.</p>
            <p style={{ margin: 0 }}>Some may make you question something you have believed for years.</p>
            <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic', color: 'var(--accent-primary)', fontWeight: '600' }}>
              And perhaps that is exactly how it should be.
            </p>
          </div>

          <div style={{
            marginTop: '1.75rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-color)',
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.7'
          }}>
            <strong>Aetheria does not promise answers to every question.</strong> It simply creates room for better questions.
          </div>
        </div>

        {/* Transformation Grid */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2 className="serif-heading" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', marginBottom: '1.25rem', textAlign: 'center' }}>
            Where Experiences Become Clarity
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>
            Here, a difficult experience is not merely a wound.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {transformations.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {item.from}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600', margin: '0.2rem 0' }}>
                  can become
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {item.to}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: 'var(--text-primary)'
          }}>
            "And sometimes, losing your way can be the beginning of finding yourself."
          </div>
        </div>

        {/* The Quieter Side & Anonymity */}
        <div style={{
          padding: 'clamp(2rem, 4vw, 2.75rem)',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Feather size={22} style={{ color: 'var(--accent-primary)' }} />
            <h2 className="serif-heading" style={{ fontSize: 'clamp(1.35rem, 3vw, 1.7rem)', margin: 0 }}>
              The Quieter Side of Aetheria
            </h2>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.25rem' }}>
            There is also a quieter side to Aetheria — a space where you can share what you cannot easily say elsewhere. Without labels. Without judgement. Without the pressure to reveal who you are.
          </p>

          <blockquote className="editorial-quote" style={{ margin: '1.5rem 0', fontSize: '1.15rem' }}>
            "Because sometimes, anonymity gives honesty a voice."
          </blockquote>

          <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: '1.8', marginTop: '1.25rem' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>This is not a place for perfect lives or perfect people.</p>
            <p style={{ margin: 0, fontWeight: '600' }}>It is for real people navigating imperfect lives.</p>
          </div>
        </div>

        {/* Call to Experience */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '0.6rem',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: 'var(--text-primary)',
            lineHeight: '1.7',
            marginBottom: '2rem'
          }}>
            <span>Read something that speaks to you.</span>
            <span>Question something that doesn’t.</span>
            <span>Leave with a thought you did not arrive with.</span>
          </div>

          <p style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--accent-primary)',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            And if, somewhere between these words, you recognise a part of yourself — then Aetheria has already done what it was created to do.
          </p>
        </div>

        {/* Signature & Three Mantras (The Person Behind This) */}
        <div id="author" style={{
          textAlign: 'center',
          padding: 'clamp(2.5rem, 5vw, 3.5rem) 1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          scrollMarginTop: '6rem'
        }}>
          <h3 className="serif-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
            Aetheria
          </h3>

          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: '2',
            marginBottom: '2rem'
          }}>
            <div>A space to pause.</div>
            <div>A thought to carry.</div>
            <div>A perspective to discover.</div>
          </div>

          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            minWidth: '220px'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '1rem',
              border: '3px solid var(--accent-primary)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img 
                src={profPortraitImg} 
                alt="Prof. Monika Chopra" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
              Monika Chopra
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <Link to="/essays" className="btn btn-primary" style={{ flexWrap: 'nowrap' }}>
              Explore Reflections <ArrowRight size={16} />
            </Link>
            <Link to="/confessions" className="btn btn-outline" style={{ flexWrap: 'nowrap' }}>
              Visit Anonymous Thoughts
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}


