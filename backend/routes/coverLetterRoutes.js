const express = require('express');
const CoverLetterController = require('../controllers/coverLetter');
const router = express.Router();
const { AuthMiddleware } = require('../middleware/authMiddleware');

const authMiddleware = new AuthMiddleware();

const coverLetterController = new CoverLetterController();

router.route('/').get(authMiddleware.handle, coverLetterController.fetchAll.bind(coverLetterController)).post(authMiddleware.handle, coverLetterController.create.bind(coverLetterController));
router.route('/:id').get(authMiddleware.handle, coverLetterController.fetchOne.bind(coverLetterController)).put(authMiddleware.handle, coverLetterController.update.bind(coverLetterController)).delete(authMiddleware.handle, coverLetterController.delete.bind(coverLetterController));

module.exports = router;
