const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const sinon = require("sinon")
const ResumeController = require("../controllers/resume")
const CoverLetterController = require("../controllers/coverLetter")
const UserController = require("../controllers/user")
const BlogController = require("../controllers/blog")
const ResumeService = require("../services/resume")
const CoverLetterService = require("../services/coverLetter")
const UserService = require("../services/user")
const BlogService = require("../services/blog")
const { expect } = chai

chai.use(chaiHttp)

const resumeController = new ResumeController()
const coverLetterController = new CoverLetterController()
const userController = new UserController()
const blogController = new BlogController()

// Resume
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

    const stub = sinon
      .stub(ResumeService.prototype, "create")
      .resolves(newResume)

    await resumeController.create(req, res)

    expect(stub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true
    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith(newResume)).to.be.true

    stub.restore()
  })

  it("should return 500 if an error occurs", async () => {
    const stub = sinon
      .stub(ResumeService.prototype, "create")
      .throws(new Error("Server Error"))

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
        skills: [
          { name: "Photoshop" },
          { name: "Illustrator" },
          { name: "Figma" },
        ],
      },
    ]
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const stub = sinon
      .stub(ResumeService.prototype, "findAll")
      .resolves(resumes)

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
    expect(res.json.calledWith({ message: "Not found" })).to.be.true

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

    const stub = sinon
      .stub(ResumeService.prototype, "findOne")
      .throws(new Error("Server Error"))

    await resumeController.fetchOne(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Server Error" })).to.be.true

    stub.restore()
  })
})

describe("Resume updating", () => {
  const defaultBody = {
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

  const buildReq = () => ({
    user: { id: new mongoose.Types.ObjectId() },
    params: { id: new mongoose.Types.ObjectId() },
    body: { ...defaultBody },
  })

  const buildRes = () => ({
    status: sinon.stub().returnsThis(),
    json: sinon.spy(),
  })

  it("should update a resume successfully", async () => {
    const req = buildReq()
    const res = buildRes()
    const updatedResume = { _id: req.params.id, ...req.body, userId: req.user.id }

    const stub = sinon
      .stub(ResumeService.prototype, "update")
      .resolves(updatedResume)

    await resumeController.update(req, res)

    expect(
      stub.calledOnceWith(req.params.id, { userId: req.user.id, ...req.body })
    ).to.be.true
    expect(res.json.calledWith(updatedResume)).to.be.true

    stub.restore()
  })

  it("should return 404 if the resume was not found", async () => {
    const req = buildReq()
    const res = buildRes()

    const nullResume = null

    const stub = sinon
      .stub(ResumeService.prototype, "update")
      .resolves(nullResume)

    await resumeController.update(req, res)

    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "Not found" })).to.be.true

    stub.restore()
  })

  it("should return 500 if an error other than not-found occurs when trying to find the resume", async () => {
    const req = buildReq()
    const res = buildRes()

    const stub = sinon
      .stub(ResumeService.prototype, "update")
      .throws(new Error("An unknown error occurred"))

    await resumeController.update(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "An unknown error occurred" })).to.be
      .true

    stub.restore()
  })
})

describe("Resume deletion", () => {
  it("should delete the resume successfully", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    }
    const stub = sinon
      .stub(ResumeService.prototype, "delete")
      .resolves({ _id: req.params.id })

    await resumeController.delete(req, res)

    expect(stub.calledOnceWith(req.params.id)).to.be.true
    expect(res.json.calledWith({ message: "Deleted successfully" })).to.be.true

    stub.restore()
  })
})

// Cover letter
describe("Cover letter creation", () => {
  const req = {
    user: { id: new mongoose.Types.ObjectId() },
    body: {
      firstname: "John",
      lastname: "Doe",
      email: "john@mail.com",
      phone: "0000111222",
      creationDate: "2024-10-01",
      employer: "Sample Employer",
      body: "This is a sample cover letter body.",
    },
  }
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.spy(),
  }

  it("should create a new cover letter successfully", async () => {
    const newCoverLetter = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      userId: req.user.id,
    }

    const stub = sinon
      .stub(CoverLetterService.prototype, "create")
      .resolves(newCoverLetter)

    await coverLetterController.create(req, res)

    expect(stub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true
    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith(newCoverLetter)).to.be.true

    stub.restore()
  })

  it("should return 500 if an error occurs", async () => {
    const stub = sinon
      .stub(CoverLetterService.prototype, "create")
      .throws(new Error("Server Error"))

    await coverLetterController.create(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Server Error" })).to.be.true

    stub.restore()
  })
})

