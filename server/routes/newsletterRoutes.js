const express = require('express');
const router = express.Router();
const { subscribe, getSubscribersAdmin, deleteSubscriberAdmin } = require('../controllers/newsletterController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.post('/subscribe', subscribe);

// Admin Routes
router.get('/admin/subscribers', authenticateToken, requireRole('admin'), getSubscribersAdmin);
router.delete('/admin/subscribers/:id', authenticateToken, requireRole('admin'), deleteSubscriberAdmin);

module.exports = router;
