import ResumeTemplateContext from "./ResumeTemplateContext"
import ResumeTemplateStrategy from "./ResumeTemplateStrategy"
import {
  DefaultTemplate,
  DesignerTemplate,
  SoftwareEngineerTemplate,
} from "../components/resume-templates"

const strategyDefinitions = [
  {
    id: "default",
    name: "Default",
    component: DefaultTemplate,
    premium: false,
  },
  {
    id: "designer",
    name: "Designer",
    component: DesignerTemplate,
    premium: true,
  },
  {
    id: "software_engineer",
    name: "Software Engineer",
    component: SoftwareEngineerTemplate,
    premium: true,
  },
]

const strategies = strategyDefinitions.reduce((acc, definition) => {
  const strategy = new ResumeTemplateStrategy(definition)
  acc[definition.id] = strategy
  return acc
}, {})

const orderedIds = strategyDefinitions.map((definition) => definition.id)

const resumeTemplateContext = new ResumeTemplateContext(
  strategies,
  "default",
  orderedIds
)

const listResumeTemplateStrategies = () => resumeTemplateContext.listStrategies()

const getResumeTemplateStrategy = (templateId) =>
  resumeTemplateContext.resolveStrategy(templateId)

const getResumeTemplateComponent = (templateId) =>
  resumeTemplateContext.getComponent(templateId)

export {
  ResumeTemplateContext,
  ResumeTemplateStrategy,
  resumeTemplateContext,
  listResumeTemplateStrategies,
  getResumeTemplateStrategy,
  getResumeTemplateComponent,
}
