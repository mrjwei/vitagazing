const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const sinon = require("sinon")
const ResumeController = require("../controllers/resume")
const ResumeService = require("../services/resume")
const { expect } = chai

chai.use(chaiHttp)

const resumeController = new ResumeController()

describe("Resume creation", () => {
  const req = {
    user: { id: new mongoose.Types.ObjectId() },
    body: {
      templateId: new mongoose.Types.ObjectId(),
      firstname: "John",
      lastname: "Doe",
      title: "Software Engineer",
      email: "john@mail.com",
      phone: "0000111222",
      address: "1 Infinite Loop, Cupertino, CA",
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
      skills: [{ name: "Java" }, { name: "C++" }, { name: "Python" }],
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

    const stub = sinon.stub(ResumeService.prototype, "create").resolves(newResume)

    await resumeController.create(req, res)

    expect(stub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true
    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith(newResume)).to.be.true

    stub.restore()
  })

  it("should return 500 if an error occurs", async () => {
    const stub = sinon.stub(ResumeService.prototype, "create").throws(new Error("Server Error"))

    await resumeController.create(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Server Error" })).to.be.true

    stub.restore()
  })
})

describe("Resume fetching", () => {
  it("should return all resumes of a user", async () => {
    const resumes = [
      {
        templateId: new mongoose.Types.ObjectId(),
        firstname: "John",
        lastname: "Doe",
        title: "Software Engineer",
        email: "john@mail.com",
        phone: "0000111222",
        address: "1 Infinite Loop, Cupertino, CA",
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
        skills: [{ name: "Java" }, { name: "C++" }, { name: "Python" }],
      },
      {
        templateId: new mongoose.Types.ObjectId(),
        firstname: "Alice",
        lastname: "Wong",
        title: "Designer",
        email: "alice@mail.com",
        phone: "6666777888",
        address: "42 Wallaby Way, Sydney, AU",
        summary: "This is another sample summary.",
        workExperiences: [
          {
            companyName: "Fake Company 1",
            startDate: "2020-01-20",
            endDate: "2022-10-30",
            responsibility: "Fake responsibility description",
          },
          {
            companyName: "Fake Company 2",
            startDate: "2023-02-01",
            endDate: "2025-07-31",
            responsibility: "Fake responsibility description 2",
          },
        ],
        educations: [
          {
            degree: "Bachelor of Education",
            institution: "The University of Queensland",
            startDate: "2011-11-01",
            endDate: "2015-10-31",
          },
          {
            degree: "Master of Design",
            institution: "Queensland University of Technology",
            startDate: "2016-01-01",
            endDate: "2016-12-31",
          },
        ],
        skills: [{ name: "Photoshop" }, { name: "Illustrator" }, { name: "Figma" }],
      },
    ]
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const stub = sinon.stub(ResumeService.prototype, "findAll").resolves(resumes)

    await resumeController.fetchAll(req, res)

    expect(stub.calledOnceWith({ userId: req.user.id })).to.be.true
    expect(res.json.calledWith(resumes)).to.be.true

    stub.restore()
  })

  it("should be able to return a single resume of a user", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const resume = {
        templateId: new mongoose.Types.ObjectId(),
        firstname: "John",
        lastname: "Doe",
        title: "Software Engineer",
        email: "john@mail.com",
        phone: "0000111222",
        address: "1 Infinite Loop, Cupertino, CA",
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
        skills: [{ name: "Java" }, { name: "C++" }, { name: "Python" }],
      }
    const stub = sinon.stub(ResumeService.prototype, "findOne").resolves(resume)

    await resumeController.fetchOne(req, res)

    expect(stub.calledOnceWith({ _id: req.params.id, userId: req.user.id })).to
      .be.true
    expect(res.json.calledWith(resume)).to.be.true

    stub.restore()
  })

  it("should return 404 if the resume was not found", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const resume = null

    const stub = sinon.stub(ResumeService.prototype, "findOne").resolves(resume)

    await resumeController.fetchOne(req, res)

    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "Resume not found" })).to.be.true

    stub.restore()
  })

  it("should return 500 if an error other than not-found occurs", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }

    const stub = sinon.stub(ResumeService.prototype, "findOne").throws(new Error("Server Error"))

    await resumeController.fetchOne(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Server Error" })).to.be.true

    stub.restore()
  })
})

