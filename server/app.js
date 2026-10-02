const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDB } = require('./config/db');
const { seedDatabase } = require('./services/seedService');
const { errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const essayRoutes = require('./routes/essayRoutes');

const commentRoutes = require('./routes/commentRoutes');
const perspectiveRoutes = require('./routes/perspectiveRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'ORAANIS Editorial API',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/essays', essayRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/perspectives', perspectiveRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server with Graceful Port Handling
async function startServer() {
  try {
    const pool = await initDB();
    await seedDatabase(pool);

    const tryListen = (portToUse) => {
      const server = app.listen(portToUse, () => {
        console.log(`====================================================`);
        console.log(`  ORAANIS Editorial API Server running on port ${portToUse}`);
        console.log(`  Health Check: http://localhost:${portToUse}/api/health`);
        console.log(`====================================================`);
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.warn(`[Port Conflict] Port ${portToUse} is already in use.`);
          if (portToUse < DEFAULT_PORT + 5) {
            console.log(`[Auto-Fallback] Retrying server on fallback port ${portToUse + 1}...`);
            tryListen(portToUse + 1);
          } else {
            console.error(`Error: Unable to bind to ports ${DEFAULT_PORT} through ${portToUse}.`);
          }
        } else {
          console.error('Server error:', err);
        }
      });
    };

    tryListen(DEFAULT_PORT);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
