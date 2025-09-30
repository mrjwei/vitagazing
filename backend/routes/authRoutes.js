const express = require('express');
const UserController = require('../controllers/user');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const userController = new UserController();

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/profile', protect, userController.fetchById.bind(userController));
router.put('/profile', protect, userController.update.bind(userController));
router.put('/unsubscribe', protect, userController.update.bind(userController));

module.exports = router;
