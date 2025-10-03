class Controller {
  constructor(service) {
    this.service = service
  }
  async create(req, res) {
    try {
      const data = this.constructData(req)
      const instance = await this.service.create(data)
      res.status(201).json(instance)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async fetchOne(req, res) {
    try {
      const query = this.constructQueryForOne(req)
      const instance = await this.service.findOne(query)
      if (!instance) {
        return res.status(404).json({ message: "Not found" })
      }
      res.json(instance)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async fetchAll(req, res) {
    try {
      const query = this.constructQueryForAll(req)
      const instances = await this.service.findAll(query)
      res.json(instances)
    } catch (error) {
      res.status(500).json({ message: error.message})
    }
  }
  async update(req, res) {
    try {
      const query = this.constructQueryForOne(req)
      const data = this.constructData(req)
      const instance = await this.service.update(query._id, data)
      if (!instance) {
        return res.status(404).json({ message: "Not found" })
      }
      res.json(instance)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async delete(req, res) {
    try {
      const query = this.constructQueryForOne(req)
      const instance = await this.service.delete(query._id)
      if (!instance) {
        return res.status(404).json({ message: "Not found" })
      }
      res.status(200).json({ message: "Deleted successfully" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  constructData(req) {
    return req.body
  }
  constructQueryForOne(req) {
    return { _id: req.params.id }
  }
  constructQueryForAll(req) {
    return {}
  }
}

module.exports = Controller
