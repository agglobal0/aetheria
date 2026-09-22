const { getPool } = require('../config/db');

async function getAllCategories(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT c.id, c.name, c.slug, c.description, c.accent_color, c.created_at, 
             COUNT(CASE WHEN e.type = 'essay' OR e.type IS NULL THEN e.id END) as essay_count,
             COUNT(CASE WHEN e.type = 'blog' THEN e.id END) as blog_count,
             COUNT(e.id) as total_count
      FROM categories c 
      LEFT JOIN essays e ON e.category_id = c.id AND e.status = 'published'
      GROUP BY c.id, c.name, c.slug, c.description, c.accent_color, c.created_at
      ORDER BY c.name ASC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

async function getCategoryBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT c.id, c.name, c.slug, c.description, c.accent_color, c.created_at, 
             COUNT(CASE WHEN e.type = 'essay' OR e.type IS NULL THEN e.id END) as essay_count,
             COUNT(CASE WHEN e.type = 'blog' THEN e.id END) as blog_count,
             COUNT(e.id) as total_count
      FROM categories c 
      LEFT JOIN essays e ON e.category_id = c.id AND e.status = 'published'
      WHERE c.slug = ?
      GROUP BY c.id, c.name, c.slug, c.description, c.accent_color, c.created_at
    `, [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const { name, slug, description, accent_color } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'Name and slug are required' });
    }

    const pool = getPool();
    const [result] = await pool.query(
      'INSERT INTO categories (name, slug, description, accent_color) VALUES (?, ?, ?, ?)',
      [name, slug, description || '', accent_color || '#8B263E']
    );

    res.status(201).json({ success: true, id: result.insertId, message: 'Category created successfully' });
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, slug, description, accent_color } = req.body;

    const pool = getPool();
    await pool.query(
      'UPDATE categories SET name = ?, slug = ?, description = ?, accent_color = ? WHERE id = ?',
      [name, slug, description, accent_color, id]
    );

    res.json({ success: true, message: 'Category updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};
