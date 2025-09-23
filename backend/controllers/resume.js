const ResumeService = require("../services/resume")
const { stripIds } = require("../lib/helpers")

class ResumeController {
  constructor() {
    this.service = new ResumeService()
  }

  async create(req, res) {
    const {
      templateId = null,
      firstname,
      lastname,
      title,
      email,
      phone,
      address,
      summary,
      workExperiences = [],
      educations = [],
      skills = [],
    } = req.body
    try {
      const resume = await this.service.create({
        userId: req.user.id,
        templateId,
        firstname,
        lastname,
        title,
        email,
        phone,
        address,
        summary,
        workExperiences: stripIds(workExperiences),
        educations: stripIds(educations),
        skills: stripIds(skills),
      })
      res.status(201).json(resume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async fetchAll(req, res) {
    try {
      const resumes = await this.service.findAll({ userId: req.user.id })
      res.status(200).json(resumes)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async fetchOne(req, res) {
    try {
      const resume = await this.service.findOne({
        _id: req.params.id,
        userId: req.user.id,
      })
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" })
      }
      res.json(resume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async update(req, res) {
    const {
      templateId,
      firstname,
      lastname,
      title,
      email,
      phone,
      address,
      summary,
      workExperiences = [],
      educations = [],
      skills = [],
    } = req.body
    try {
      const resume = await this.service.findById(req.params.id)
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" })
      }
      resume.templateId = templateId || resume.templateId
      resume.firstname = firstname || resume.firstname
      resume.lastname = lastname || resume.lastname
      resume.title = title || resume.title
      resume.email = email || resume.email
      resume.phone = phone || resume.phone
      resume.address = address || resume.address
      resume.summary = summary || resume.summary
      resume.workExperiences = workExperiences || resume.workExperiences
      resume.educations = educations || resume.educations
      resume.skills = skills || resume.skills
      const updatedResume = await resume.save()
      res.json(updatedResume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async delete(req, res) {
    try {
      const resume = await this.service.findById(req.params.id)
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" })
      }
      await resume.remove()
      res.json({ message: "Resume deleted" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = ResumeController
