const { getPool } = require('../config/db');

async function subscribe(req, res, next) {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email address is required' });
    }

    const pool = getPool();
    const [existing] = await pool.query('SELECT id, status FROM newsletter_subscribers WHERE email = ?', [email]);
    
    if (existing.length > 0) {
      if (existing[0].status === 'unsubscribed') {
        await pool.query("UPDATE newsletter_subscribers SET status = 'active' WHERE email = ?", [email]);
        return res.json({ success: true, message: 'Welcome back! Your subscription has been reactivated.' });
      }
      return res.status(400).json({ success: false, message: 'You are already subscribed to the ORAANIS Newsletter.' });
    }

    await pool.query('INSERT INTO newsletter_subscribers (email) VALUES (?)', [email]);
    res.status(201).json({ success: true, message: 'Thank you for subscribing to ORAANIS Essays.' });
  } catch (error) {
    next(error);
  }
}

async function getSubscribersAdmin(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

async function deleteSubscriberAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM newsletter_subscribers WHERE id = ?', [id]);
    res.json({ success: true, message: 'Subscriber removed' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  subscribe,
  getSubscribersAdmin,
  deleteSubscriberAdmin
};
