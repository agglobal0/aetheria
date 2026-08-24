const express = require('express');
const router = express.Router();
const {
  getCommentsByEssay,
  addComment,
  getAllCommentsAdmin,
  updateCommentStatus,
  deleteComment
} = require('../controllers/commentController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/essay/:essayId', getCommentsByEssay);
router.post('/essay/:essayId', addComment);

// Admin Routes
router.get('/admin/all', authenticateToken, requireRole('admin'), getAllCommentsAdmin);
router.put('/admin/:id', authenticateToken, requireRole('admin'), updateCommentStatus);
router.delete('/admin/:id', authenticateToken, requireRole('admin'), deleteComment);

module.exports = router;
