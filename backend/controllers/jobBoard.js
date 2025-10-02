const JobBoardService = require("../services/jobBoard")

class JobBoardController {
    constructor() {
        this.service = new JobBoardService()
    }

    async create(req, res) {
        const {
            jobTitle,
            description,
            deadline,
            location
        } = req.body
        try {
            const jobBoard = await this.service.create({
                userId: req.user.id,
                jobTitle,
                description,
                deadline,
                location
            })
            return res.status(201).json(jobBoard)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async fetchAll(req, res) {
        try {
            const jobBoards = await this.service.findAll({ userId: req.user.id })
            res.status(200).json(jobBoards)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async fetchOne(req, res) {
        try {
            const jobBoard = await this.service.findOne({
                _id: req.params.id,
                userId: req.user.id,
            })
            if (!jobBoard) {
                return res.status(404).json({ message: "Job board not found" })
            }
            res.json(jobBoard)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async update(req, res) {
        const {
            jobTitle,
            description,
            deadline,
            location
        } = req.body
        try {
            const jobBoard = await this.service.findById(req.params.id)
            if (!jobBoard) {
                return res.status(404).json({ message: "Job board not found" })
            }
            jobBoard.jobTitle = jobTitle || jobBoard.jobTitle
            jobBoard.description = description || jobBoard.description
            jobBoard.deadline = deadline || jobBoard.deadline
            jobBoard.location = location || jobBoard.location
            const updatedJobBoard = await jobBoard.save()
            res.json(updatedJobBoard)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async delete(req, res) {
        try {
            const jobBoard = await this.service.findById(req.params.id)
            if (!jobBoard) {
                return res.status(404).json({ message: "Job board not found" })
            }
            await jobBoard.remove()
            res.json({ message: "Job board deleted" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = JobBoardController

//