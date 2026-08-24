const { initDB } = require('./config/db');
const { seedDatabase } = require('./services/seedService');

async function test() {
  try {
    console.log('Connecting to DB...');
    const pool = await initDB();
    console.log('Connected! Seeding...');
    await seedDatabase(pool);
    console.log('DB SUCCESS!');
    process.exit(0);
  } catch (err) {
    console.error('DB FAIL:', err.message);
    process.exit(1);
  }
}

test();
