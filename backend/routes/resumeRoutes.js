
const express = require('express');
const { createResume, fetchResumes, fetchResume, updateResume, deleteResume } = require('../controllers/resuemController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, fetchResumes).post(protect, createResume);
router.route('/:id').get(protect, fetchResume).put(protect, updateResume).delete(protect, deleteResume);

module.exports = router;
