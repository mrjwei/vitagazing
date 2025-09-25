const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const modelFactory = require("./factory")

async function hashPassword(next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
}

const User = modelFactory(
  "User",
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  (options = {
    pre: [
      {
        hook: "save",
        fn: hashPassword,
      },
    ],
  })
)

const WorkExperience = modelFactory("WorkExperience", {
  companyName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  responsibility: { type: String, required: true },
})

const Education = modelFactory("Education", {
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
})

const Skill = modelFactory("Skill", { name: { type: String, required: true } })

const Resume = modelFactory(
  "Resume",
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
    sections: {
      header: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        title: { type: String, required: true },
      },
      contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
      },
      summary: { type: String, required: true },
      workExperiences: { type: [WorkExperience.schema], default: [] },
      educations: { type: [Education.schema], default: [] },
      skills: { type: [Skill.schema], required: true },
    },
  },
  { timestamps: true }
)

const Template = modelFactory(
  "Template",
  {
    name: { type: String, required: true },
    description: { type: String },
    plan: {
      type: String,
      enum: ["Free", "Pro"],
      default: "Free",
      required: true,
    },
    layout: {
      type: {
        header: { type: Object, required: true },
        contact: { type: Object, required: true },
        summary: { type: Object, required: true },
        workExperiences: { type: Object, required: true },
        educations: { type: Object, required: true },
        skills: { type: Object, required: true },
      },
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = {
  User,
  Resume,
  Template,
  WorkExperience,
  Education,
  Skill,
}
