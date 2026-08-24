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
