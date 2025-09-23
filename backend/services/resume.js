const { Resume } = require("../models")
const BaseService = require("./base")

class ResumeService extends BaseService {
  async create(data) {
    const {
      userId,
      templateId,
      firstname,
      lastname,
      title,
      email,
      phone,
      address,
      summary,
      workExperiences,
      educations,
      skills,
    } = data
    try {
      const resume = await Resume.create({
        userId,
        templateId,
        firstname,
        lastname,
        title,
        email,
        phone,
        address,
        summary,
        workExperiences,
        educations,
        skills,
      })
      return resume
    } catch (error) {
      return null
    }
  }
  async findOne(query) {
    return await Resume.findOne(query)
  }
  async findById(id) {
    return await Resume.findById(id)
  }
  async findAll(query = {}) {
    return await Resume.find(query)
  }
  async update(id, data) {
    return await Resume.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    return await Resume.findByIdAndDelete(id)
  }
}

module.exports = ResumeService
