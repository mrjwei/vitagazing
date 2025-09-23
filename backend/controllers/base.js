const BaseService = require("../services/base")

class Controller {
  constructor() {
    this.service = new BaseService()
  }
  async create(req, res) {
    try {
      const instance = await this.service.create(req.body)
      res.status(201).json(instance)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async fetchOne(req, res) {
    try {
      const instance = await this.service.findOne({ _id: req.params.id })
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
      const instances = await this.service.findAll()
      res.json(instances)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async update(req, res) {
    try {
      const instance = await this.service.update(req.params.id, req.body)
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
      const instance = await this.service.delete(req.params.id)
      if (!instance) {
        return res.status(404).json({ message: "Not found" })
      }
      res.json({ message: "Deleted successfully" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = Controller
