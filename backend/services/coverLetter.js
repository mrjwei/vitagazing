const { CoverLetter } = require("../models")
const BaseService = require("./base")

class CoverLetterService extends BaseService {
  async create(data) {
    const {
      userId,
      firstname,
      lastname,
      email,
      phone,
      creationDate,
      employer,
      body,
    } = data
    try {
      const coverLetter = await CoverLetter.create({
        userId,
        templateId,
        firstname,
        lastname,
        email,
        phone,
        creationDate,
        employer,
        body,
      })
      return coverLetter
    } catch (error) {
      return null
    }
  }
  async findOne(query) {
    return await CoverLetter.findOne(query)
  }
  async findById(id) {
    return await CoverLetter.findById(id)
  }
  async findAll(query = {}) {
    return await CoverLetter.find(query)
  }
  async update(id, data) {
    return await CoverLetter.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    return await CoverLetter.findByIdAndDelete(id)
  }
}

module.exports = CoverLetterService
