const { Resume } = require("../models")
const BaseService = require("./base")
const emitter = require("../events")
const { getResumeCreationStrategy } = require("../strategies/resumeCreation")

class ResumeService extends BaseService {
  constructor(strategyResolver = getResumeCreationStrategy) {
    super(Resume)
    this.strategyResolver = strategyResolver
  }

  async create(data) {
    try {
      const strategy = this.strategyResolver(data.templateId)
      const resume = await strategy.create({
        userId: data.userId,
        templateId: data.templateId,
        firstname: data.firstname,
        lastname: data.lastname,
        title: data.title,
        email: data.email,
        phone: data.phone,
        address: data.address,
        summary: data.summary,
        workExperiences: data.workExperiences,
        educations: data.educations,
        skills: data.skills,
      })
      emitter.emit("resumeCreated", resume)
      return resume
    } catch (error) {
      return null
    }
  }

  async findOne(query) {
    return await this.model.findOne(query)
  }

  async findById(id) {
    return await this.model.findById(id)
  }

  async findAll(query = {}) {
    return await this.model.find(query)
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    return await this.model.findByIdAndDelete(id)
  }
}

module.exports = ResumeService
