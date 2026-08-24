const { getPool } = require('../config/db');

async function getAllAuthors(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT a.*, COUNT(e.id) as essay_count 
      FROM authors a 
      LEFT JOIN essays e ON e.author_id = a.id AND e.status = 'published'
      GROUP BY a.id 
      ORDER BY a.name ASC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

async function getAuthorBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT a.*, COUNT(e.id) as essay_count 
      FROM authors a 
      LEFT JOIN essays e ON e.author_id = a.id AND e.status = 'published'
      WHERE a.slug = ?
      GROUP BY a.id
    `, [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Author not found' });
    }

    // Fetch author's published essays
    const [essays] = await pool.query(`
      SELECT e.*, c.name as category_name, c.slug as category_slug, c.accent_color
      FROM essays e
      JOIN categories c ON e.category_id = c.id
      WHERE e.author_id = ? AND e.status = 'published'
      ORDER BY e.published_at DESC
    `, [rows[0].id]);

    res.json({ success: true, data: { ...rows[0], essays } });
  } catch (error) {
    next(error);
  }
}

async function createAuthor(req, res, next) {
  try {
    const { name, slug, bio, avatar, website, social_links } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'Name and slug are required' });
    }

    const pool = getPool();
    const [result] = await pool.query(
      'INSERT INTO authors (name, slug, bio, avatar, website, social_links) VALUES (?, ?, ?, ?, ?, ?)',
      [name, slug, bio || '', avatar || '', website || '', JSON.stringify(social_links || {})]
    );

    res.status(201).json({ success: true, id: result.insertId, message: 'Author created successfully' });
  } catch (error) {
    next(error);
  }
}

async function updateAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const { name, slug, bio, avatar, website, social_links } = req.body;

    const pool = getPool();
    await pool.query(
      'UPDATE authors SET name = ?, slug = ?, bio = ?, avatar = ?, website = ?, social_links = ? WHERE id = ?',
      [name, slug, bio, avatar, website, JSON.stringify(social_links || {}), id]
    );

    res.json({ success: true, message: 'Author updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM authors WHERE id = ?', [id]);
    res.json({ success: true, message: 'Author deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllAuthors,
  getAuthorBySlug,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
