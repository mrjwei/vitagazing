import { DefaultTemplate, DesignerTemplate, SoftwareEngineerTemplate } from "../components/resume-templates"

export const templates = [
  {id: "default", name: "Default", component: DefaultTemplate, premium: false},
  {id: "designer", name: "Designer", component: DesignerTemplate, premium: true},
  {id: "software_engineer", name: "Software Engineer", component: SoftwareEngineerTemplate, premium: true}
]