describe("Resume updating", () => {
  it("should update a resume successfully", async () => {
    const resume = {
        templateId: new mongoose.Types.ObjectId(),
        firstname: "John",
        lastname: "Doe",
        title: "Software Engineer",
        email: "john@mail.com",
        phone: "0000111222",
        address: "1 Infinite Loop, Cupertino, CA",
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
        skills: [{ name: "Java" }, { name: "C++" }, { name: "Python" }],
        save: sinon.stub().returnsThis(),
      }
    const req = {
      body: {
        ...resume,
        firstname: "Alice",
        workExperiences: [
          ...resume.workExperiences,
          {
            companyName: "Sample Company 3",
            startDate: "2025-08-01",
            endDate: "2025-08-11",
            responsibility: "Sample responsibility description 3",
          },
        ],
        templateId: new mongoose.Types.ObjectId(),
      },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const stub = sinon.stub(ResumeService.prototype, "findById").resolves(resume)

    await resumeController.update(req, res)

    expect(stub.calledOnceWith(req.params.id)).to.be.true
    expect(resume.save.calledOnce).to.be.true
    expect(resume.firstname).to.equal(req.body.firstname)
    expect(resume.workExperiences).to.deep.equal(req.body.workExperiences)
    expect(resume.template).to.equal(req.body.template)
    expect(res.json.calledWith({ ...req.body }))

    stub.restore()
  })

  it("should return 404 if the resume was not found", async () => {
    const resume = {
        templateId: new mongoose.Types.ObjectId(),
        firstname: "John",
        lastname: "Doe",
        title: "Software Engineer",
        email: "john@mail.com",
        phone: "0000111222",
        address: "1 Infinite Loop, Cupertino, CA",
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
        skills: [{ name: "Java" }, { name: "C++" }, { name: "Python" }],
        save: sinon.stub().returnsThis(),
      }
    const req = {
      body: {
        ...resume,
        firstname: "Alice",
        workExperiences: [
          ...resume.workExperiences,
          {
            companyName: "Sample Company 3",
            startDate: "2025-08-01",
            endDate: "2025-08-11",
            responsibility: "Sample responsibility description 3",
          },
        ],
      },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const nullResume = null

    const stub = sinon.stub(ResumeService.prototype, "findById").resolves(nullResume)

    await resumeController.update(req, res)

    expect(stub.calledOnceWith(req.params.id)).to.be.true
    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "Resume not found" })).to.be.true

    stub.restore()
  })

  it("should return 500 if an error other than not-found occurs when trying to find the resume", async () => {
    const resume = {
        templateId: new mongoose.Types.ObjectId(),
        firstname: "John",
        lastname: "Doe",
        title: "Software Engineer",
        email: "john@mail.com",
        phone: "0000111222",
        address: "1 Infinite Loop, Cupertino, CA",
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
        skills: [{ name: "Java" }, { name: "C++" }, { name: "Python" }],
        save: sinon.stub().returnsThis(),
      }
    const req = {
      body: resume,
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }

    const stub = sinon.stub(ResumeService.prototype, "findById").throws(new Error('An unknown error occurred'))

    await resumeController.update(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: 'An unknown error occurred' })).to.be.true

    stub.restore()
  })

  it("should return 500 if an error other than not-found occurs when trying to save", async () => {
    const resume = {
        templateId: new mongoose.Types.ObjectId(),
        firstname: "John",
        lastname: "Doe",
        title: "Software Engineer",
        email: "john@mail.com",
        phone: "0000111222",
        address: "1 Infinite Loop, Cupertino, CA",
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
        skills: [{ name: "Java" }, { name: "C++" }, { name: "Python" }],
        save: sinon.stub().throws(new Error('Failed to save')),
      }
    const req = {
      body: resume,
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }

    const stub = sinon.stub(ResumeService.prototype, "findById").resolves(resume)

    await resumeController.update(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: 'Failed to save' })).to.be.true

    stub.restore()
  })
})

describe('Resume deletion', () => {
  it('should delete the resume successfully', async () => {
    const resume = {
      remove: sinon.stub().resolves(),
    }
    const req = {
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      json: sinon.spy(),
    }
    const stub = sinon.stub(ResumeService.prototype, 'findById').resolves(resume)

    await resumeController.delete(req, res)

    expect(stub.calledOnceWith(req.params.id)).to.be.true
    expect(resume.remove.calledOnce).to.be.true
    expect(res.json.calledWith({message: "Resume deleted"})).to.be.true

    stub.restore()
  })
})
