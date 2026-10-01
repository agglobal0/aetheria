import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Brain, 
  HeartPulse, 
  Lightbulb, 
  Flower2, 
  Mail 
} from 'lucide-react';
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

  const pillars = [
    {
      title: 'Reflections',
      slug: 'reflections',
      icon: <BookOpen size={24} color="#0D9488" />,
      desc: 'Thoughtful examinations of time, personal growth, quiet stillness, and life observations.'
    },
    {
      title: 'Emotional Intelligence',
      slug: 'emotional-intelligence',
      icon: <Brain size={24} color="#16A34A" />,
      desc: 'Exploring empathy, sincere vulnerability, relational maturity, and self-awareness.'
    },
    {
      title: 'Healing',
      slug: 'healing',
      icon: <HeartPulse size={24} color="#D97706" />,
      desc: 'Nurturing resilience, emotional recovery, self-forgiveness, and inner peace.'
    },
    {
      title: 'Wisdom',
      slug: 'wisdom',
      icon: <Lightbulb size={24} color="#CA8A04" />,
      desc: 'Timeless insights, moral integrity, ethics, and enduring human life lessons.'
    },
    {
      title: 'Spirituality',
      slug: 'spirituality',
      icon: <Flower2 size={24} color="#0284C7" />,
      desc: 'Meditations on purpose, transcendence, quiet consciousness, and inner depth.'
    }
  ];

  return (
    <div className="container" style={{ padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 1.5rem) clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 1.5rem)' }}>
      <Breadcrumbs items={[{ label: 'About Prof. Monika Chopra & Aetheria' }]} />

      <div className="reading-container" style={{ maxWidth: '820px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <span className="category-badge category-reflections" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={13} /> Scholar, Mentor & Essayist
          </span>
          <h1 className="serif-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginTop: '0.4rem', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            Professor Monika Chopra
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto' }}>
            Dedicated to inspiring lives through reflective wisdom, ethical clarity, emotional resilience, and enduring life lessons.
          </p>
        </div>

        {/* Profile Card & Introduction */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)',
          alignItems: 'center',
          backgroundColor: 'var(--bg-secondary)',
          padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 'clamp(180px, 30vw, 220px)',
              height: 'clamp(180px, 30vw, 220px)',
              borderRadius: '50%',
              margin: '0 auto',
              overflow: 'hidden',
              border: '4px solid var(--bg-tertiary)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
            }}>
              <img
                src={profPortraitImg}
                alt="Prof. Monika Chopra"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Prof. Monika Chopra
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Founder & Editorial Director
            </p>
          </div>

          <div>
            <h2 className="serif-heading" style={{ fontSize: '1.5rem', marginBottom: '0.85rem' }}>
              A Sanctuary of Thought
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
              In a world dominated by noise and haste, Aetheria was created as a peaceful intellectual and spiritual haven—a space dedicated to deep reflection, emotional maturity, and the quiet lessons life teaches us.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
              Through decades of academic leadership, mentoring, and research, Professor Chopra explores the delicate crossroads of psychology, human behavior, and moral character.
            </p>
          </div>
        </div>

        {/* Editorial Body / Purpose & Vision */}
        <div className="editorial-body" style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <h2>Purpose & Philosophy</h2>
          <p>
            People do not always need straightforward advice; often, they need a clear thought that helps them understand their own reality. Life gives us experiences continuously, but rarely gives us their explanations immediately.
          </p>

          <p>
            Aetheria exists to slow down the rush of everyday living and provide a lens through which we can observe our habits, relationships, and aspirations with gentle honesty.
          </p>

          <blockquote className="editorial-quote">
            "True education is not merely the transmission of data, but the cultivation of clarity, empathy, and moral discernment that inspires lives."
          </blockquote>

          <h2 style={{ marginTop: '2.5rem' }}>Core Pillars of Life & Reflection</h2>
          <p>
            The essays and publications across this platform are organized around five timeless dimensions of human growth:
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '1.25rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
        }}>
          {pillars.map((item, idx) => (
            <Link
              key={idx}
              to={`/category/${item.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div style={{ marginBottom: '0.85rem' }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.45rem', color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, margin: 0 }}>
                {item.desc}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--accent-primary)', marginTop: '1rem' }}>
                Explore <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>

        {/* Closing & Signature */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 className="serif-heading" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', marginBottom: '0.75rem' }}>
            Begin Your Journey of Reflection
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', maxWidth: '520px', margin: '0 auto 1.75rem auto', fontSize: '0.95rem', lineHeight: '1.7' }}>
            Discover thoughtful life lessons, explore published essays, or reach out to engage in academic and inspirational dialogue.
          </p>

          <div style={{
            display: 'inline-block',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)',
            marginBottom: '2rem',
            minWidth: '180px'
          }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
              Monika Chopra
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/essays" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
              Explore Essays <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ padding: '0.75rem 1.4rem' }}>
              <Mail size={16} /> Contact Prof. Chopra
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
