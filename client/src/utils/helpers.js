export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function calculateReadingTime(text) {
  if (!text) return 3;
  const wordsPerMinute = 200;
  const cleanText = text.replace(/<[^>]*>?/gm, '');
  const wordCount = cleanText.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function extractHeadings(htmlContent) {
  if (!htmlContent) return [];
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const headings = [];
  let match;
  let index = 0;

  while ((match = regex.exec(htmlContent)) !== null) {
    const rawText = match[1].replace(/<[^>]*>?/gm, '').trim();
    const id = `heading-${index++}-${slugify(rawText)}`;
    headings.push({ id, text: rawText });
  }

  return headings;
}

/**
 * Smartly formats essay and blog content to preserve exact user formatting.
 * Handles plain text, markdown, mixed text, and existing HTML.
 */
export function formatEssayContent(rawContent, essayTitle = '') {
  if (!rawContent) return '';

  const trimmed = rawContent.trim();
  
  // If it is already a fully formed HTML document with surrounding <p> or <section> tags
  // check if it has multiple <p> tags
  const pTagCount = (trimmed.match(/<p[^>]*>/gi) || []).length;
  const hasMultipleHtmlBlocks = pTagCount >= 2;

  if (hasMultipleHtmlBlocks) {
    return trimmed;
  }

  // Normalize line endings
  const normalized = trimmed.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rawBlocks = normalized.split(/\n{2,}/);
  const formattedBlocks = [];

  const cleanTitle = (essayTitle || '').trim().toLowerCase();

  for (let i = 0; i < rawBlocks.length; i++) {
    let block = rawBlocks[i].trim();
    if (!block) continue;

    // Check if first block is a redundant duplicate title
    if (i === 0 && cleanTitle) {
      const blockLower = block.toLowerCase().replace(/^[#\s]+/, '').trim();
      if (blockLower === cleanTitle) {
        continue;
      }
    }

    // If block is already an HTML block element (e.g. <figure>, <blockquote class="...", <h2>, <div)
    if (/^<(figure|blockquote|div|table|section|article|ul|ol|h[1-6]|p)[^>]*>[\s\S]*<\/\1>$/i.test(block) ||
        /^<(figure|blockquote|div|table|section|article|ul|ol|h[1-6]|p)[^>]*>/i.test(block)) {
      formattedBlocks.push(block);
      continue;
    }

    // Author signoff at bottom (e.g. "— RAJSAAR", "— Monika Chopra", "- Monika", "— RAJSAAR.")
    if (/^[—–-]{1,2}\s*[A-Z\s.]+$/i.test(block) || /^[—–-]{1,2}\s*(RAJSAAR|Monika Chopra|Monika|Author|Editorial)/i.test(block)) {
      formattedBlocks.push(`<div class="editorial-signoff"><strong>${block}</strong></div>`);
      continue;
    }

    // Headings
    if (block.startsWith('### ')) {
      formattedBlocks.push(`<h3>${block.slice(4).trim()}</h3>`);
      continue;
    }
    if (block.startsWith('## ')) {
      formattedBlocks.push(`<h2>${block.slice(3).trim()}</h2>`);
      continue;
    }
    if (block.startsWith('# ')) {
      formattedBlocks.push(`<h2>${block.slice(2).trim()}</h2>`);
      continue;
    }

    // Blockquote / Pull quote
    if (block.startsWith('> ')) {
      formattedBlocks.push(`<blockquote class="editorial-quote">${block.slice(2).trim()}</blockquote>`);
      continue;
    }

    // Bullet lists
    const lines = block.split('\n');
    const isBulletList = lines.length > 1 && lines.every(l => /^\s*[-*•]\s+/.test(l));
    const isNumList = lines.length > 1 && lines.every(l => /^\s*\d+\.\s+/.test(l));

    if (isBulletList) {
      const items = lines.map(l => `<li>${l.replace(/^\s*[-*•]\s+/, '').trim()}</li>`).join('');
      formattedBlocks.push(`<ul>${items}</ul>`);
      continue;
    }
    if (isNumList) {
      const items = lines.map(l => `<li>${l.replace(/^\s*\d+\.\s+/, '').trim()}</li>`).join('');
      formattedBlocks.push(`<ol>${items}</ol>`);
      continue;
    }

    // Normal paragraph with inline formatting and line breaks
    let pContent = block
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');

    formattedBlocks.push(`<p>${pContent}</p>`);
  }

  return formattedBlocks.join('\n\n');
}

