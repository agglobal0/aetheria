const express = require('express');
const router = express.Router();
const {
  getAllAuthors,
  getAuthorBySlug,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', getAllAuthors);
router.get('/:slug', getAuthorBySlug);

// Admin Protected Routes
router.post('/', authenticateToken, requireRole('admin'), createAuthor);
router.put('/:id', authenticateToken, requireRole('admin'), updateAuthor);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteAuthor);

module.exports = router;
