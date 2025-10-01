class ResumeTemplateContext {
    constructor(strategies, defaultStrategyId, orderedIds = Object.keys(strategies)) {
      this.strategies = strategies
      this.defaultStrategyId = defaultStrategyId
      this.orderedIds = orderedIds
    }
  
    resolveStrategy(templateId) {
      if (!templateId) {
        return this.getDefaultStrategy()
      }
  
      return this.strategies[templateId] || this.getDefaultStrategy()
    }
  
    getDefaultStrategy() {
      return this.strategies[this.defaultStrategyId]
    }
  
    getComponent(templateId) {
      return this.resolveStrategy(templateId).getComponent()
    }
  
    listStrategies() {
      return this.orderedIds
        .map((strategyId) => this.strategies[strategyId])
        .filter(Boolean)
    }
  }
  
  export default ResumeTemplateContext
  