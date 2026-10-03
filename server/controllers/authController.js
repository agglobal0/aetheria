const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/db');

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const pool = getPool();
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'user']
    );

    const user = { id: result.insertId, name, email, role: 'user' };
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'aetheria_editorial_secret_key_2026_super_secure',
      { expiresIn: '7d' }
    );

    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // Check for ORAANIS Admin master credentials
    const isMasterAdminEmail = (cleanEmail === 'oraanis@admin.com' || cleanEmail === 'admin@oraanis.com' || cleanEmail === 'admin@aetheria.com');
    const isMasterAdminPassword = (cleanPassword === 'oraanisbymonika');

    const JWT_SECRET = process.env.JWT_SECRET || 'aetheria_editorial_secret_key_2026_super_secure';
    const pool = getPool();

    let rows = [];
    try {
      const [dbRows] = await pool.query('SELECT * FROM users WHERE LOWER(email) = ?', [cleanEmail]);
      rows = dbRows || [];
    } catch (dbErr) {
      console.warn('[Auth Query Warn]:', dbErr.message);
    }

    if (rows.length === 0) {
      if (isMasterAdminEmail && isMasterAdminPassword) {
        // Auto-provision admin user if missing in database
        const hashedPassword = await bcrypt.hash('oraanisbymonika', 10);
        let newId = 1;
        try {
          const [insertRes] = await pool.query(
            'INSERT INTO users (name, email, password, password_hash, role) VALUES (?, ?, ?, ?, ?)',
            ['ORAANIS Administrator', cleanEmail, hashedPassword, hashedPassword, 'admin']
          );
          newId = insertRes.insertId || 1;
        } catch (insertErr) {
          console.warn('[Auth Auto-Provision Warning]:', insertErr.message);
        }

        const newUser = { id: newId, name: 'ORAANIS Administrator', email: cleanEmail, role: 'admin' };
        const token = jwt.sign(
          { id: newUser.id, email: newUser.email, role: newUser.role },
          JWT_SECRET,
          { expiresIn: '30d' }
        );
        return res.json({ success: true, user: newUser, token });
      }
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    let user = rows[0];

    // Verify password (either master match or bcrypt hash comparison)
    let isMatch = false;
    if (isMasterAdminPassword && isMasterAdminEmail) {
      isMatch = true;
      // Auto-update hash and role in DB
      try {
        const updatedHash = await bcrypt.hash('oraanisbymonika', 10);
        await pool.query('UPDATE users SET password = ?, password_hash = ?, role = ? WHERE id = ?', [updatedHash, updatedHash, 'admin', user.id]);
        user.role = 'admin';
      } catch (e) {}
    } else {
      const userHash = user.password || user.password_hash;
      if (userHash) {
        isMatch = await bcrypt.compare(cleanPassword, userHash);
      }
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    res.json({ success: true, user: userData, token });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) {
      return res.status(444).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: rows[0] });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  me
};