describe("Cover letter fetching", () => {
  it("should return all cover letters of a user", async () => {
    const coverLetters = [
      {
        firstname: "John",
        lastname: "Doe",
        email: "john@mail.com",
        phone: "0000111222",
        creationDate: "2024-10-01",
        employer: "Sample Employer",
        body: "This is a sample cover letter body.",
      },
      {
        firstname: "Alice",
        lastname: "Wong",
        email: "alice@mail.com",
        phone: "6666777888",
        creationDate: "2024-09-15",
        employer: "Another Employer",
        body: "This is another sample cover letter body.",
      },
    ]
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const stub = sinon
      .stub(CoverLetterService.prototype, "findAll")
      .resolves(coverLetters)

    await coverLetterController.fetchAll(req, res)

    expect(stub.calledOnceWith({ userId: req.user.id })).to.be.true
    expect(res.json.calledWith(coverLetters)).to.be.true

    stub.restore()
  })

  it("should be able to return a single cover letter of a user", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const coverLetter = {
      firstname: "John",
      lastname: "Doe",
      email: "john@mail.com",
      phone: "0000111222",
      creationDate: "2024-10-01",
      employer: "Sample Employer",
      body: "This is a sample cover letter body.",
    }
    const stub = sinon
      .stub(CoverLetterService.prototype, "findOne")
      .resolves(coverLetter)

    await coverLetterController.fetchOne(req, res)

    expect(stub.calledOnceWith({ _id: req.params.id, userId: req.user.id })).to
      .be.true
    expect(res.json.calledWith(coverLetter)).to.be.true

    stub.restore()
  })

  it("should return 404 if the cover letter was not found", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const coverLetter = null

    const stub = sinon
      .stub(CoverLetterService.prototype, "findOne")
      .resolves(coverLetter)

    await coverLetterController.fetchOne(req, res)

    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "Not found" })).to.be.true

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

    const stub = sinon
      .stub(CoverLetterService.prototype, "findOne")
      .throws(new Error("Server Error"))

    await coverLetterController.fetchOne(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Server Error" })).to.be.true

    stub.restore()
  })
})

describe("Cover Letter updating", () => {
  it("should update a cover letter successfully", async () => {
    const coverLetter = {
      firstname: "John",
      lastname: "Doe",
      email: "john@mail.com",
      phone: "0000111222",
      creationDate: "2024-10-01",
      employer: "Sample Employer",
      body: "This is a sample cover letter body.",
      save: sinon.stub().returnsThis(),
    }
    const req = {
      body: {
        ...coverLetter,
        firstname: "Alice",
        employer: "Another Employer",
      },
      params: { id: new mongoose.Types.ObjectId() },
      user: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const stub = sinon
      .stub(CoverLetterService.prototype, "update")
      .resolves(coverLetter)

    await coverLetterController.update(req, res)

    expect(stub.calledOnceWith(req.params.id, { userId: req.user.id, ...req.body })).to.be.true

    stub.restore()
  })

  it("should return 404 if the cover letter was not found", async () => {
    const coverLetter = {
      firstname: "John",
      lastname: "Doe",
      email: "john@mail.com",
      phone: "0000111222",
      creationDate: "2024-10-01",
      employer: "Sample Employer",
      body: "This is a sample cover letter body.",
      save: sinon.stub().returnsThis(),
    }
    const req = {
      body: {
        ...coverLetter,
        firstname: "Alice",
        employer: "Another Employer",
      },
      params: { id: new mongoose.Types.ObjectId() },
      user: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const nullCoverLetter = null

    const stub = sinon
      .stub(CoverLetterService.prototype, "update")
      .resolves(nullCoverLetter)

    await coverLetterController.update(req, res)

    expect(stub.calledOnceWith(req.params.id, { userId: req.user.id, ...req.body })).to.be.true
    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "Not found" })).to.be
      .true

    stub.restore()
  })

  it("should return 500 if an error other than not-found occurs when trying to find the cover letter", async () => {
    const coverLetter = {
      firstname: "John",
      lastname: "Doe",
      email: "john@mail.com",
      phone: "0000111222",
      creationDate: "2024-10-01",
      employer: "Sample Employer",
      body: "This is a sample cover letter body.",
      save: sinon.stub().returnsThis(),
    }
    const req = {
      body: coverLetter,
      params: { id: new mongoose.Types.ObjectId() },
      user: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }

    const stub = sinon
      .stub(CoverLetterService.prototype, "update")
      .throws(new Error("An unknown error occurred"))

    await coverLetterController.update(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "An unknown error occurred" })).to.be
      .true

    stub.restore()
  })
})

describe("Cover Letter deletion", () => {
  it("should delete the cover letter successfully", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    }
    const stub = sinon
      .stub(CoverLetterService.prototype, "delete")
      .resolves({ _id: req.params.id })

    await coverLetterController.delete(req, res)

    expect(stub.calledOnceWith(req.params.id)).to.be.true
    expect(res.json.calledWith({ message: "Deleted successfully" })).to.be.true

    stub.restore()
  })
})

