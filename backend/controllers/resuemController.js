const Resume = require("../models/Resume")

const createResume = async (req, res) => {
  const { firstname, lastname, email, phone, summary, workExperiences = [] } = req.body
    const stripIds = arr => Array.isArray(arr)
    ? arr.map(({ id, ...rest }) => rest)
    : [];
  try {
    const resume = await Resume.create({
      userId: req.user.id,
      firstname,
      lastname,
      email,
      phone,
      summary,
      workExperiences: stripIds(workExperiences),
    })
    res.status(201).json(resume)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const fetchResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
    res.json(resumes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateResume = async (req, res) => {
  const { firstname, lastname, email, phone, summary, workExperiences = [] } = req.body
  try {
    const resume = await Resume.findById(req.params.id)
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" })
    }
    resume.firstname = firstname || resume.firstname
    resume.lastname = lastname || resume.lastname
    resume.email = email || resume.email
    resume.phone = phone || resume.phone
    resume.summary = summary || resume.summary
    resume.workExperiences = workExperiences || resume.workExperiences
    const updatedResume = await resume.save()
    res.json(updatedResume)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
    if (!resume) {
      return res.status(404).json({message: "Resume not found"})
    }
    await resume.remove()
    res.json({message: "Resume deleted"})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  createResume,
  fetchResumes,
  updateResume,
  deleteResume,
}
