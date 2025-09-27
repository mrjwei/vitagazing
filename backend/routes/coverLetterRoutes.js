const express = require('express');
const CoverLetterController = require('../controllers/coverLetter');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const coverLetterController = new CoverLetterController();

router.route('/').get(protect, coverLetterController.fetchAll.bind(coverLetterController)).post(protect, coverLetterController.create.bind(coverLetterController));
router.route('/:id').get(protect, coverLetterController.fetchOne.bind(coverLetterController)).put(protect, coverLetterController.update.bind(coverLetterController)).delete(protect, coverLetterController.delete.bind(coverLetterController));

module.exports = router;
