// routes/blogRoutes.js
const express = require('express');
const BlogController = require('../controllers/blog');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const blogController = new BlogController();

// STRATEGY PATTERN: This endpoint returns available strategies
router.get('/strategies', protect, blogController.getStrategies.bind(blogController));

// Standard CRUD routes - Strategy pattern is transparent to routes
router.route('/')
  .get(protect, blogController.fetchAll.bind(blogController))
  .post(protect, blogController.create.bind(blogController));

router.route('/:id')
  .get(protect, blogController.fetchOne.bind(blogController))
  .put(protect, blogController.update.bind(blogController))
  .delete(protect, blogController.delete.bind(blogController));

module.exports = router;