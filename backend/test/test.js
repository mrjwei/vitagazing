const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const sinon = require("sinon")
const {
  createResume,
  updateResume,
  fetchResume,
  fetchResumes,
  deleteResume,
} = require("../controllers/resuemController")
const Resume = require("../models/Resume")
const { expect } = chai

chai.use(chaiHttp)

describe("Resume creation", () => {
  const req = {
    user: { id: new mongoose.Types.ObjectId() },
    body: {
      firstname: "John",
      lastname: "Doe",
      email: "john@mail.com",
      phone: "0000111222",
      summary: "This is a sample summary.",
      workExperiences: [
        {
          companyName: "Sample Company 1",
          startDate: "2020-01-20",
          endDate: "2022-10-30",
          responsibility: "Sample responsibility description",
        },
        {
          companyName: "Sample Company 2",
          startDate: "2023-02-01",
          endDate: "2025-07-31",
          responsibility: "Sample responsibility description 2",
        },
      ],
      educations: [
        {
          degree: "Bachelor of Engineering",
          institution: "The University of Queensland",
          startDate: "2010-02-01",
          endDate: "2014-01-31",
        },
        {
          degree: "Master of IT",
          institution: "Queensland University of Technology",
          startDate: "2014-07-01",
          endDate: "2015-06-30",
        },
      ],
    },
  }
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.spy(),
  }

  it("should create a new resume successfully", async () => {
    const newResume = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      userId: req.user.id,
    }

    const stub = sinon.stub(Resume, "create").resolves(newResume)

    await createResume(req, res)

    expect(stub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true
    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith(newResume)).to.be.true

    stub.restore()
  })

  it("should return 500 if an error occurs", async () => {
    const stub = sinon.stub(Resume, "create").throws(new Error("Server Error"))

    await createResume(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Server Error" })).to.be.true

    stub.restore()
  })
})
})
