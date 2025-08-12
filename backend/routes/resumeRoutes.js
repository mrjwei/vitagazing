
const express = require('express');
const { createResume, fetchResumes, updateResume, deleteResume } = require('../controllers/resuemController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, fetchResumes).post(protect, createResume);
router.route('/:id').put(protect, updateResume).delete(protect, deleteResume);

module.exports = router;
