const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

function getDbConfig() {
  const isAiven = process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com');
  const isSSL = process.env.DB_SSL === 'true' || isAiven;

  if (process.env.DATABASE_URL || process.env.MYSQL_URL) {
    const connectionUri = process.env.DATABASE_URL || process.env.MYSQL_URL;
    return {
      uri: connectionUri,
      ssl: isSSL ? { rejectUnauthorized: false } : undefined
    };
  }

  return {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'defaultdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ...(isSSL ? { ssl: { rejectUnauthorized: false } } : {})
  };
}

let pool = null;

const fallbackStore = {
  contact_messages: [],
  newsletter_subscribers: [],
  comments: []
};

const mockPool = {
  async query(sql, params = []) {
    const lowerSql = sql.trim().toLowerCase();
    
    if (lowerSql.includes('insert into contact_messages')) {
      fallbackStore.contact_messages.push({ id: Date.now(), name: params[0], email: params[1], subject: params[2], message: params[3] });
      return [{ insertId: Date.now(), affectedRows: 1 }];
    }
    
    if (lowerSql.includes('insert into newsletter_subscribers')) {
      fallbackStore.newsletter_subscribers.push({ id: Date.now(), email: params[0] });
      return [{ insertId: Date.now(), affectedRows: 1 }];
    }
    
    if (lowerSql.includes('select count(*)')) {
      return [[{ count: 1 }]];
    }

    if (lowerSql.startsWith('select')) {
      return [[]];
    }

    return [{ affectedRows: 1 }];
  }
};

async function initDB() {
  try {
    const config = getDbConfig();
    const dbName = process.env.DB_NAME || 'defaultdb';

    if (!config.uri && !process.env.DB_HOST?.includes('aivencloud.com')) {
      try {
        const rootConfig = { ...config };
        delete rootConfig.database;
        const rootConnection = await mysql.createConnection(rootConfig);
        await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await rootConnection.end();
      } catch (err) {
        console.log('[DB Init Note] Pre-creating database skipped:', err.message);
      }
    }

    const testPool = config.uri ? mysql.createPool(config.uri) : mysql.createPool(config);
    
    // Connection test
    await testPool.query('SELECT 1');
    pool = testPool;

    console.log(`[DB] Connected successfully to MySQL database (${dbName}) on host ${process.env.DB_HOST || 'Aiven Cloud / Localhost'}`);
    
    await createTablesIfNotExist();
    return pool;
  } catch (error) {
    console.warn('[DB Warning] Cloud MySQL host unreachable or paused:', error.message);
    console.log('[DB Fallback] Activating resilient in-memory database store...');
    pool = mockPool;
    return pool;
  }
}



async function createTablesIfNotExist() {
  if (!pool) return;

  const tableDDLs = [
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'editor', 'user') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_users_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS authors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(120) NOT NULL UNIQUE,
      bio TEXT,
      avatar VARCHAR(500),
      website VARCHAR(255),
      social_links JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_authors_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      slug VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      accent_color VARCHAR(30) DEFAULT '#8B263E',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_categories_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS essays (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      subtitle VARCHAR(255),
      excerpt TEXT NOT NULL,
      content LONGTEXT NOT NULL,
      featured_image VARCHAR(500),
      author_id INT NOT NULL,
      category_id INT NOT NULL,
      status ENUM('draft', 'published', 'archived') DEFAULT 'published',
      featured TINYINT(1) DEFAULT 0,
      reading_time INT DEFAULT 5,
      views INT DEFAULT 0,
      seo_title VARCHAR(255),
      seo_description TEXT,
      published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
      INDEX idx_essays_slug (slug),
      INDEX idx_essays_status (status),
      INDEX idx_essays_featured (featured),
      INDEX idx_essays_category (category_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS tags (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      slug VARCHAR(50) NOT NULL UNIQUE,
      INDEX idx_tags_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS essay_tags (
      essay_id INT NOT NULL,
      tag_id INT NOT NULL,
      PRIMARY KEY (essay_id, tag_id),
      FOREIGN KEY (essay_id) REFERENCES essays(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      essay_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      content TEXT NOT NULL,
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (essay_id) REFERENCES essays(id) ON DELETE CASCADE,
      INDEX idx_comments_essay (essay_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS bookmarks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      essay_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY unique_user_essay (user_id, essay_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (essay_id) REFERENCES essays(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(150) NOT NULL UNIQUE,
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status ENUM('active', 'unsubscribed') DEFAULT 'active'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      subject VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  ];

  for (const statement of tableDDLs) {
    try {
      await pool.query(statement);
    } catch (err) {
      console.error('[DB Table Setup Warning]:', err.message);
    }
  }
}

function getPool() {
  if (!pool) {
    throw new Error('Database pool not initialized. Call initDB() first.');
  }
  return pool;
}

module.exports = {
  initDB,
  getPool
};
