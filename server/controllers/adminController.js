const { getPool } = require('../config/db');

async function getAdminStats(req, res, next) {
  try {
    const pool = getPool();

    const [essayCounts] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN type = 'essay' OR type IS NULL THEN 1 ELSE 0 END) as essays_total,
        SUM(CASE WHEN type = 'blog' THEN 1 ELSE 0 END) as blogs_total,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
        SUM(views) as total_views
      FROM essays
    `);

    const [categoryCount] = await pool.query('SELECT COUNT(*) as count FROM categories');
    const [commentCount] = await pool.query('SELECT COUNT(*) as count FROM comments');
    const [subscriberCount] = await pool.query("SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = 'active'");
    const [unreadMessages] = await pool.query("SELECT COUNT(*) as count FROM contact_messages WHERE status = 'unread'");

    res.json({
      success: true,
      data: {
        essays: {
          total: essayCounts[0].essays_total || 0,
          published: essayCounts[0].published || 0,
          draft: essayCounts[0].draft || 0,
          views: essayCounts[0].total_views || 0
        },
        blogs: {
          total: essayCounts[0].blogs_total || 0
        },
        categories: categoryCount[0].count,
        comments: commentCount[0].count,
        subscribers: subscriberCount[0].count,
        unreadMessages: unreadMessages[0].count
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAdminStats
};