// Blog
describe("Blog creation", () => {
  const defaultBody = {
    title: "My first blog",
    content: "This is a detailed blog post.",
    tags: ["career", "tips"],
  }

  const buildReq = () => ({
    user: { id: new mongoose.Types.ObjectId() },
    body: { ...defaultBody },
  })

  const buildRes = () => ({
    status: sinon.stub().returnsThis(),
    json: sinon.spy(),
  })

  it("should create a new blog successfully", async () => {
    const req = buildReq()
    const res = buildRes()
    const createdBlog = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      userId: req.user.id,
    }

    const stub = sinon
      .stub(BlogService.prototype, "create")
      .resolves(createdBlog)

    await blogController.create(req, res)

    expect(stub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true
    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith(createdBlog)).to.be.true

    stub.restore()
  })

  it("should not mutate the request body when creating a blog", async () => {
    const req = buildReq()
    const res = buildRes()

    const stub = sinon.stub(BlogService.prototype, "create").resolves(null)

    await blogController.create(req, res)

    expect(req.body).to.deep.equal(defaultBody)

    stub.restore()
  })

  it("should respond with null payload when the service returns null", async () => {
    const req = buildReq()
    const res = buildRes()

    const stub = sinon.stub(BlogService.prototype, "create").resolves(null)

    await blogController.create(req, res)

    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith(null)).to.be.true

    stub.restore()
  })

  it("should return 500 if blog creation throws an error", async () => {
    const req = buildReq()
    const res = buildRes()

    const stub = sinon
      .stub(BlogService.prototype, "create")
      .throws(new Error("Server Error"))

    await blogController.create(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Server Error" })).to.be.true

    stub.restore()
  })
})

describe("Blog reading", () => {
  it("should fetch all blogs for a user", async () => {
    const req = { user: { id: new mongoose.Types.ObjectId() } }
    const res = { json: sinon.spy() }
    const blogs = [
      {
        _id: new mongoose.Types.ObjectId(),
        userId: req.user.id,
        title: "Productivity hacks",
        content: "Useful hacks for productivity.",
        tags: ["productivity"],
      },
    ]

    const stub = sinon.stub(BlogService.prototype, "findAll").resolves(blogs)

    await blogController.fetchAll(req, res)

    expect(stub.calledOnceWith({ userId: req.user.id })).to.be.true
    expect(res.json.calledWith(blogs)).to.be.true

    stub.restore()
  })

  it("should return 500 when fetching all blogs fails", async () => {
    const req = { user: { id: new mongoose.Types.ObjectId() } }
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }

    const stub = sinon
      .stub(BlogService.prototype, "findAll")
      .throws(new Error("Database error"))

    await blogController.fetchAll(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Database error" })).to.be.true

    stub.restore()
  })

  it("should fetch a single blog by id", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = { json: sinon.spy() }
    const blog = {
      _id: req.params.id,
      userId: req.user.id,
      title: "Interview preparation",
      content: "Details about preparing for interviews.",
      tags: ["interview"],
    }

    const stub = sinon.stub(BlogService.prototype, "findOne").resolves(blog)

    await blogController.fetchOne(req, res)

    expect(stub.calledOnceWith({ _id: req.params.id, userId: req.user.id })).to
      .be.true
    expect(res.json.calledWith(blog)).to.be.true

    stub.restore()
  })

  it("should return 404 when the requested blog is not found", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }

    const stub = sinon.stub(BlogService.prototype, "findOne").resolves(null)

    await blogController.fetchOne(req, res)

    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "Not found" })).to.be.true

    stub.restore()
  })
})

describe("Blog updating", () => {
  const defaultBody = {
    title: "Updated blog title",
    content: "Updated content for the blog post.",
    tags: ["update"],
  }

  const buildReq = () => ({
    user: { id: new mongoose.Types.ObjectId() },
    params: { id: new mongoose.Types.ObjectId() },
    body: { ...defaultBody },
  })

  const buildRes = () => ({
    status: sinon.stub().returnsThis(),
    json: sinon.spy(),
  })

  it("should update a blog successfully", async () => {
    const req = buildReq()
    const res = buildRes()
    const updatedBlog = { _id: req.params.id, ...req.body, userId: req.user.id }

    const stub = sinon
      .stub(BlogService.prototype, "update")
      .resolves(updatedBlog)

    await blogController.update(req, res)

    expect(
      stub.calledOnceWith(req.params.id, { userId: req.user.id, ...req.body })
    ).to.be.true
    expect(res.json.calledWith(updatedBlog)).to.be.true

    stub.restore()
  })

  it("should retain the original request body when updating", async () => {
    const req = buildReq()
    const res = buildRes()

    const stub = sinon.stub(BlogService.prototype, "update").resolves(null)

    await blogController.update(req, res)

    expect(req.body).to.deep.equal(defaultBody)

    stub.restore()
  })

  it("should return 404 if the blog to update is not found", async () => {
    const req = buildReq()
    const res = buildRes()

    const stub = sinon.stub(BlogService.prototype, "update").resolves(null)

    await blogController.update(req, res)

    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "Not found" })).to.be.true

    stub.restore()
  })

  it("should return 500 if updating the blog throws an error", async () => {
    const req = buildReq()
    const res = buildRes()

    const stub = sinon
      .stub(BlogService.prototype, "update")
      .throws(new Error("Update failed"))

    await blogController.update(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Update failed" })).to.be.true

    stub.restore()
  })
})

