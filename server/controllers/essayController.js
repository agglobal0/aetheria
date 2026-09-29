const { getPool } = require('../config/db');

async function getAllEssays(req, res, next) {
  try {
    const {
      category,
      author,
      status,
      type,
      featured,
      q,
      sort = 'newest',
      page = 1,
      limit = 12
    } = req.query;

    const pool = getPool();
    const params = [];
    let whereClauses = [];

    if (status && status !== 'all') {
      whereClauses.push('e.status = ?');
      params.push(status);
    } else if (!status) {
      whereClauses.push("e.status = 'published'");
    }

    if (type && type !== 'all') {
      if (type === 'essay') {
        whereClauses.push("(e.type = 'essay' OR e.type IS NULL OR e.type = '')");
      } else if (type === 'blog') {
        whereClauses.push("e.type = 'blog'");
      } else {
        whereClauses.push("e.type = ?");
        params.push(type);
      }
    }

    if (category && category !== 'all') {
      const catSynonyms = {
        'reflections': ['reflections', 'life-reflection', 'life-reflections'],
        'life-reflection': ['reflections', 'life-reflection', 'life-reflections'],
        'emotional-intelligence': ['emotional-intelligence'],
        'human-behaviour': ['wisdom', 'human-behaviour', 'human-behavior'],
        'wisdom': ['wisdom', 'ethics', 'human-behaviour', 'human-behavior'],
        'ethics': ['wisdom', 'ethics'],
        'healing': ['healing', 'reflections'],
        'spirituality': ['spirituality', 'reflections', 'ethics']
      };

      const matchedSlugs = catSynonyms[category] || [category];
      const placeholders = matchedSlugs.map(() => '?').join(', ');
      whereClauses.push(`(c.slug IN (${placeholders}) OR c.id = ? OR e.category_id = ?)`);
      params.push(...matchedSlugs, category, category);
    }

    if (author) {
      whereClauses.push('(a.slug = ? OR a.id = ?)');
      params.push(author, author);
    }

    if (featured !== undefined && featured !== '') {
      whereClauses.push('e.featured = ?');
      params.push(Number(featured));
    }

    if (q) {
      whereClauses.push('(e.title LIKE ? OR e.excerpt LIKE ? OR e.content LIKE ? OR a.name LIKE ? OR c.name LIKE ?)');
      const searchTerm = `%${q}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Count Total
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total 
       FROM essays e 
       LEFT JOIN categories c ON e.category_id = c.id 
       LEFT JOIN authors a ON e.author_id = a.id 
       ${whereSQL}`,
      params
    );

    const total = countResult[0]?.total || 0;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const offset = (pageNum - 1) * limitNum;

    // Sorting
    let orderSQL = 'ORDER BY e.published_at DESC, e.id DESC';
    if (sort === 'oldest') orderSQL = 'ORDER BY e.published_at ASC, e.id ASC';
    if (sort === 'views') orderSQL = 'ORDER BY e.views DESC';
    if (sort === 'title') orderSQL = 'ORDER BY e.title ASC';

    const [rows] = await pool.query(
      `SELECT e.id, e.title, e.slug, e.subtitle, e.excerpt, e.featured_image, e.type, e.status, 
              e.featured, e.reading_time, e.views, e.seo_title, e.seo_description, 
              e.published_at, e.created_at, e.updated_at,
              c.id as category_id, c.name as category_name, c.slug as category_slug, c.accent_color,
              a.id as author_id, a.name as author_name, a.slug as author_slug, a.avatar as author_avatar, a.bio as author_bio
       FROM essays e
       LEFT JOIN categories c ON e.category_id = c.id
       LEFT JOIN authors a ON e.author_id = a.id
       ${whereSQL}
       ${orderSQL}
       LIMIT ? OFFSET ?`,
      [...params, limitNum, offset]
    );

    res.json({
      success: true,
      data: rows,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getEssayBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const pool = getPool();

    const [rows] = await pool.query(
      `SELECT e.*, 
              c.id as category_id, c.name as category_name, c.slug as category_slug, c.accent_color,
              a.id as author_id, a.name as author_name, a.slug as author_slug, a.avatar as author_avatar, a.bio as author_bio, a.social_links as author_social
       FROM essays e
       LEFT JOIN categories c ON e.category_id = c.id
       LEFT JOIN authors a ON e.author_id = a.id
       WHERE e.slug = ?`,
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Essay not found' });
    }

    const essay = rows[0];

    // Increment view count asynchronously
    pool.query('UPDATE essays SET views = views + 1 WHERE id = ?', [essay.id]).catch(err => console.error(err));

    // Fetch related essays in the same category
    const [related] = await pool.query(
      `SELECT e.id, e.title, e.slug, e.excerpt, e.featured_image, e.reading_time, e.published_at,
              c.name as category_name, c.slug as category_slug, c.accent_color,
              a.name as author_name
       FROM essays e
       LEFT JOIN categories c ON e.category_id = c.id
       LEFT JOIN authors a ON e.author_id = a.id
       WHERE (e.category_id = ? OR ? IS NULL) AND e.id != ? AND e.status = 'published'
       ORDER BY e.published_at DESC LIMIT 3`,
      [essay.category_id, essay.category_id, essay.id]
    );

    // Fetch prev/next essays
    const [prevRows] = await pool.query(
      `SELECT title, slug FROM essays WHERE published_at < ? AND status = 'published' ORDER BY published_at DESC LIMIT 1`,
      [essay.published_at]
    );

    const [nextRows] = await pool.query(
      `SELECT title, slug FROM essays WHERE published_at > ? AND status = 'published' ORDER BY published_at ASC LIMIT 1`,
      [essay.published_at]
    );

    res.json({
      success: true,
      data: {
        ...essay,
        related,
        prev: prevRows[0] || null,
        next: nextRows[0] || null
      }
    });
  } catch (error) {
    next(error);
  }
}

async function createEssay(req, res, next) {
  try {
    const {
      title,
      slug,
      subtitle,
      excerpt,
      content,
      featured_image,
      author_id,
      category_id,
      type = 'essay',
      status = 'published',
      featured = 0,
      reading_time = 5,
      seo_title,
      seo_description
    } = req.body;

    const authorIdToUse = author_id || 1;

    if (!title || !slug || !content || !category_id) {
      return res.status(400).json({ success: false, message: 'Title, slug, content, and category are required' });
    }

    const pool = getPool();
    const generatedExcerpt = excerpt || content.replace(/<[^>]*>?/gm, '').substring(0, 180) + '...';

    const [result] = await pool.query(
      `INSERT INTO essays (
        title, slug, subtitle, excerpt, content, featured_image,
        author_id, category_id, type, status, featured, reading_time,
        seo_title, seo_description, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        title,
        slug,
        subtitle || '',
        generatedExcerpt,
        content,
        featured_image || '',
        authorIdToUse,
        category_id,
        type,
        status,
        featured ? 1 : 0,
        reading_time,
        seo_title || title,
        seo_description || generatedExcerpt
      ]
    );

    res.status(201).json({ success: true, id: result.insertId, message: 'Essay created successfully' });
  } catch (error) {
    next(error);
  }
}

async function updateEssay(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      subtitle,
      excerpt,
      content,
      featured_image,
      author_id,
      category_id,
      type = 'essay',
      status,
      featured,
      reading_time,
      seo_title,
      seo_description
    } = req.body;

    const authorIdToUse = author_id || 1;
    const pool = getPool();
    await pool.query(
      `UPDATE essays SET
        title = ?, slug = ?, subtitle = ?, excerpt = ?, content = ?, featured_image = ?,
        author_id = ?, category_id = ?, type = ?, status = ?, featured = ?, reading_time = ?,
        seo_title = ?, seo_description = ?
       WHERE id = ?`,
      [
        title,
        slug,
        subtitle,
        excerpt,
        content,
        featured_image,
        authorIdToUse,
        category_id,
        type,
        status,
        featured ? 1 : 0,
        reading_time,
        seo_title,
        seo_description,
        id
      ]
    );

    res.json({ success: true, message: 'Essay updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function deleteEssay(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM essays WHERE id = ?', [id]);
    res.json({ success: true, message: 'Essay deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllEssays,
  getEssayBySlug,
  createEssay,
  updateEssay,
  deleteEssay
};
