const { getPool } = require('../config/db');

async function getPerspectives(req, res, next) {
  try {
    const { topic, sort = 'newest' } = req.query;
    const pool = getPool();
    
    let query = `SELECT id, author_name, topic, title, content, is_anonymous, likes, created_at 
                 FROM perspectives 
                 WHERE status = 'approved'`;
    const params = [];

    if (topic && topic !== 'All') {
      query += ` AND topic = ?`;
      params.push(topic);
    }

    if (sort === 'popular') {
      query += ` ORDER BY likes DESC, created_at DESC`;
    } else {
      query += ` ORDER BY created_at DESC`;
    }

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

async function addPerspective(req, res, next) {
  try {
    const { author_name, email, topic, title, content, is_anonymous } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const cleanAuthor = (is_anonymous || !author_name || !author_name.trim()) 
      ? 'A Thoughtful Reader' 
      : author_name.trim();
    const cleanTopic = topic || 'Life Lessons';
    const anonFlag = is_anonymous ? 1 : 0;

    const pool = getPool();
    const [result] = await pool.query(
      `INSERT INTO perspectives (author_name, email, topic, title, content, is_anonymous, likes, status) 
       VALUES (?, ?, ?, ?, ?, ?, 0, 'approved')`,
      [cleanAuthor, email || null, cleanTopic, title.trim(), content.trim(), anonFlag]
    );

    res.status(201).json({
      success: true,
      message: 'Your perspective has been shared with the community',
      data: {
        id: result.insertId,
        author_name: cleanAuthor,
        topic: cleanTopic,
        title: title.trim(),
        content: content.trim(),
        is_anonymous: anonFlag,
        likes: 0,
        created_at: new Date()
      }
    });
  } catch (error) {
    next(error);
  }
}

async function likePerspective(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('UPDATE perspectives SET likes = likes + 1 WHERE id = ?', [id]);
    const [rows] = await pool.query('SELECT likes FROM perspectives WHERE id = ?', [id]);
    res.json({ success: true, likes: rows[0]?.likes || 0 });
  } catch (error) {
    next(error);
  }
}

async function getAllPerspectivesAdmin(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT * FROM perspectives ORDER BY created_at DESC`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

async function updatePerspectiveStatusAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const pool = getPool();
    await pool.query('UPDATE perspectives SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (error) {
    next(error);
  }
}

async function deletePerspectiveAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM perspectives WHERE id = ?', [id]);
    res.json({ success: true, message: 'Perspective deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPerspectives,
  addPerspective,
  likePerspective,
  getAllPerspectivesAdmin,
  updatePerspectiveStatusAdmin,
  deletePerspectiveAdmin
};
