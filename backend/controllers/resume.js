const ResumeService = require("../services/resume")
const BaseController = require("./base")
const { stripIds } = require("../lib/helpers")

class ResumeController extends BaseController {
  constructor() {
    super(new ResumeService())
  }

  constructData(req) {
    const {workExperiences, educations, skills, ...rest} = req.body
    return {
      ...rest,
      userId: req.user.id,
      workExperiences: stripIds(workExperiences || []),
      educations: stripIds(educations || []),
      skills: stripIds(skills || []),
    }
  }

  constructQueryForOne(req) {
    return { _id: req.params.id, userId: req.user.id }
  }

  constructQueryForAll(req) {
    return { userId: req.user.id }
  }
}

module.exports = ResumeController
