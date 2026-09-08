import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Check, Share2 } from 'lucide-react';

const MOTIVATIONAL_QUOTES = [
  {
    quote: "True education is not merely the transmission of data, but the cultivation of clarity, empathy, and moral discernment.",
    context: "On Moral Education & Mentoring",
    pillar: "Ethics & Virtue"
  },
  {
    quote: "Indifference protects us from temporary pain, but it starves us of lifelong joy. Sincerity remains our only true bridge.",
    context: "Why We Pretend Not to Care",
    pillar: "Human Behaviour"
  },
  {
    quote: "When an algorithm chooses what you see before you think, choice ceases to be freedom and becomes execution of code.",
    context: "When AI Starts Knowing Us Better",
    pillar: "Mindful Tech"
  },
  {
    quote: "Winter in nature looks like death, yet underground, roots are deepening. Quiet seasons are where character matures.",
    context: "What Quiet Seasons Teach Us",
    pillar: "Resilience"
  },
  {
    quote: "We spend our youth rushing to arrive, only to realize in quiet hindsight that the mundane afternoons were the real life.",
    context: "Things We Understand Too Late",
    pillar: "Life Reflection"
  }
];

export default function MotivationalQuotes() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const prevQuote = () => {
    setActiveIdx((prev) => (prev === 0 ? MOTIVATIONAL_QUOTES.length - 1 : prev - 1));
    setCopied(false);
  };

  const nextQuote = () => {
    setActiveIdx((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    setCopied(false);
  };

  const current = MOTIVATIONAL_QUOTES[activeIdx];

  const handleShare = () => {
    const text = `"${current.quote}" — Prof. Monika Chopra (${current.context})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2.5rem)',
      margin: 'clamp(3rem, 6vw, 5rem) 0',
      textAlign: 'center',
      position: 'relative',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Quote size={38} style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem', opacity: 0.8 }} />

        <div style={{ marginBottom: '1.25rem' }}>
          <span className="category-badge category-life-reflection">
            {current.pillar}
          </span>
        </div>

        <blockquote style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(1.15rem, 3.2vw, 1.85rem)',
          fontStyle: 'italic',
          lineHeight: '1.45',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          minHeight: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflowWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          "{current.quote}"
        </blockquote>

        <cite style={{ fontSize: '0.85rem', fontStyle: 'normal', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '1.75rem' }}>
          — Prof. Monika Chopra, <em>{current.context}</em>
        </cite>

        {/* Carousel & Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={prevQuote}
              aria-label="Previous quote"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-primary)',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextQuote}
              aria-label="Next quote"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-primary)',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {MOTIVATIONAL_QUOTES.map((_, i) => (
              <span
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: i === activeIdx ? '20px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: i === activeIdx ? 'var(--accent-primary)' : 'var(--border-hover)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              />
            ))}
          </div>

          <button
            onClick={handleShare}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            {copied ? 'Copied!' : 'Share Quote'}
          </button>
        </div>
      </div>
    </section>
  );
}
