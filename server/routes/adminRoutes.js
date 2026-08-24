const express = require('express');
const router = express.Router();
const { getAdminStats } = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/stats', authenticateToken, requireRole('admin'), getAdminStats);

module.exports = router;
