const DefaultResumeCreationStrategy = require("./defaultStrategy")
const PremiumResumeCreationStrategy = require("./premiumStrategy")

const strategies = {
  default: new DefaultResumeCreationStrategy(),
  premium: new PremiumResumeCreationStrategy(),
}

const getResumeCreationStrategy = (templateId = "default") => {
  return strategies[templateId] || strategies.default
}

module.exports = {
  getResumeCreationStrategy,
  strategies,
}