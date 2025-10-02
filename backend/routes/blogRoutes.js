const express = require('express');
const BlogController = require('../controllers/blog');
const router = express.Router();
const { AuthMiddleware } = require('../middleware/authMiddleware');

const authMiddleware = new AuthMiddleware();

const blogController = new BlogController();

router.route('/').get(authMiddleware.handle, blogController.fetchAll.bind(blogController)).post(authMiddleware.handle, blogController.create.bind(blogController));
router.route('/:id').get(authMiddleware.handle, blogController.fetchOne.bind(blogController)).put(authMiddleware.handle, blogController.update.bind(blogController)).delete(authMiddleware.handle, blogController.delete.bind(blogController));

module.exports = router;
