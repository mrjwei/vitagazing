const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();
const { AuthMiddleware } = require('../middleware/authMiddleware');

const authMiddleware = new AuthMiddleware();

const userController = new UserController();

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/profile', authMiddleware.handle, userController.fetchById.bind(userController));
router.put('/profile', authMiddleware.handle, userController.update.bind(userController));
router.put('/unsubscribe', authMiddleware.handle, userController.update.bind(userController));

module.exports = router;
