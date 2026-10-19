import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  BookOpen,
  List,
  LayoutGrid,
  Volume2,
  VolumeX,
  ShieldCheck,
  Columns2,
  Square
} from 'lucide-react';

// Table of Contents for REFLECTIONS — Part 1
const BOOK_TOC = [
  { title: 'Front Cover', page: 1, chapter: 'Cover' },
  { title: 'A Note to the Reader', page: 2, chapter: 'Intro' },
  { title: 'Ex Libris (This Book Belongs To)', page: 3, chapter: 'Intro' },
  { title: 'Title Page', page: 5, chapter: 'Intro' },
  { title: 'Dedication', page: 7, chapter: 'Intro' },
  { title: 'Table of Contents', page: 8, chapter: 'Intro' },
  { title: 'Before You Begin', page: 10, chapter: 'Intro' },
  { title: '01 — WITHIN', page: 11, chapter: 'Chapter 01' },
  { title: 'Most of All, I Have Learned', page: 12, chapter: 'Chapter 01' },
  { title: 'If I Could Live This Life Again', page: 13, chapter: 'Chapter 01' },
  { title: 'Not Everything Deserves Your Life', page: 14, chapter: 'Chapter 01' },
  { title: 'Let Your Soul Remain Gentle', page: 15, chapter: 'Chapter 01' },
  { title: 'A Pause — The Questions We Owe Ourselves', page: 16, chapter: 'Chapter 01' },
  { title: '02 — THE PEOPLE WE CARRY', page: 17, chapter: 'Chapter 02' },
  { title: 'Someone Lovingly Held Our Hand', page: 18, chapter: 'Chapter 02' },
  { title: 'The Shade We Never Outgrow', page: 19, chapter: 'Chapter 02' },
  { title: 'I Went to Her as a Child', page: 20, chapter: 'Chapter 02' },
  { title: 'The Day You Miss His Call', page: 22, chapter: 'Chapter 02' },
  { title: 'After 26 Years of Marriage', page: 23, chapter: 'Chapter 02' },
  { title: 'Love Does Not Own. It Sets Free.', page: 24, chapter: 'Chapter 02' },
  { title: 'When Friendship Needs No Scale', page: 25, chapter: 'Chapter 02' },
  { title: 'Some Bonds Never Leave Us', page: 26, chapter: 'Chapter 02' },
  { title: 'A Pause — The Imprint of a Bond', page: 27, chapter: 'Chapter 02' },
  { title: '03 — WHAT LIFE TAKES, WHAT IT LEAVES', page: 28, chapter: 'Chapter 03' },
  { title: 'The Fear of Losing Something', page: 29, chapter: 'Chapter 03' },
  { title: 'Healed Does Not Mean Forgotten', page: 30, chapter: 'Chapter 03' },
  { title: 'When the Past Knocks Again', page: 31, chapter: 'Chapter 03' },
  { title: 'When the Path Closes', page: 32, chapter: 'Chapter 03' },
  { title: 'The Cage Was Already Open', page: 33, chapter: 'Chapter 03' },
  { title: 'Walk On — Destination Still Unwritten', page: 34, chapter: 'Chapter 03' },
  { title: 'Every Moment Passes, Meaningful Moments Become Us', page: 35, chapter: 'Chapter 03' },
  { title: 'What Sorrow Is Asking of You', page: 36, chapter: 'Chapter 03' },
  { title: 'A Pause — The Meaning of What Remains', page: 37, chapter: 'Chapter 03' },
  { title: '04 — CHARACTER', page: 38, chapter: 'Chapter 04' },
  { title: 'A Good Person Does Not Have to Be Nice to Everyone', page: 39, chapter: 'Chapter 04' },
  { title: 'Don’t Confuse Conformity with Truth', page: 40, chapter: 'Chapter 04' },
  { title: 'When Agreement Ends, Character Begins', page: 41, chapter: 'Chapter 04' },
  { title: 'A Pause — When No One Is Keeping Score', page: 42, chapter: 'Chapter 04' },
  { title: '05 — POWER & HUMAN NATURE', page: 43, chapter: 'Chapter 05' },
  { title: 'When One Voice Needs a Crowd', page: 44, chapter: 'Chapter 05' },
  { title: 'Stop Looking for Angels', page: 45, chapter: 'Chapter 05' },
  { title: 'Do Not Confuse Ambition with Wisdom', page: 46, chapter: 'Chapter 05' },
  { title: 'On a Chessboard: Masters See Moves That Follow', page: 47, chapter: 'Chapter 05' },
  { title: 'When They Cannot See Your Vision', page: 48, chapter: 'Chapter 05' },
  { title: 'A Pause — The Nature Beneath the Position', page: 49, chapter: 'Chapter 05' },
  { title: '06 — BECOMING', page: 50, chapter: 'Chapter 06' },
  { title: 'Growth Changes Your Threshold for Proximity', page: 51, chapter: 'Chapter 06' },
  { title: 'When Breaking Becomes Becoming', page: 52, chapter: 'Chapter 06' },
  { title: 'When Losing Becomes Becoming', page: 53, chapter: 'Chapter 06' },
  { title: 'When Life Questions You', page: 54, chapter: 'Chapter 06' },
  { title: 'When Your Turn Comes', page: 55, chapter: 'Chapter 06' },
  { title: 'When the Storm Comes', page: 56, chapter: 'Chapter 06' },
  { title: 'A Pause — The Person Emerging from Experience', page: 57, chapter: 'Chapter 06' },
  { title: '07 — WISDOM', page: 58, chapter: 'Chapter 07' },
  { title: 'We Didn’t Lose Paradise, We Lost Wisdom to See It', page: 59, chapter: 'Chapter 07' },
  { title: 'Nothing Is Mine', page: 60, chapter: 'Chapter 07' },
  { title: 'Not Every Silence Is Empty', page: 61, chapter: 'Chapter 07' },
  { title: 'The Greater Miracle', page: 63, chapter: 'Chapter 07' },
  { title: 'Some Children Inherit Wealth. I Inherited a Vision.', page: 64, chapter: 'Chapter 07' },
  { title: 'He Lived Simply, But Stood Strongly', page: 65, chapter: 'Chapter 07' },
  { title: 'A Pause — What Understanding Cannot Possess', page: 68, chapter: 'Chapter 07' },
  { title: '08 — BEYOND THE OBVIOUS', page: 69, chapter: 'Chapter 08' },
  { title: 'When Did a Boy’s Tears Become a Threat to Manhood?', page: 70, chapter: 'Chapter 08' },
  { title: 'The Woman Between the Lines', page: 71, chapter: 'Chapter 08' },
  { title: 'Who Is Krishna?', page: 72, chapter: 'Chapter 08' },
  { title: 'A Pause — The Truth Beyond First Impressions', page: 73, chapter: 'Chapter 08' },
  { title: 'What Remains — A Closing Reflection', page: 74, chapter: 'Closing' },
  { title: 'About the Author — Monika Chopra', page: 75, chapter: 'Closing' },
  { title: 'About ORAANIS', page: 76, chapter: 'Closing' },
  { title: 'Publication Note (First Edition · 2026)', page: 77, chapter: 'Closing' },
  { title: 'The Journey Continues', page: 78, chapter: 'Closing' },
  { title: 'Monika Chopra — Back Photo Edition', page: 81, chapter: 'Closing' },
  { title: 'Back Cover', page: 82, chapter: 'Closing' }
];

