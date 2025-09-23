class BaseService {
  constructor(model) {
    this.model = model
  }
  async create(data) {
    const instance = new this.model.create(data)
    return instance
  }
  async findOne(query) {
    return this.model.findOne(query)
  }
  async findAll(query) {
    return this.model.find(query)
  }
  async update(id, data) {
    await this.model.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    await this.model.findByIdAndDelete(id)
  }
}

module.exports = BaseService
