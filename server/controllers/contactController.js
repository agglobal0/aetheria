const { getPool } = require('../config/db');

async function submitContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields (name, email, subject, message) are required' });
    }

    const pool = getPool();
    await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    res.status(201).json({ success: true, message: 'Your message has been received by our editorial team. Thank you.' });
  } catch (error) {
    next(error);
  }
}

async function getMessagesAdmin(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

async function updateMessageStatusAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const pool = getPool();

    await pool.query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: `Message status updated to ${status}` });
  } catch (error) {
    next(error);
  }
}

async function deleteMessageAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  submitContact,
  getMessagesAdmin,
  updateMessageStatusAdmin,
  deleteMessageAdmin
};
