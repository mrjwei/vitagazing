const bcrypt = require("bcrypt")
const UserService = require("../services/user")
const BaseController = require("./base")
const { generateToken } = require("../lib/helpers");

class UserController extends BaseController {
  constructor() {
    super(new UserService())
  }

  // Override create method for user registration
  async create(req, res) {
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

  // New method for user login
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

  // New method to fetch user profile
  async fetchById(req, res) {
    try {
      const user = await this.service.findById(req.user.id)
      if (!user) {
        return res.status(404).json({ message: "Not found" })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // Override update method for user profile update
  async update(req, res) {
    try {
      const user = await this.service.findById(req.user.id)
      if (!user) return res.status(404).json({ message: "User not found" })

      const { username, email, university, address, subscribed } = req.body
      user.username = username || user.username
      user.email = email || user.email
      user.university = university || user.university
      user.address = address || user.address
      user.subscribed = subscribed !== undefined ? subscribed : user.subscribed

      const updatedUser = await user.save()
      res.json({
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        university: updatedUser.university,
        address: updatedUser.address,
        subscribed: updatedUser.subscribed,
        token: generateToken(updatedUser.id),
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = UserController
