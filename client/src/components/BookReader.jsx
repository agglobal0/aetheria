import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
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
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Columns2,
  Square
} from 'lucide-react';

// Initialize PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

// Table of Contents for REFLECTIONS — Part 1
const BOOK_TOC = [
  { title: 'Front Cover', page: 1, chapter: 'Intro' },
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

// Synthesize a gentle, tactile paper rustle sound using Web Audio API (Zero assets required)
const playPageFlipSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);
    filter.Q.value = 1.2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch {
    // Graceful fallback if audio is blocked
  }
};

export default function BookReader({
  bookUrl = '/books/reflections-part-1.pdf',
  bookTitle = 'REFLECTIONS — Part 1',
  bookAuthor = 'Monika Chopra',
  initialPage = 1,
  onClose
}) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(82);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [isSpread, setIsSpread] = useState(true); // 2-page spread on desktop
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState('next'); // 'next' or 'prev'
  const [showToc, setShowToc] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);
  const canvasLeftRef = useRef(null);
  const canvasRightRef = useRef(null);
  const canvasSingleRef = useRef(null);

  // Auto-detect screen size: on mobile/small tablet default to single-page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 860) {
        setIsSpread(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Strict Content Protection: block context menu, drag, and print shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      // Escape to close
      if (e.key === 'Escape') {
        if (showToc) {
          setShowToc(false);
        } else if (onClose) {
          onClose();
        }
      }
      // Arrow navigation
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        turnNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        turnPrev();
      }
      // Prevent Save, Print, and Inspect shortcuts
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, totalPages, isSpread, showToc, onClose]);

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const loadingTask = pdfjsLib.getDocument({
      url: bookUrl,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.4.299/cmaps/',
      cMapPacked: true
    });

    loadingTask.promise
      .then((doc) => {
        if (!isCancelled) {
          setPdfDoc(doc);
          setTotalPages(doc.numPages);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error loading book PDF:', err);
        if (!isCancelled) {
          setError('Unable to load book. Please verify your connection and try again.');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [bookUrl]);

  // Render a specific page onto a canvas
  const renderPdfPage = useCallback(
    async (pageNumber, canvasElement) => {
      if (!pdfDoc || !canvasElement || pageNumber < 1 || pageNumber > totalPages) {
        if (canvasElement) {
          const ctx = canvasElement.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
        return;
      }

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const pixelRatio = window.devicePixelRatio || 1.5;
        // Base viewport scaled to standard reader dimensions
        const baseViewport = page.getViewport({ scale: 1 });
        
        // Target height calculation based on window
        const targetHeight = isSpread 
          ? Math.min(window.innerHeight * 0.76, 750) 
          : Math.min(window.innerHeight * 0.8, 850);
        
        const scale = (targetHeight / baseViewport.height) * zoom;
        const viewport = page.getViewport({ scale: scale * pixelRatio });

        canvasElement.width = viewport.width;
        canvasElement.height = viewport.height;
        canvasElement.style.width = `${viewport.width / pixelRatio}px`;
        canvasElement.style.height = `${viewport.height / pixelRatio}px`;

        const ctx = canvasElement.getContext('2d', { alpha: false });
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };

        await page.render(renderContext).promise;
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn(`Render page ${pageNumber} notice:`, err);
        }
      }
    },
    [pdfDoc, totalPages, zoom, isSpread]
  );

  // Re-render pages on page change, mode change, or zoom
  useEffect(() => {
    if (!pdfDoc || loading) return;

    if (isSpread) {
      // In 2-page spread:
      // Page 1 is the front cover (displayed on right side or solo)
      // Pages 2-3 are left & right, 4-5, etc.
      let leftP = currentPage;
      let rightP = currentPage + 1;

      // Special case: if on page 1 (cover), show cover centered or right
      if (currentPage === 1) {
        renderPdfPage(0, canvasLeftRef.current);
        renderPdfPage(1, canvasRightRef.current);
      } else {
        // Ensure even on left, odd on right for authentic book spine
        const normalizedLeft = currentPage % 2 === 0 ? currentPage : currentPage - 1;
        renderPdfPage(normalizedLeft, canvasLeftRef.current);
        renderPdfPage(normalizedLeft + 1 <= totalPages ? normalizedLeft + 1 : 0, canvasRightRef.current);
      }
    } else {
      // Single page view
      renderPdfPage(currentPage, canvasSingleRef.current);
    }
  }, [pdfDoc, currentPage, isSpread, zoom, loading, renderPdfPage, totalPages]);

  // Turn page actions with sound and CSS flip animation
  const turnNext = () => {
    if (isTurning) return;
    const increment = isSpread ? (currentPage === 1 ? 1 : 2) : 1;
    if (currentPage + increment <= totalPages + (isSpread ? 1 : 0)) {
      setTurnDirection('next');
      setIsTurning(true);
      if (soundEnabled) playPageFlipSound();

      setTimeout(() => {
        setCurrentPage((prev) => {
          const next = prev + (isSpread ? (prev === 1 ? 1 : 2) : 1);
          return Math.min(next, totalPages);
        });
        setIsTurning(false);
      }, 280);
    }
  };

  const turnPrev = () => {
    if (isTurning) return;
    const decrement = isSpread ? (currentPage === 2 ? 1 : 2) : 1;
    if (currentPage > 1) {
      setTurnDirection('prev');
      setIsTurning(true);
      if (soundEnabled) playPageFlipSound();

      setTimeout(() => {
        setCurrentPage((prev) => {
          const next = prev - (isSpread ? (prev <= 2 ? 1 : 2) : 1);
          return Math.max(1, next);
        });
        setIsTurning(false);
      }, 280);
    }
  };

  const jumpToPage = (p) => {
    const target = Math.max(1, Math.min(Number(p), totalPages));
    if (soundEnabled) playPageFlipSound();
    setCurrentPage(target);
    setShowToc(false);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Find active chapter title
  const currentTocEntry = BOOK_TOC.reduce((acc, item) => {
    if (currentPage >= item.page) return item;
    return acc;
  }, BOOK_TOC[0]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="ORAANIS Digital Book Reader"
      onContextMenu={(e) => { e.preventDefault(); return false; }}
      onDragStart={(e) => { e.preventDefault(); return false; }}
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
      {/* Print protection style injection */}
      <style>{`
        @media print {
          body * { display: none !important; }
        }
        .flipbook-spine-shadow {
          box-shadow: inset 18px 0 35px -10px rgba(11, 19, 43, 0.45);
        }
        .flipbook-left-spine {
          box-shadow: inset -18px 0 35px -10px rgba(11, 19, 43, 0.45);
        }
        .book-canvas-wrap {
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s ease;
        }
        .turning-next {
          transform: perspective(2200px) rotateY(-8deg) scale(0.985);
          opacity: 0.88;
        }
        .turning-prev {
          transform: perspective(2200px) rotateY(8deg) scale(0.985);
          opacity: 0.88;
        }
        .reader-btn:hover {
          background-color: #1C2541 !important;
          color: #F8FAFC !important;
          transform: translateY(-1px);
        }
        .reader-btn:active {
          transform: translateY(0);
        }
      `}</style>

      {/* =========================================================================
          TOP CONTROL BAR
          ========================================================================= */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.25rem',
          backgroundColor: '#0B132B',
          borderBottom: '1px solid #1C2541',
          zIndex: 10,
          flexShrink: 0,
          gap: '1rem'
        }}
      >
        {/* Left: Book Meta & Chapter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
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
            <BookOpen size={18} />
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: '600', color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {bookTitle}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '0.12rem 0.5rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(58, 80, 107, 0.4)',
                  color: '#A9BCD0',
                  border: '1px solid rgba(169, 188, 208, 0.25)',
                  whiteSpace: 'nowrap',
                  display: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
                className="desktop-only-badge"
              >
                {currentTocEntry.chapter}
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#A9BCD0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {bookAuthor} • <span style={{ fontStyle: 'italic' }}>{currentTocEntry.title}</span>
            </div>
          </div>
        </div>

        {/* Center: In-site Protected Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.28rem 0.75rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(28, 37, 65, 0.8)',
            border: '1px solid #3A506B',
            fontSize: '0.74rem',
            color: '#A9BCD0'
          }}
          title="Digital Rights Protected: Viewable exclusively on ORAANIS"
        >
          <ShieldCheck size={14} color="#A9BCD0" />
          <span style={{ whiteSpace: 'nowrap' }}>Exclusive Online Edition</span>
        </div>

        {/* Right: Controls & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          {/* Table of Contents button */}
          <button
            onClick={() => setShowToc(!showToc)}
            className="reader-btn"
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
            <List size={16} />
            <span style={{ display: 'none' }} className="desktop-btn-label">Contents</span>
          </button>

          {/* Spread / Single view toggle (hidden on mobile) */}
          <button
            onClick={() => setIsSpread(!isSpread)}
            className="reader-btn"
            title={isSpread ? 'Switch to Single Page' : 'Switch to 2-Page Spread'}
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
            {isSpread ? <Square size={16} /> : <Columns2 size={16} />}
          </button>

          {/* Zoom controls */}
          <div style={{ display: 'none', alignItems: 'center', border: '1px solid #3A506B', borderRadius: '6px', overflow: 'hidden' }} className="desktop-zoom-wrap">
            <button
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.15))}
              className="reader-btn"
              title="Zoom Out"
              style={{ background: 'transparent', border: 'none', color: '#A9BCD0', padding: '0.45rem', cursor: 'pointer' }}
            >
              <ZoomOut size={15} />
            </button>
            <span style={{ fontSize: '0.72rem', color: '#A9BCD0', padding: '0 0.35rem', minWidth: '40px', textAlign: 'center' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.75, z + 0.15))}
              className="reader-btn"
              title="Zoom In"
              style={{ background: 'transparent', border: 'none', color: '#A9BCD0', padding: '0.45rem', cursor: 'pointer' }}
            >
              <ZoomIn size={15} />
            </button>
          </div>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="reader-btn"
            title={soundEnabled ? 'Mute Page Flip Sound' : 'Enable Page Flip Sound'}
            style={{
              background: 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: soundEnabled ? '#A9BCD0' : '#64748b',
              padding: '0.45rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="reader-btn"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
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
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Close Reader */}
          {onClose && (
            <button
              onClick={onClose}
              className="reader-btn"
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
                transition: 'all 0.2s ease',
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
          MAIN READER STAGE / CANVAS AREA
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
              width: 'min(360px, 85vw)',
              backgroundColor: '#0B132B',
              borderRight: '1px solid #1C2541',
              zIndex: 30,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '8px 0 30px rgba(0,0,0,0.5)',
              animation: 'slideInLeft 0.25s ease'
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
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#F8FAFC', fontWeight: '600' }}>Table of Contents</h4>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.72rem', color: '#A9BCD0' }}>82 Pages • 8 Core Chapters</p>
              </div>
              <button
                onClick={() => setShowToc(false)}
                style={{ background: 'none', border: 'none', color: '#A9BCD0', cursor: 'pointer', padding: '0.25rem' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
              {BOOK_TOC.map((item, idx) => {
                const isActive = currentPage === item.page || (isSpread && currentPage + 1 === item.page);
                const isChapterHeader = item.title.startsWith('0') || item.chapter === 'Intro' || item.chapter === 'Closing';

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
                      marginBottom: '0.25rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: isActive ? '#1C2541' : 'transparent',
                      color: isActive ? '#F8FAFC' : '#A9BCD0',
                      fontWeight: isActive || isChapterHeader ? '600' : '400',
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
                        fontSize: '0.72rem',
                        padding: '0.1rem 0.4rem',
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

        {/* Previous page arrow button (clickable hover overlay) */}
        <button
          onClick={turnPrev}
          disabled={currentPage <= 1 || isTurning}
          title="Previous Page (Left Arrow)"
          aria-label="Previous Page"
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(28, 37, 65, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #3A506B',
            color: currentPage <= 1 ? '#475569' : '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
            opacity: currentPage <= 1 ? 0.3 : 0.9
          }}
          onMouseEnter={(e) => {
            if (currentPage > 1) {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.backgroundColor = '#1C2541';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = currentPage <= 1 ? '0.3' : '0.9';
            e.currentTarget.style.backgroundColor = 'rgba(28, 37, 65, 0.75)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next page arrow button (clickable hover overlay) */}
        <button
          onClick={turnNext}
          disabled={currentPage >= totalPages || isTurning}
          title="Next Page (Right Arrow / Spacebar)"
          aria-label="Next Page"
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(28, 37, 65, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #3A506B',
            color: currentPage >= totalPages ? '#475569' : '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
            opacity: currentPage >= totalPages ? 0.3 : 0.9
          }}
          onMouseEnter={(e) => {
            if (currentPage < totalPages) {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.backgroundColor = '#1C2541';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = currentPage >= totalPages ? '0.3' : '0.9';
            e.currentTarget.style.backgroundColor = 'rgba(28, 37, 65, 0.75)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Center: The Book Presentation Stage */}
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
          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  border: '3px solid #3A506B',
                  borderTopColor: '#A9BCD0',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  margin: '0 auto 1rem auto'
                }}
              />
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#A9BCD0' }}>Opening ORAANIS Reflections...</p>
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '420px' }}>
              <p style={{ color: '#f87171', fontSize: '0.95rem', marginBottom: '1rem' }}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#1C2541',
                  border: '1px solid #3A506B',
                  color: '#F8FAFC',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Reload
              </button>
            </div>
          )}

          {/* Book Canvas Container with 3D Book Appearance */}
          {!loading && !error && (
            <div
              className={`book-canvas-wrap ${isTurning ? (turnDirection === 'next' ? 'turning-next' : 'turning-prev') : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 25px 65px -15px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(58, 80, 107, 0.25)',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: '#1C2541',
                position: 'relative'
              }}
            >
              {isSpread ? (
                /* Two-Page Spread (Left & Right Pages with Realistic Center Spine Crease) */
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Left Page */}
                  <div
                    style={{
                      position: 'relative',
                      backgroundColor: currentPage === 1 ? '#0B132B' : '#FAF8F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={turnPrev}
                    title="Click left page to turn back"
                  >
                    <canvas
                      ref={canvasLeftRef}
                      style={{
                        display: 'block',
                        boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.08)'
                      }}
                    />
                    {/* Left Spine Fold Gradient */}
                    {currentPage > 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          right: 0,
                          width: '28px',
                          background: 'linear-gradient(to left, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)',
                          pointerEvents: 'none'
                        }}
                      />
                    )}
                  </div>

                  {/* Center Book Spine Divider */}
                  <div
                    style={{
                      width: '2px',
                      alignSelf: 'stretch',
                      backgroundColor: '#0B132B',
                      boxShadow: '0 0 6px rgba(0,0,0,0.6)',
                      zIndex: 5
                    }}
                  />

                  {/* Right Page */}
                  <div
                    style={{
                      position: 'relative',
                      backgroundColor: '#FAF8F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={turnNext}
                    title="Click right page to turn forward"
                  >
                    <canvas
                      ref={canvasRightRef}
                      style={{
                        display: 'block',
                        boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.08)'
                      }}
                    />
                    {/* Right Spine Fold Gradient */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: '28px',
                        background: 'linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>
                </div>
              ) : (
                /* Single Page Mode */
                <div
                  style={{
                    position: 'relative',
                    backgroundColor: '#FAF8F5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <canvas
                    ref={canvasSingleRef}
                    style={{
                      display: 'block'
                    }}
                  />
                  {/* Subtle paper edge shadow */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      boxShadow: 'inset 0 0 12px rgba(0,0,0,0.06)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              )}

              {/* Bottom Subtle Watermark Protection (Non-intrusive) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: 'rgba(28, 37, 65, 0.45)',
                  textTransform: 'uppercase',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  fontWeight: '500'
                }}
              >
                ORAANIS • Protected Digital Reader
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOTTOM SCRUBBER & NAVIGATION BAR
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
        {/* Scrubber slider and Page Number */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
          <button
            onClick={turnPrev}
            disabled={currentPage <= 1 || isTurning}
            className="reader-btn"
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

          {/* Range Slider for rapid scrubbing */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="range"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => jumpToPage(e.target.value)}
              aria-label="Book page slider"
              style={{
                width: '100%',
                accentColor: '#A9BCD0',
                cursor: 'pointer'
              }}
            />
            <span
              style={{
                fontSize: '0.8rem',
                color: '#F8FAFC',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                minWidth: '90px',
                textAlign: 'right'
              }}
            >
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={turnNext}
            disabled={currentPage >= totalPages || isTurning}
            className="reader-btn"
            style={{
              background: 'transparent',
              border: '1px solid #3A506B',
              borderRadius: '6px',
              color: currentPage >= totalPages ? '#475569' : '#A9BCD0',
              padding: '0.35rem 0.65rem',
              fontSize: '0.78rem',
              cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
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
            gap: '0.4rem',
            overflowX: 'auto',
            paddingBottom: '0.2rem',
            scrollbarWidth: 'none'
          }}
        >
          <span style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: '0.25rem' }}>
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
                background: currentPage === ch.p ? '#3A506B' : '#1C2541',
                border: 'none',
                borderRadius: '4px',
                color: currentPage === ch.p ? '#F8FAFC' : '#A9BCD0',
                padding: '0.2rem 0.5rem',
                fontSize: '0.68rem',
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
