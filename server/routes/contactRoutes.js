const express = require('express');
const router = express.Router();
const {
  submitContact,
  getMessagesAdmin,
  updateMessageStatusAdmin,
  deleteMessageAdmin
} = require('../controllers/contactController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.post('/', submitContact);

// Admin Routes
router.get('/admin/messages', authenticateToken, requireRole('admin'), getMessagesAdmin);
router.put('/admin/messages/:id', authenticateToken, requireRole('admin'), updateMessageStatusAdmin);
router.delete('/admin/messages/:id', authenticateToken, requireRole('admin'), deleteMessageAdmin);

module.exports = router;