const TOTAL_PAGES = 82;

// Real-time paper turn sound generator
const playPageFlipSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const bufferSize = ctx.sampleRate * 0.14;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(850, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.14);
    filter.Q.value = 1.3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch {
    // Ignore audio errors
  }
};

export default function BookReader({
  bookTitle = 'REFLECTIONS — Part 1',
  bookAuthor = 'Monika Chopra',
  initialPage = 1,
  onClose
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoom, setZoom] = useState(1);
  const [isSpread, setIsSpread] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const [showToc, setShowToc] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);

  // Auto-detect mobile screen: default to single page mode
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 880) {
        setIsSpread(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation & anti-copy shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showThumbnails) setShowThumbnails(false);
        else if (showToc) setShowToc(false);
        else if (onClose) onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        turnNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        turnPrev();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isSpread, showToc, showThumbnails, onClose]);

  // Turn Next Page
  const turnNext = () => {
    if (isFlipping) return;
    const step = isSpread ? (currentPage === 1 ? 1 : 2) : 1;
    if (currentPage + step <= TOTAL_PAGES + (isSpread ? 1 : 0)) {
      setFlipDirection('next');
      setIsFlipping(true);
      if (soundEnabled) playPageFlipSound();

      setTimeout(() => {
        setCurrentPage((prev) => {
          const next = prev + (isSpread ? (prev === 1 ? 1 : 2) : 1);
          return Math.min(next, TOTAL_PAGES);
        });
        setIsFlipping(false);
      }, 260);
    }
  };

  // Turn Previous Page
  const turnPrev = () => {
    if (isFlipping) return;
    const step = isSpread ? (currentPage === 2 ? 1 : 2) : 1;
    if (currentPage > 1) {
      setFlipDirection('prev');
      setIsFlipping(true);
      if (soundEnabled) playPageFlipSound();

      setTimeout(() => {
        setCurrentPage((prev) => {
          const next = prev - (isSpread ? (prev <= 2 ? 1 : 2) : 1);
          return Math.max(1, next);
        });
        setIsFlipping(false);
      }, 260);
    }
  };

  // Jump to specific page
  const jumpToPage = (target) => {
    const p = Math.max(1, Math.min(Number(target), TOTAL_PAGES));
    if (soundEnabled) playPageFlipSound();
    setCurrentPage(p);
    setShowToc(false);
    setShowThumbnails(false);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Active chapter
  const activeToc = BOOK_TOC.reduce((acc, item) => {
    if (currentPage >= item.page) return item;
    return acc;
  }, BOOK_TOC[0]);

  // Helper for 2-page spread page numbers
  const leftPageNum = currentPage === 1 ? null : (currentPage % 2 === 0 ? currentPage : currentPage - 1);
  const rightPageNum = currentPage === 1 ? 1 : (leftPageNum ? leftPageNum + 1 : null);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="ORAANIS Digital Book Reader"
      onContextMenu={(e) => { e.preventDefault(); return false; }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0B132B',
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overflow: 'hidden',
        fontFamily: 'var(--font-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)'
      }}
    >
      {/* Protection & Animations */}
      <style>{`
        @media print {
          body * { display: none !important; }
        }
        .reader-anim-box {
          transition: transform 0.26s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.26s ease;
        }
        .anim-flip-next {
          transform: perspective(2400px) rotateY(-7deg) scale(0.985);
          opacity: 0.9;
        }
        .anim-flip-prev {
          transform: perspective(2400px) rotateY(7deg) scale(0.985);
          opacity: 0.9;
        }
        .book-reader-btn:hover {
          background-color: #1C2541 !important;
          color: #F8FAFC !important;
          transform: translateY(-1px);
        }
        .book-page-img {
          display: block;
          max-height: clamp(480px, 78vh, 850px);
          width: auto;
          height: auto;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }
      `}</style>

      {/* =========================================================================
          TOP TOOLBAR
          ========================================================================= */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.25rem',
          backgroundColor: '#0B132B',
          borderBottom: '1px solid #1C2541',
          zIndex: 20,
          flexShrink: 0,
          gap: '1rem'
        }}
      >
        {/* Left: Book Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#1C2541',
              border: '1px solid #3A506B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#A9BCD0',
              flexShrink: 0
            }}
          >
            <BookOpen size={17} />
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#F8FAFC', whiteSpace: 'nowrap' }}>
                {bookTitle}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '0.12rem 0.5rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(58, 80, 107, 0.4)',
                  color: '#A9BCD0',
                  border: '1px solid rgba(169, 188, 208, 0.25)',
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {activeToc.chapter}
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#A9BCD0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {bookAuthor} • <span style={{ fontStyle: 'italic' }}>{activeToc.title}</span>
            </div>
          </div>
        </div>

        {/* Center: Protected Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.28rem 0.8rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(28, 37, 65, 0.85)',
            border: '1px solid #3A506B',
            fontSize: '0.74rem',
            color: '#A9BCD0'
          }}
          title="Digital Rights Protected: Viewable exclusively on ORAANIS"
        >
          <ShieldCheck size={14} color="#A9BCD0" />
          <span style={{ whiteSpace: 'nowrap' }}>Exclusive Online Edition</span>
        </div>

        {/* Right: Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          {/* All Pages Thumbnail Grid Drawer Toggle */}
          <button
            onClick={() => { setShowThumbnails(!showThumbnails); setShowToc(false); }}
            className="book-reader-btn"
            title="View All 82 Pages (Thumbnail Grid)"
            style={{
              background: showThumbnails ? '#1C2541' : 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: showThumbnails ? '#F8FAFC' : '#A9BCD0',
              padding: '0.45rem 0.65rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <LayoutGrid size={15} />
            <span style={{ whiteSpace: 'nowrap' }}>All Pages</span>
          </button>

          {/* Table of Contents Toggle */}
          <button
            onClick={() => { setShowToc(!showToc); setShowThumbnails(false); }}
            className="book-reader-btn"
            title="Table of Contents"
            style={{
              background: showToc ? '#1C2541' : 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: showToc ? '#F8FAFC' : '#A9BCD0',
              padding: '0.45rem 0.65rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <List size={15} />
            <span style={{ whiteSpace: 'nowrap' }}>Contents</span>
          </button>

          {/* Spread / Single View Toggle */}
          <button
            onClick={() => setIsSpread(!isSpread)}
            className="book-reader-btn"
            title={isSpread ? 'Switch to Single Page Mode' : 'Switch to 2-Page Book Spread'}
            style={{
              background: 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: '#A9BCD0',
              padding: '0.45rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isSpread ? <Square size={15} /> : <Columns2 size={15} />}
          </button>

          {/* Zoom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #3A506B', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.15))}
              className="book-reader-btn"
              title="Zoom Out"
              style={{ background: 'transparent', border: 'none', color: '#A9BCD0', padding: '0.45rem', cursor: 'pointer' }}
            >
              <ZoomOut size={14} />
            </button>
            <span style={{ fontSize: '0.72rem', color: '#A9BCD0', padding: '0 0.3rem', minWidth: '38px', textAlign: 'center' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, z + 0.15))}
              className="book-reader-btn"
              title="Zoom In"
              style={{ background: 'transparent', border: 'none', color: '#A9BCD0', padding: '0.45rem', cursor: 'pointer' }}
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="book-reader-btn"
            title={soundEnabled ? 'Mute Page Turn Sound' : 'Enable Page Turn Sound'}
            style={{
              background: 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: soundEnabled ? '#A9BCD0' : '#64748b',
              padding: '0.45rem',
              cursor: 'pointer'
            }}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="book-reader-btn"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            style={{
              background: 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: '#A9BCD0',
              padding: '0.45rem',
              cursor: 'pointer'
            }}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          {/* Close */}
          {onClose && (
            <button
              onClick={onClose}
              className="book-reader-btn"
              title="Close Reader (Esc)"
              style={{
                background: '#1C2541',
                border: '1px solid #3A506B',
                borderRadius: '6px',
                color: '#F8FAFC',
                padding: '0.45rem 0.65rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginLeft: '0.25rem'
              }}
            >
              <X size={16} />
              <span>Close</span>
            </button>
          )}
        </div>
      </header>

      {/* =========================================================================
          STAGE CONTAINER (PAGES / SPREAD / DRAWER)
          ========================================================================= */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#070C1A',
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(28, 37, 65, 0.45) 0%, rgba(7, 12, 26, 0.95) 80%)'
        }}
      >
        {/* Table of Contents Drawer */}
        {showToc && (
          <aside
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: 'min(380px, 85vw)',
              backgroundColor: '#0B132B',
              borderRight: '1px solid #1C2541',
              zIndex: 35,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '8px 0 35px rgba(0,0,0,0.6)',
              animation: 'slideInLeft 0.22s ease'
            }}
          >
            <div
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid #1C2541',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#F8FAFC', fontWeight: '700' }}>Table of Contents</h4>
                <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.72rem', color: '#A9BCD0' }}>82 Pages • 8 Core Chapters</p>
              </div>
              <button
                onClick={() => setShowToc(false)}
                style={{ background: 'none', border: 'none', color: '#A9BCD0', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
              {BOOK_TOC.map((item, idx) => {
                const isActive = currentPage === item.page || (isSpread && rightPageNum === item.page);
                const isHeading = item.title.startsWith('0') || item.chapter === 'Cover' || item.chapter === 'Closing';

                return (
                  <button
                    key={idx}
                    onClick={() => jumpToPage(item.page)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.55rem 0.75rem',
                      marginBottom: '0.2rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: isActive ? '#1C2541' : 'transparent',
                      color: isActive ? '#F8FAFC' : (isHeading ? '#F8FAFC' : '#A9BCD0'),
                      fontWeight: isActive || isHeading ? '700' : '400',
                      fontSize: '0.82rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(28, 37, 65, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '0.5rem' }}>
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '4px',
                        backgroundColor: isActive ? '#3A506B' : 'rgba(28, 37, 65, 0.6)',
                        color: '#F8FAFC',
                        flexShrink: 0
                      }}
                    >
                      p. {item.page}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* All Pages Thumbnail Grid Drawer (Shows all 82 pages at once) */}
        {showThumbnails && (
          <aside
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(11, 19, 43, 0.97)',
              backdropFilter: 'blur(12px)',
              zIndex: 35,
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem 2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #1C2541', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#F8FAFC' }}>All 82 Pages of Reflections</h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#A9BCD0' }}>Click any page to jump immediately</p>
              </div>
              <button
                onClick={() => setShowThumbnails(false)}
                style={{
                  background: '#1C2541',
                  border: '1px solid #3A506B',
                  borderRadius: '6px',
                  color: '#F8FAFC',
                  padding: '0.4rem 0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
                <span>Close Grid</span>
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '1rem',
                padding: '0.5rem 0'
              }}
            >
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pNum) => {
                const isCurrent = currentPage === pNum || (isSpread && (leftPageNum === pNum || rightPageNum === pNum));
                return (
                  <div
                    key={pNum}
                    onClick={() => jumpToPage(pNum)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: isCurrent ? '2px solid #D4AF37' : '1px solid #1C2541',
                      boxShadow: isCurrent ? '0 0 14px rgba(212, 175, 55, 0.4)' : '0 4px 10px rgba(0,0,0,0.3)',
                      backgroundColor: '#1C2541',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.borderColor = '#A9BCD0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = isCurrent ? '#D4AF37' : '#1C2541';
                    }}
                  >
                    <img
                      src={`/books/reflections/page-${pNum}.jpg`}
                      alt={`Page ${pNum}`}
                      loading="lazy"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                    <div
                      style={{
                        padding: '0.3rem',
                        textAlign: 'center',
                        fontSize: '0.72rem',
                        color: isCurrent ? '#D4AF37' : '#A9BCD0',
                        fontWeight: isCurrent ? '700' : '500'
                      }}
                    >
                      Page {pNum}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* Previous Page Floating Button */}
        <button
          onClick={turnPrev}
          disabled={currentPage <= 1 || isFlipping}
          title="Previous Page (Left Arrow)"
          aria-label="Previous Page"
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 25,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(28, 37, 65, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #3A506B',
            color: currentPage <= 1 ? '#475569' : '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
            transition: 'all 0.2s ease',
            opacity: currentPage <= 1 ? 0.25 : 0.95
          }}
          onMouseEnter={(e) => {
            if (currentPage > 1) {
              e.currentTarget.style.backgroundColor = '#1C2541';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(28, 37, 65, 0.8)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Page Floating Button */}
        <button
          onClick={turnNext}
          disabled={currentPage >= TOTAL_PAGES || isFlipping}
          title="Next Page (Right Arrow)"
          aria-label="Next Page"
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 25,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(28, 37, 65, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #3A506B',
            color: currentPage >= TOTAL_PAGES ? '#475569' : '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage >= TOTAL_PAGES ? 'not-allowed' : 'pointer',
            boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
            transition: 'all 0.2s ease',
            opacity: currentPage >= TOTAL_PAGES ? 0.25 : 0.95
          }}
          onMouseEnter={(e) => {
            if (currentPage < TOTAL_PAGES) {
              e.currentTarget.style.backgroundColor = '#1C2541';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(28, 37, 65, 0.8)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* =========================================================================
            BOOK PRESENTATION CANVAS / STAGE
            ========================================================================= */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem clamp(1rem, 5vw, 4rem)',
            position: 'relative'
          }}
        >
          <div
            className={`reader-anim-box ${isFlipping ? (flipDirection === 'next' ? 'anim-flip-next' : 'anim-flip-prev') : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease'
            }}
          >
            {/* Case A: Page 1 Cover (Centred like a physical closed hardcover book) */}
            {currentPage === 1 ? (
              <div
                onClick={turnNext}
                title="Click cover to open book"
                style={{
                  position: 'relative',
                  borderRadius: '6px 12px 12px 6px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(212, 175, 55, 0.35)',
                  cursor: 'pointer',
                  border: '1px solid #7D2D44'
                }}
              >
                <img
                  src="/books/reflections/page-1.jpg"
                  alt="REFLECTIONS Part 1 Cover"
                  className="book-page-img"
                  style={{
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3)'
                  }}
                />
                {/* Book Spine Crease Gradient */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '28px',
                    background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.3) 100%)',
                    pointerEvents: 'none'
                  }}
                />
                {/* Floating "Click to Open" badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(11, 19, 43, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#F8FAFC',
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.74rem',
                    fontWeight: '700',
                    border: '1px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <BookOpen size={13} color="#D4AF37" />
                  <span>Click to Open & Read Inside</span>
                </div>
              </div>
            ) : isSpread ? (
              /* Case B: Two-Page Spread (Open book on desktop) */
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(58, 80, 107, 0.35)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  backgroundColor: '#1C2541'
                }}
              >
                {/* Left Page */}
                {leftPageNum && leftPageNum <= TOTAL_PAGES ? (
                  <div
                    onClick={turnPrev}
                    title="Click left page to turn back"
                    style={{ position: 'relative', cursor: 'pointer', backgroundColor: '#FAF8F5' }}
                  >
                    <img
                      src={`/books/reflections/page-${leftPageNum}.jpg`}
                      alt={`Page ${leftPageNum}`}
                      className="book-page-img"
                    />
                    {/* Left Spine Fold Shadow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: '32px',
                        background: 'linear-gradient(to left, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0) 100%)',
                        pointerEvents: 'none'
                      }}
                    />
                    {/* Page Number Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '12px',
                        fontSize: '0.68rem',
                        color: 'rgba(0,0,0,0.45)',
                        fontWeight: '600',
                        pointerEvents: 'none'
                      }}
                    >
                      {leftPageNum}
                    </div>
                  </div>
                ) : null}

                {/* Center Book Spine Crease Divider */}
                <div
                  style={{
                    width: '3px',
                    alignSelf: 'stretch',
                    backgroundColor: '#070C1A',
                    boxShadow: '0 0 8px rgba(0,0,0,0.8)',
                    zIndex: 5
                  }}
                />

                {/* Right Page */}
                {rightPageNum && rightPageNum <= TOTAL_PAGES ? (
                  <div
                    onClick={turnNext}
                    title="Click right page to turn forward"
                    style={{ position: 'relative', cursor: 'pointer', backgroundColor: '#FAF8F5' }}
                  >
                    <img
                      src={`/books/reflections/page-${rightPageNum}.jpg`}
                      alt={`Page ${rightPageNum}`}
                      className="book-page-img"
                    />
                    {/* Right Spine Fold Shadow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: '32px',
                        background: 'linear-gradient(to right, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0) 100%)',
                        pointerEvents: 'none'
                      }}
                    />
                    {/* Page Number Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '12px',
                        fontSize: '0.68rem',
                        color: 'rgba(0,0,0,0.45)',
                        fontWeight: '600',
                        pointerEvents: 'none'
                      }}
                    >
                      {rightPageNum}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              /* Case C: Single Page Mode */
              <div
                style={{
                  position: 'relative',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 65px -15px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(58, 80, 107, 0.35)',
                  backgroundColor: '#FAF8F5'
                }}
              >
                <img
                  src={`/books/reflections/page-${currentPage}.jpg`}
                  alt={`Page ${currentPage}`}
                  className="book-page-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '12px',
                    fontSize: '0.68rem',
                    color: 'rgba(0,0,0,0.45)',
                    fontWeight: '600',
                    pointerEvents: 'none'
                  }}
                >
                  {currentPage}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM SCRUBBER & JUMP BAR
          ========================================================================= */}
      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0B132B',
          borderTop: '1px solid #1C2541',
          padding: '0.65rem 1.25rem',
          gap: '0.5rem',
          flexShrink: 0
        }}
      >
        {/* Slider & Prev/Next */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '820px', width: '100%', margin: '0 auto' }}>
          <button
            onClick={turnPrev}
            disabled={currentPage <= 1 || isFlipping}
            className="book-reader-btn"
            style={{
              background: 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: currentPage <= 1 ? '#475569' : '#A9BCD0',
              padding: '0.35rem 0.65rem',
              fontSize: '0.78rem',
              cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            ← Prev
          </button>

          {/* Rapid scrubber slider */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="range"
              min="1"
              max={TOTAL_PAGES}
              value={currentPage}
              onChange={(e) => jumpToPage(e.target.value)}
              aria-label="Book page slider"
              style={{
                width: '100%',
                accentColor: '#D4AF37',
                cursor: 'pointer'
              }}
            />
            <span
              style={{
                fontSize: '0.82rem',
                color: '#F8FAFC',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                minWidth: '95px',
                textAlign: 'right'
              }}
            >
              Page {currentPage} of {TOTAL_PAGES}
            </span>
          </div>

          <button
            onClick={turnNext}
            disabled={currentPage >= TOTAL_PAGES || isFlipping}
            className="book-reader-btn"
            style={{
              background: 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: currentPage >= TOTAL_PAGES ? '#475569' : '#A9BCD0',
              padding: '0.35rem 0.65rem',
              fontSize: '0.78rem',
              cursor: currentPage >= TOTAL_PAGES ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Next →
          </button>
        </div>

        {/* Quick Chapter Shortcuts */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            overflowX: 'auto',
            paddingBottom: '0.2rem',
            scrollbarWidth: 'none'
          }}
        >
          <span style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: '0.2rem' }}>
            Jump to:
          </span>
          {[
            { label: 'Cover', p: 1 },
            { label: 'Dedication', p: 7 },
            { label: '01 Within', p: 11 },
            { label: '02 People', p: 17 },
            { label: '03 Takes/Leaves', p: 28 },
            { label: '04 Character', p: 38 },
            { label: '05 Power', p: 43 },
            { label: '06 Becoming', p: 50 },
            { label: '07 Wisdom', p: 58 },
            { label: '08 Beyond', p: 69 },
            { label: 'Closing', p: 74 },
            { label: 'Author', p: 81 }
          ].map((ch, idx) => (
            <button
              key={idx}
              onClick={() => jumpToPage(ch.p)}
              style={{
                background: currentPage === ch.p ? '#D4AF37' : '#1C2541',
                border: 'none',
                borderRadius: '4px',
                color: currentPage === ch.p ? '#0B132B' : '#A9BCD0',
                padding: '0.2rem 0.5rem',
                fontSize: '0.68rem',
                fontWeight: currentPage === ch.p ? '700' : '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
