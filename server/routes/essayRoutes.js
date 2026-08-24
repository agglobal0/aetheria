const express = require('express');
const router = express.Router();
const {
  getAllEssays,
  getEssayBySlug,
  createEssay,
  updateEssay,
  deleteEssay
} = require('../controllers/essayController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', getAllEssays);
router.get('/:slug', getEssayBySlug);

// Admin Protected Routes
router.post('/', authenticateToken, requireRole('admin'), createEssay);
router.put('/:id', authenticateToken, requireRole('admin'), updateEssay);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteEssay);

module.exports = router;
