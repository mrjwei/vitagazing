const { Blog } = require("../models")
const BaseService = require("./base")

class BlogService extends BaseService {
  async create(data) {
    const { userId, title, content, tags = [] } = data
    try {
      const blog = await Blog.create({
        userId,
        title,
        content,
        tags,
      })
      return blog
    } catch (error) {
      return null
    }
  }
  async findOne(query) {
    return await Blog.findOne(query)
  }
  async findById(id) {
    return await Blog.findById(id)
  }
  async findAll(query = {}) {
    return await Blog.find(query)
  }
  async update(id, data) {
    return await Blog.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    return await Blog.findByIdAndDelete(id)
  }
}

module.exports = BlogService
