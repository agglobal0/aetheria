import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Feather, Cpu, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  return (
    <div className="container" style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(0.875rem, 3vw, 1.5rem) clamp(3rem, 6vw, 6rem) clamp(0.875rem, 3vw, 1.5rem)' }}>
      <Breadcrumbs items={[{ label: 'About Prof. Monika Chopra' }]} />

      <div className="reading-container">
        
        {/* About Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <span className="category-badge category-life-reflection" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} /> Scholar, Mentor & Essayist
          </span>
          <h1 className="serif-heading" style={{ fontSize: 'clamp(1.85rem, 5vw, 3.2rem)', marginTop: '0.4rem', marginBottom: '1.25rem' }}>
            Professor Monika Chopra
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            Dedicated to motivating others through reflective wisdom, ethical clarity, human resilience, and life lessons that endure.
          </p>
        </div>

        {/* Biography Content */}
        <div className="editorial-body" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2>Purpose & Vision</h2>
          <p>
            Welcome to the publication portal of Professor Monika Chopra. In a fast-paced world dominated by surface-level distractions and rapid digital exchanges, Prof. Chopra provides a sanctuary for deep reflection, character building, and moral clarity.
          </p>

          <p>
            Through decades of academic leadership, mentoring students, and scholarly inquiry, Professor Chopra believes that true education goes far beyond acquiring technical skills—it is about cultivating moral courage, emotional resilience, and intentional living.
          </p>

          <blockquote className="editorial-quote">
            "True education is not merely the transmission of data, but the cultivation of clarity, empathy, and moral discernment that inspires lives."
          </blockquote>

          <h2>Four Pillars of Life Lessons & Ethics</h2>
          <p>
            The essays and reflections on this journal are organized around four core pillars designed to motivate, guide, and ground the human spirit:
          </p>
        </div>

        {/* Pillars Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
          gap: '1.25rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
        }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <ShieldCheck className="category-ethics" size={26} style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Ethics & Moral Integrity</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              Building personal character, understanding ethical friction, and standing firm in core values.
            </p>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <Users className="category-human-behaviour" size={26} style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Human Wisdom</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              Exploring empathy, sincere vulnerability, relational maturity, and overcoming social detachment.
            </p>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <Feather className="category-life-reflection" size={26} style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Life Reflections</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              Meditations on time, solitude, quiet growth, presence, and discovering personal purpose.
            </p>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <Cpu className="category-technology" size={26} style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Mindful Living</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              Critical perspectives on technology, protecting attention, and preserving human autonomy.
            </p>
          </div>
        </div>

        {/* Closing CTA */}
        <div style={{ textAlign: 'center', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)' }}>
          <h3 className="serif-heading" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)', marginBottom: '1rem' }}>
            Begin Your Journey of Reflection
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', maxWidth: '520px', margin: '0 auto 1.75rem auto', fontSize: '0.95rem' }}>
            Discover life lessons, read published essays, or reach out to engage in academic and inspirational dialogue.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/essays" className="btn btn-primary" style={{ flexWrap: 'nowrap' }}>
              Explore Life Lessons <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ flexWrap: 'nowrap' }}>
              Contact Prof. Chopra
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

