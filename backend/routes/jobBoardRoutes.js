const express = require('express');
const JobBoardController = require('../controllers/jobBoard');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const jobBoardController = new JobBoardController();

router.route('/').get(protect, jobBoardController.fetchAll.bind(jobBoardController)).post(protect, jobBoardController.create.bind(jobBoardController));
router.route('/:id').get(protect, jobBoardController.fetchOne.bind(jobBoardController)).put(protect, jobBoardController.update.bind(jobBoardController)).delete(protect, jobBoardController.delete.bind(jobBoardController));

module.exports = router;

//
