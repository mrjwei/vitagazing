import { DefaultTemplate, DesignerTemplate, SoftwareEngineerTemplate } from "../components/resume-templates"

export const templates = [
  {id: "default", name: "Default", component: DefaultTemplate},
  {id: "designer", name: "Designer", component: DesignerTemplate},
  {id: "software_engineer", name: "Software Engineer", component: SoftwareEngineerTemplate}
]
