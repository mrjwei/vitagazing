const {User} = require("../models");
const BaseService = require("./base");

class UserService extends BaseService {
  async create(data) {
    const { username, email, password } = data
    try {
      const userExists = await this.findOne(email)
      if (userExists) {
        return null
      }
      const user = await User.create({ username, email, password })
      return user
    } catch (error) {
      return null
    }
  }
  async findOne(query) {
    return await User.findOne(query);
  }
  async findAll() {
    return await User.find();
  }
  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = UserService
