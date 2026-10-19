import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://oraanis.com';
const DEFAULT_TITLE = 'ORAANIS — Where Experience Becomes Wisdom | Monika Chopra';
const DEFAULT_DESC = 'ORAANIS is a quiet editorial space for thoughtful reflections on life, human behaviour, emotional intelligence, ethics, relationships, and the changing relationship between technology and humanity.';
const DEFAULT_IMAGE = 'https://oraanis.com/monika_chopra_portrait.png';

/**
 * Universal SEO component for ORAANIS
 * Updates document.title, meta description, canonical URL, OpenGraph, and Twitter tags dynamically
 */
export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  author = 'Monika Chopra',
  publishedTime,
  modifiedTime,
  keywords,
  schema
}) {
  const location = useLocation();

  const fullTitle = title 
    ? (title.includes('ORAANIS') ? title : `${title} — ORAANIS`)
    : DEFAULT_TITLE;

  const fullDesc = description || DEFAULT_DESC;

  // Resolve canonical path
  const canonicalPath = canonical || location.pathname;
  const canonicalUrl = canonicalPath.startsWith('http') 
    ? canonicalPath 
    : `${BASE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`;

  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper function to set or create meta tag
    const setMeta = (attributeName, attributeValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMeta('name', 'title', fullTitle);
    setMeta('name', 'description', fullDesc);
    if (keywords) setMeta('name', 'keywords', keywords);

    // 3. Open Graph / Facebook
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', fullDesc);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'ORAANIS');

    // 4. Twitter Card
    setMeta('property', 'twitter:card', 'summary_large_image');
    setMeta('property', 'twitter:title', fullTitle);
    setMeta('property', 'twitter:description', fullDesc);
    setMeta('property', 'twitter:url', canonicalUrl);
    setMeta('property', 'twitter:image', imageUrl);

    // 5. Canonical Link Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Structured Data Schema
    let scriptSchema = document.getElementById('route-structured-data');
    if (!scriptSchema) {
      scriptSchema = document.createElement('script');
      scriptSchema.id = 'route-structured-data';
      scriptSchema.type = 'application/ld+json';
      document.head.appendChild(scriptSchema);
    }

    const defaultSchema = type === 'article' ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': title || fullTitle,
      'description': fullDesc,
      'image': [imageUrl],
      'datePublished': publishedTime || new Date().toISOString(),
      'dateModified': modifiedTime || publishedTime || new Date().toISOString(),
      'author': {
        '@type': 'Person',
        'name': author,
        'url': author.toLowerCase().includes('rajsaar') ? `${BASE_URL}/rajsaar` : `${BASE_URL}/person-behind-this`
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'ORAANIS',
        'url': BASE_URL,
        'logo': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}/favicon.svg`
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    } : {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': fullTitle,
      'description': fullDesc,
      'url': canonicalUrl,
      'publisher': {
        '@type': 'Person',
        'name': 'Monika Chopra'
      }
    };

    scriptSchema.textContent = JSON.stringify(schema || defaultSchema);

  }, [fullTitle, fullDesc, canonicalUrl, imageUrl, type, author, publishedTime, modifiedTime, keywords, schema]);

  return null;
}
