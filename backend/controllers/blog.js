const BlogService = require("../services/blog")
const BaseController = require("./base")

class BlogController extends BaseController {
  constructor() {
    super(new BlogService())
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

module.exports = BlogController
