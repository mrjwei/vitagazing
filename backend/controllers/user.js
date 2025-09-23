const bcrypt = require("bcrypt")
const UserService = require("../services/user")
const { generateToken } = require("../lib/helpers");

class UserController {
  constructor() {
    this.service = new UserService()
  }

  async register(req, res) {
    const { username, email, password } = req.body
    try {
      const userExists = await this.service.findOne({ email })
      if (userExists)
        return res.status(400).json({ message: "User already exists" })

      const user = await this.service.create({ username, email, password })
      res.status(201).json({
        ...user,
        token: generateToken(user.id),
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async login(req, res) {
    const { email, password } = req.body
    try {
      const user = await this.service.findOne({ email })
      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
          ...user,
          token: generateToken(user.id),
        })
      } else {
        res.status(401).json({ message: "Invalid email or password" })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async fetchOne(req, res) {
    try {
      const user = await this.service.findOne({ _id: req.params.id })
      if (!user) {
        return res.status(404).json({ message: "Not found" })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async fetchAll(req, res) {
    try {
      const users = await this.service.findAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async update(req, res) {
    try {
      const user = await this.service.findById(req.user.id)
      if (!user) return res.status(404).json({ message: "User not found" })

      const { name, email, university, address } = req.body
      user.name = name || user.name
      user.email = email || user.email
      user.university = university || user.university
      user.address = address || user.address

      const updatedUser = await user.save()
      res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        university: updatedUser.university,
        address: updatedUser.address,
        token: generateToken(updatedUser.id),
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = UserController
