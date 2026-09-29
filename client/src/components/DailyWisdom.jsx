import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Heart, BookOpen } from 'lucide-react';

const WISDOM_LESSONS = [
  {
    quote: "Character is not built in the amphitheater of applause, but in the quiet solitude of unobserved choices.",
    lesson: "Ethical integrity is what you choose when no one is holding a camera or writing a review.",
    reflection: "What choice can you make today purely out of personal integrity, regardless of who sees it?",
    category: "Ethics & Virtue"
  },
  {
    quote: "The tragedy of life is not that it ends so soon, but that we wait so long to begin noticing it.",
    lesson: "Presence is the highest form of self-respect and gratitude.",
    reflection: "Take 3 minutes to notice three things around you right now that you usually take for granted.",
    category: "Reflections"
  },
  {
    quote: "In a world designed for instant gratification, intentional friction is an act of spiritual freedom.",
    lesson: "Slowing down allows your conscience to catch up with your speed of action.",
    reflection: "Where can you add a healthy 10-second pause before acting or replying today?",
    category: "Mindful Living"
  },
  {
    quote: "Resilience is not the absence of difficulty; it is the quiet refusal to let bitterness define your story.",
    lesson: "Every setback carries a blueprint for deeper compassion and wisdom.",
    reflection: "What past difficulty has taught you a strength that now serves others?",
    category: "Resilience & Purpose"
  },
  {
    quote: "True confidence demands neither loud declaration nor constant validation—only inner alignment.",
    lesson: "When you know your core values, external noise loses its ability to sway you.",
    reflection: "Which single core value will guide your decisions today?",
    category: "Human Behaviour"
  }
];

export default function DailyWisdom() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  const current = WISDOM_LESSONS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % WISDOM_LESSONS.length);
    setCopied(false);
    setLiked(false);
    setShowReflection(false);
  };

  const handleCopy = () => {
    const text = `"${current.quote}" — Prof. Monika Chopra (Life Lessons & Ethics)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(1.25rem, 4vw, 2.5rem)',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all var(--transition-normal)'
    }}>
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        background: 'var(--hero-glow)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Header bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '0.6rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="category-badge category-reflections">
            <Sparkles size={13} /> Daily Life Lesson
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            {current.category}
          </span>
        </div>

        <button
          onClick={handleNext}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.825rem',
            fontWeight: '600',
            color: 'var(--accent-primary)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-light)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
          title="Load New Life Lesson"
        >
          <RefreshCw size={14} /> New Wisdom
        </button>
      </div>

      {/* Main Quote */}
      <blockquote style={{
        fontFamily: 'var(--font-title)',
        fontSize: 'clamp(1.15rem, 3.2vw, 1.65rem)',
        lineHeight: '1.45',
        color: 'var(--text-primary)',
        marginBottom: '1.25rem',
        fontWeight: '600',
        overflowWrap: 'break-word',
        wordBreak: 'break-word'
      }}>
        "{current.quote}"
      </blockquote>

      {/* Core Lesson Summary */}
      <div style={{
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
        fontFamily: 'var(--font-sans)',
        paddingLeft: '0.75rem',
        borderLeft: '2px solid var(--accent-primary)',
        overflowWrap: 'break-word'
      }}>
        <strong>Key takeaway:</strong> {current.lesson}
      </div>

      {/* Reflection Prompt Accordion */}
      {showReflection && (
        <div style={{
          backgroundColor: 'var(--bg-tertiary)',
          padding: '1.15rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.35rem' }}>
            Today's Reflection Question
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
            "{current.reflection}"
          </div>
        </div>
      )}

      {/* Actions Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-color)',
        flexWrap: 'wrap',
        gap: '0.6rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowReflection(!showReflection)}
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            <BookOpen size={14} /> {showReflection ? 'Hide' : 'Reflect'}
          </button>

          <button
            onClick={() => setLiked(!liked)}
            className="btn btn-outline"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.8rem',
              color: liked ? '#E11D48' : 'var(--text-primary)',
              borderColor: liked ? '#FDA4AF' : 'var(--border-color)'
            }}
          >
            <Heart size={14} fill={liked ? '#E11D48' : 'none'} /> {liked ? 'Saved' : 'Save'}
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="btn btn-primary"
          style={{ padding: '0.45rem 0.95rem', fontSize: '0.8rem' }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied Lesson!' : 'Share Wisdom'}
        </button>
      </div>
    </div>
  );
}
