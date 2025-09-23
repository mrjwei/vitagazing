const express = require('express');
const ResumeController = require('../controllers/resume');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const resumeController = new ResumeController();

router.route('/').get(protect, resumeController.fetchAll.bind(resumeController)).post(protect, resumeController.create.bind(resumeController));
router.route('/:id').get(protect, resumeController.fetchOne.bind(resumeController)).put(protect, resumeController.update.bind(resumeController)).delete(protect, resumeController.delete.bind(resumeController));

module.exports = router;
