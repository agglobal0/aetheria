const express = require('express');
const router = express.Router();
const {
  getPerspectives,
  addPerspective,
  likePerspective,
  getAllPerspectivesAdmin,
  updatePerspectiveStatusAdmin,
  deletePerspectiveAdmin
} = require('../controllers/perspectiveController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getPerspectives);
router.post('/', addPerspective);
router.post('/:id/like', likePerspective);

// Admin routes
router.get('/admin/all', requireAuth, requireAdmin, getAllPerspectivesAdmin);
router.put('/admin/:id', requireAuth, requireAdmin, updatePerspectiveStatusAdmin);
router.delete('/admin/:id', requireAuth, requireAdmin, deletePerspectiveAdmin);

module.exports = router;
