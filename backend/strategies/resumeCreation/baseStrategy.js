class ResumeCreationStrategy {
    async create() {
      throw new Error("create() must be implemented by subclasses")
    }
  }
  
  module.exports = ResumeCreationStrategy