import React, { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';
import { TwitterIcon, LinkedinIcon, FacebookIcon } from './SocialIcons';

export default function SocialShare({ title, url }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this essay on ORAANIS';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', color: 'var(--text-muted)' }}>
        Share
      </span>
      
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        style={{
          display: 'inline-flex',
          padding: '0.5rem',
          borderRadius: '50%',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <TwitterIcon size={15} />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        style={{
          display: 'inline-flex',
          padding: '0.5rem',
          borderRadius: '50%',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <LinkedinIcon size={15} />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        style={{
          display: 'inline-flex',
          padding: '0.5rem',
          borderRadius: '50%',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <FacebookIcon size={15} />
      </a>

      <button
        onClick={handleCopy}
        aria-label="Copy article link"
        title="Copy article link"
        style={{
          display: 'inline-flex',
          padding: '0.5rem',
          borderRadius: '50%',
          border: '1px solid var(--border-color)',
          color: copied ? 'var(--accent-technology)' : 'var(--text-primary)',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        {copied ? <Check size={15} /> : <LinkIcon size={15} />}
      </button>
    </div>
  );
}