describe("Blog deletion", () => {
  it("should delete a blog successfully", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() }

    const stub = sinon
      .stub(BlogService.prototype, "delete")
      .resolves({ _id: req.params.id })

    await blogController.delete(req, res)

    expect(stub.calledOnceWith(req.params.id)).to.be.true
    expect(res.json.calledWith({ message: "Deleted successfully" })).to.be.true

    stub.restore()
  })

  it("should call delete with the correct identifier", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() }

    const stub = sinon
      .stub(BlogService.prototype, "delete")
      .resolves({ _id: req.params.id })

    await blogController.delete(req, res)

    expect(stub.firstCall.args[0]).to.equal(req.params.id)

    stub.restore()
  })

  it("should return 404 when the blog to delete is not found", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }

    const stub = sinon.stub(BlogService.prototype, "delete").resolves(null)

    await blogController.delete(req, res)

    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "Not found" })).to.be.true

    stub.restore()
  })

  it("should return 500 if deleting the blog throws an error", async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      params: { id: new mongoose.Types.ObjectId() },
    }
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }

    const stub = sinon
      .stub(BlogService.prototype, "delete")
      .throws(new Error("Deletion failed"))

    await blogController.delete(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Deletion failed" })).to.be.true

    stub.restore()
  })
})

// Subscribe/unsubscribe
describe("Subscribe", () => {
  it("should subscribe successfully", async () => {
    const user = {
      id: new mongoose.Types.ObjectId(),
      username: "testuser",
      email: "testuser@mail.com",
      password: "hashedpassword",
      university: "Test University",
      address: "123 Test St, Test City",
      subscribed: false,
      save: sinon.stub().returnsThis(),
    }
    const req = {
      body: {
        ...user,
        subscribed: true,
      },
      user: { id: user.id },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const stub = sinon.stub(UserService.prototype, "findById").resolves(user)

    await userController.update(req, res)

    expect(stub.calledOnceWith(req.user.id)).to.be.true
    expect(user.save.calledOnce).to.be.true
    expect(user.subscribed).to.equal(req.body.subscribed)

    stub.restore()
  })

  it("should return 404 if the user was not found", async () => {
    const user = {
      id: new mongoose.Types.ObjectId(),
      username: "testuser",
      email: "testuser@mail.com",
      password: "hashedpassword",
      university: "Test University",
      address: "123 Test St, Test City",
      subscribed: false,
      save: sinon.stub().returnsThis(),
    }
    const req = {
      body: {
        ...user,
        subscribed: true,
      },
      user: { id: user.id },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    const nullUser = null

    const stub = sinon
      .stub(UserService.prototype, "findById")
      .resolves(nullUser)

    await userController.update(req, res)

    expect(stub.calledOnceWith(req.user.id)).to.be.true
    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ message: "User not found" })).to.be.true

    stub.restore()
  })

  it("should return 500 if an error other than not-found occurs when trying to find the user", async () => {
    const user = {
      id: new mongoose.Types.ObjectId(),
      username: "testuser",
      email: "testuser@mail.com",
      password: "hashedpassword",
      university: "Test University",
      address: "123 Test St, Test City",
      subscribed: false,
      save: sinon.stub().returnsThis(),
    }
    const req = {
      body: user,
      user: { id: user.id },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }

    const stub = sinon
      .stub(UserService.prototype, "findById")
      .throws(new Error("An unknown error occurred"))

    await userController.update(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "An unknown error occurred" })).to.be
      .true

    stub.restore()
  })

  it("should return 500 if an error other than not-found occurs when trying to save", async () => {
    const user = {
      id: new mongoose.Types.ObjectId(),
      username: "testuser",
      email: "testuser@mail.com",
      password: "hashedpassword",
      university: "Test University",
      address: "123 Test St, Test City",
      subscribed: false,
      save: sinon.stub().throws(new Error("Failed to save")),
    }
    const req = {
      body: user,
      user: { id: user.id },
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }

    const stub = sinon.stub(UserService.prototype, "findById").resolves(user)

    await userController.update(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ message: "Failed to save" })).to.be.true

    stub.restore()
  })
})
