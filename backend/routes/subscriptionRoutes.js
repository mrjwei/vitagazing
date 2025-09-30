const express = require('express');
const UserController = require('../controllers/user');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const userController = new UserController();

router.route('/').put(protect, userController.update.bind(userController));

module.exports = router;
