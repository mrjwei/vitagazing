const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();
const { AuthMiddleware } = require('../middleware/authMiddleware');

const authMiddleware = new AuthMiddleware();

const userController = new UserController();

router.route('/').put(authMiddleware.handle, userController.update.bind(userController));

module.exports = router;
