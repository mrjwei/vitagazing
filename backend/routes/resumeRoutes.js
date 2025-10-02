const express = require('express');
const ResumeController = require('../controllers/resume');
const router = express.Router();
const { AuthMiddleware } = require('../middleware/authMiddleware');

const authMiddleware = new AuthMiddleware();

const resumeController = new ResumeController();

router.route('/').get(authMiddleware.handle, resumeController.fetchAll.bind(resumeController)).post(authMiddleware.handle, resumeController.create.bind(resumeController));
router.route('/:id').get(authMiddleware.handle, resumeController.fetchOne.bind(resumeController)).put(authMiddleware.handle, resumeController.update.bind(resumeController)).delete(authMiddleware.handle, resumeController.delete.bind(resumeController));

module.exports = router;
