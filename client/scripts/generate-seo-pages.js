import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error('[SEO Generator] Error: dist/index.html not found. Please run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf-8');

const routes = [
  {
    path: 'about',
    title: 'About ORAANIS — Bringing Inner Stories Into the Light',
    description: 'Discover the philosophy behind ORAANIS: a quiet space to pause, read, reflect, and understand what life and human experience quietly teach us.',
    canonical: 'https://oraanis.com/about'
  },
  {
    path: 'books',
    title: 'Books & Publications — REFLECTIONS Part 1 | Monika Chopra | ORAANIS',
    description: 'Read REFLECTIONS — Part 1: On life, people, and the quiet lessons that shape us by Monika Chopra. An interactive, animated digital publication available exclusively on ORAANIS.',
    canonical: 'https://oraanis.com/books'
  },
  {
    path: 'blogs',
    title: 'Reflective Blogs & Everyday Lessons — ORAANIS | Monika Chopra',
    description: 'Conversational reflections, daily observations, and practical wisdom by Monika Chopra on human relationships, empathy, and navigating life’s subtle moments.',
    canonical: 'https://oraanis.com/blogs'
  },
  {
    path: 'essays',
    title: 'Academic & Philosophical Essays — ORAANIS | Thoughtful Discourses',
    description: 'Long-form, structured scholarly discourses exploring moral philosophy, human nature, ethical frameworks, and societal transformations by Monika Chopra and RAJSAAR.',
    canonical: 'https://oraanis.com/essays'
  },
  {
    path: 'rajsaar',
    title: 'RAJSAAR — A Different Angle or a Revolving Mirror | ORAANIS',
    description: 'Perspectives by RAJSAAR: an educator, mentor, and academic leader deciphering the subtle layers between perception, human nature, and reality.',
    canonical: 'https://oraanis.com/rajsaar'
  },
  {
    path: 'person-behind-this',
    title: 'Monika Chopra — Educator, Observer & Founder of ORAANIS',
    description: 'Meet Monika Chopra: an educator, mentor, and writer who created ORAANIS to give everyday observations, emotional wisdom, and unspoken reflections a thoughtful space.',
    canonical: 'https://oraanis.com/person-behind-this'
  },
  {
    path: 'author',
    title: 'Monika Chopra — Educator, Observer & Founder of ORAANIS',
    description: 'Meet Monika Chopra: an educator, mentor, and writer who created ORAANIS to give everyday observations, emotional wisdom, and unspoken reflections a thoughtful space.',
    canonical: 'https://oraanis.com/author'
  },
  {
    path: 'share',
    title: 'Share Your Perspective — Real Lived Wisdom | ORAANIS',
    description: 'A quiet, safe platform to read and contribute reflections, confessions, and life lessons anonymously or with your name.',
    canonical: 'https://oraanis.com/share'
  },
  {
    path: 'contact',
    title: 'Contact ORAANIS — Get in Touch with Monika Chopra & RAJSAAR',
    description: 'Reach out to the ORAANIS editorial team for reflections, inquiries, feedback, and thoughtful correspondence.',
    canonical: 'https://oraanis.com/contact'
  },
  {
    path: 'category/reflections',
    title: 'Reflections & Quiet Contemplation — ORAANIS',
    description: 'Thoughtful examinations of time, personal growth, quiet wisdom, and life reflections.',
    canonical: 'https://oraanis.com/category/reflections'
  },
  {
    path: 'category/emotional-intelligence',
    title: 'Emotional Intelligence & Human Nature — ORAANIS',
    description: 'Exploring psychology, human nature, empathy, social dynamics, and self-awareness.',
    canonical: 'https://oraanis.com/category/emotional-intelligence'
  },
  {
    path: 'category/healing',
    title: 'Healing, Resilience & Inner Peace — ORAANIS',
    description: 'Nurturing resilience, emotional recovery, self-forgiveness, and inner peace.',
    canonical: 'https://oraanis.com/category/healing'
  },
  {
    path: 'category/wisdom',
    title: 'Wisdom, Ethics & Enduring Life Lessons — ORAANIS',
    description: 'Timeless insights, moral integrity, ethics, and enduring human life lessons.',
    canonical: 'https://oraanis.com/category/wisdom'
  },
  {
    path: 'category/spirituality',
    title: 'Spirituality & Quiet Consciousness — ORAANIS',
    description: 'Meditations on purpose, transcendence, quiet consciousness, and inner depth.',
    canonical: 'https://oraanis.com/category/spirituality'
  },
  {
    path: 'category/technology',
    title: 'Technology & Humanity — ORAANIS',
    description: 'Reflections on the evolving balance between humanity and the digital world.',
    canonical: 'https://oraanis.com/category/technology'
  }
];

console.log(`[SEO Generator] Generating ${routes.length} pre-rendered SEO pages...`);

routes.forEach(route => {
  let customHtml = baseHtml;

  // 1. Replace title
  customHtml = customHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${route.title}</title>`
  );

  // 2. Replace meta title
  customHtml = customHtml.replace(
    /<meta\s+name=["']title["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta name="title" content="${route.title}" />`
  );

  // 3. Replace meta description
  customHtml = customHtml.replace(
    /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // 4. Replace canonical
  customHtml = customHtml.replace(
    /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // 5. Replace Open Graph
  customHtml = customHtml.replace(
    /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  customHtml = customHtml.replace(
    /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  customHtml = customHtml.replace(
    /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // 6. Replace Twitter
  customHtml = customHtml.replace(
    /<meta\s+property=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="twitter:title" content="${route.title}" />`
  );
  customHtml = customHtml.replace(
    /<meta\s+property=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="twitter:description" content="${route.description}" />`
  );
  customHtml = customHtml.replace(
    /<meta\s+property=["']twitter:url["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="twitter:url" content="${route.canonical}" />`
  );

  // Write out to dist/<path>/index.html
  const targetDir = path.join(DIST_DIR, route.path);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, customHtml, 'utf-8');
  console.log(`[SEO Generator] Created: ${route.path}/index.html`);
});

console.log('[SEO Generator] All static SEO pages generated successfully!');
