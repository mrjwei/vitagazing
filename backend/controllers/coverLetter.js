const CoverLetterService = require("../services/coverLetter")
const BaseController = require("./base")

class CoverLetterController extends BaseController {
  constructor() {
    super(new CoverLetterService())
  }

  constructData(req) {
    return {
      ...req.body,
      userId: req.user.id,
    }
  }

  constructQueryForOne(req) {
    return { _id: req.params.id, userId: req.user.id }
  }

  constructQueryForAll(req) {
    return { userId: req.user.id }
  }
}

module.exports = CoverLetterController
