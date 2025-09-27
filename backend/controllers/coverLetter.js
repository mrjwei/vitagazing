const CoverLetterService = require("../services/coverLetter")

class CoverLetterController {
  constructor() {
    this.service = new CoverLetterService()
  }

  async create(req, res) {
    const {
      firstname,
      lastname,
      email,
      phone,
      creationDate,
      employer,
      body
    } = req.body
    try {
      const coverLetter = await this.service.create({
        userId: req.user.id,
        firstname,
        lastname,
        email,
        phone,
        creationDate,
        employer,
        body
      })
      return res.status(201).json(coverLetter)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  async fetchAll(req, res) {
    try {
      const coverLetters = await this.service.findAll({ userId: req.user.id })
      res.status(200).json(coverLetters)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async fetchOne(req, res) {
    try {
      const coverLetter = await this.service.findOne({
        _id: req.params.id,
        userId: req.user.id,
      })
      if (!coverLetter) {
        return res.status(404).json({ message: "Cover letter not found" })
      }
      res.json(coverLetter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async update(req, res) {
    const {
      userId,
      firstname,
      lastname,
      email,
      phone,
      creationDate,
      employer,
      body
    } = req.body
    try {
      const coverLetter = await this.service.findById(req.params.id)
      if (!coverLetter) {
        return res.status(404).json({ message: "Cover letter not found" })
      }
      coverLetter.firstname = firstname || coverLetter.firstname
      coverLetter.lastname = lastname || coverLetter.lastname
      coverLetter.email = email || coverLetter.email
      coverLetter.phone = phone || coverLetter.phone
      coverLetter.creationDate = creationDate || coverLetter.creationDate
      coverLetter.employer = employer || coverLetter.employer
      coverLetter.body = body || coverLetter.body
      coverLetter.email = email || coverLetter.email
      coverLetter.phone = phone || coverLetter.phone
      coverLetter.address = address || coverLetter.address
      coverLetter.summary = summary || coverLetter.summary
      coverLetter.workExperiences = workExperiences || coverLetter.workExperiences
      coverLetter.educations = educations || coverLetter.educations
      coverLetter.skills = skills || coverLetter.skills
      const updatedCoverLetter = await coverLetter.save()
      res.json(updatedCoverLetter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async delete(req, res) {
    try {
      const coverLetter = await this.service.findById(req.params.id)
      if (!coverLetter) {
        return res.status(404).json({ message: "Cover letter not found" })
      }
      await coverLetter.remove()
      res.json({ message: "Cover letter deleted" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = CoverLetterController
