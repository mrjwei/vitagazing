// config/db.js
const mongoose = require("mongoose");

// Set strictQuery explicitly to suppress the warning
//mongoose.set('strictQuery', true);

class DBConnection {
  constructor() {
    if (DBConnection.instance) {
      return DBConnection.instance;
    }
    DBConnection.instance = this;
    this.connection = null
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }
    try {
      this.connection = await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected successfully");
      return this.connection;
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
    }
  }
}

module.exports = new DBConnection();
