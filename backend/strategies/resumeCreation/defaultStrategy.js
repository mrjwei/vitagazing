const ResumeCreationStrategy = require("./baseStrategy")
const { Resume } = require("../../models")
const emitter = require("../../events")

class DefaultResumeCreationStrategy extends ResumeCreationStrategy {
  async create(data) {
    const resume = await Resume.create(data)
    emitter.emit("resumeCreated", resume)
    return resume
  }
}

module.exports = DefaultResumeCreationStrategy