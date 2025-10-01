class ResumeTemplateStrategy {
    constructor({ id, name, component, premium = false }) {
      this.id = id
      this.name = name
      this.component = component
      this.premium = premium
    }
  
    getId() {
      return this.id
    }
  
    getName() {
      return this.name
    }
  
    getComponent() {
      return this.component
    }
  
    isPremium() {
      return this.premium
    }
  
    toConfig() {
      return {
        id: this.getId(),
        name: this.getName(),
        component: this.getComponent(),
        premium: this.isPremium(),
      }
    }
  }
  
  export default ResumeTemplateStrategy
  