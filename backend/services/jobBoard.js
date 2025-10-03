const { JobBoard } = require("../models")
const BaseService = require("./base")

class JobBoardService extends BaseService {
    async create(data) {
        const {
            userId,
            jobTitle,
            description,
            deadline,
            location,
        } = data
        try {
            const jobBoard = await JobBoard.create({
                userId,
                jobTitle,
                description,
                deadline,
                location,
            })
            return jobBoard
        } catch (error) {
            return null
        }
    }
    async findOne(query) {
        return await JobBoard.findOne(query)
    }
    async findById(id) {
        return await JobBoard.findById(id)
    }
    async findAll(query = {}) {
        return await JobBoard.find(query)
    }
    async update(id, data) {
        return await JobBoard.findByIdAndUpdate(id, data, { new: true })
    }
    async delete(id) {
        return await JobBoard.findByIdAndDelete(id)
    }
}

module.exports = JobBoardService
