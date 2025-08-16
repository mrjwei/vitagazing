import { useState, useEffect, useMemo, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"
import { templates } from "../data"
import Navbar from "../components/Navbar"
import Breadcrumb from "../components/Breadcrumb"

const linkList = [
  { label: "Home", href: "/" },
  { label: "Resume Detail", href: "" },
]

const ResumeDetail = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { resumeId } = useParams()
  const [resume, setResume] = useState()

  const hiddenResumeRefs = useRef({})

  const Component = useMemo(() => {
    if (resume) {
      const template = templates[resume.template]
      if (template) {
        return template.component
      }
    }
    return templates["Default"].component
  }, [resume])

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosInstance.get(`/api/resumes/${resumeId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setResume(response.data)
      } catch (error) {
        alert("Failed to fetch resume.")
      }
    }

    fetchResume()
  }, [user, resumeId])
  if (!resume) {
    return <div>Resume not found</div>
  }

  const handleDelete = async (resumeId) => {
    try {
      await axiosInstance.delete(`/api/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      navigate("/resumes")
    } catch (error) {
      alert("Failed to delete resume.")
    }
  }

  const handleExportPDF = async (id) => {
    const resumeElement = hiddenResumeRefs.current[id]
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
    })

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`resume-${uuidv4()}.pdf`)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto lg:max-w-[960px] px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-8">Resume Detail</h1>
        <Component
          data={resume}
          size="full"
          customClasses="!w-full !max-w-full"
        />
        <div
          className="absolute -left-[9999px] w-[210mm] h-[297mm]"
          ref={(el) => (hiddenResumeRefs.current[resume._id] = el)}
        >
          <Component data={resume} size="full" customClasses="!m-0" />
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={`/resumes/${resume._id}/templates`}
            className="text-violet-800 px-4 py-2 rounded hover:bg-violet-100 transition-all duration-300 ease-in-out"
          >
            Change Template
          </Link>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => handleExportPDF(resume._id)}
              className="bg-violet-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-900 transition-all duration-300 ease-in-out"
            >
              Export
            </button>
            <Link
              to={`/resumes/${resume._id}/edit?from=/resumes/${resume._id}`}
              className="text-violet-800 px-4 py-2 rounded flex items-center hover:bg-violet-100 transition-all duration-300 ease-in-out"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(resume._id)}
              className="text-red-600 px-4 py-2 rounded flex items-center hover:bg-red-50 transition-all duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumeDetail
