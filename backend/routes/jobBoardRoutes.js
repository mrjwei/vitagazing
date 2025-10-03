const express = require('express');
const JobBoardController = require('../controllers/jobBoard');
const router = express.Router();
const { AuthMiddleware } = require('../middleware/authMiddleware');

const authMiddleware = new AuthMiddleware();

const jobBoardController = new JobBoardController();

router.route('/').get(authMiddleware.handle, jobBoardController.fetchAll.bind(jobBoardController)).post(authMiddleware.handle, jobBoardController.create.bind(jobBoardController));
router.route('/:id').get(authMiddleware.handle, jobBoardController.fetchOne.bind(jobBoardController)).put(authMiddleware.handle, jobBoardController.update.bind(jobBoardController)).delete(authMiddleware.handle, jobBoardController.delete.bind(jobBoardController));

module.exports = router;

//
