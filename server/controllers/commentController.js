const { getPool } = require('../config/db');

async function getCommentsByEssay(req, res, next) {
  try {
    const { essayId } = req.params;
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT id, essay_id, name, content, created_at 
       FROM comments 
       WHERE essay_id = ? AND status = 'approved' 
       ORDER BY created_at DESC`,
      [essayId]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

async function addComment(req, res, next) {
  try {
    const { essayId } = req.params;
    const { name, email, content } = req.body;

    if (!name || !email || !content) {
      return res.status(400).json({ success: false, message: 'Name, email, and content are required' });
    }

    const pool = getPool();
    const [result] = await pool.query(
      `INSERT INTO comments (essay_id, name, email, content, status) VALUES (?, ?, ?, ?, 'approved')`,
      [essayId, name, email, content]
    );

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: {
        id: result.insertId,
        essay_id: Number(essayId),
        name,
        content,
        created_at: new Date()
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getAllCommentsAdmin(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT c.*, e.title as essay_title, e.slug as essay_slug
       FROM comments c
       JOIN essays e ON c.essay_id = e.id
       ORDER BY c.created_at DESC`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

async function updateCommentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const pool = getPool();

    await pool.query('UPDATE comments SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: `Comment status updated to ${status}` });
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM comments WHERE id = ?', [id]);
    res.json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCommentsByEssay,
  addComment,
  getAllCommentsAdmin,
  updateCommentStatus,
  deleteComment
};
