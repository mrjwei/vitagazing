const ResumeCreationStrategy = require("./baseStrategy")
const { Resume } = require("../../models")
const emitter = require("../../events")

class PremiumResumeCreationStrategy extends ResumeCreationStrategy {
  async create(data) {
    const sanitizedSkills = (data.skills || []).filter(Boolean)
    const resume = await Resume.create({
      ...data,
      templateId: data.templateId || "premium",
      skills: sanitizedSkills,
    })
    emitter.emit("resumeCreated", resume)
    return resume
  }
}

module.exports = PremiumResumeCreationStrategy