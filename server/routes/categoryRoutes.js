const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', getAllCategories);
router.get('/:slug', getCategoryBySlug);

// Admin Protected Routes
router.post('/', authenticateToken, requireRole('admin'), createCategory);
router.put('/:id', authenticateToken, requireRole('admin'), updateCategory);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteCategory);

module.exports = router;
