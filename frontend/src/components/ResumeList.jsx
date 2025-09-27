import { useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import {
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"
import DefaultTemplate from "./resume-templates/DefaultTemplate"
import { templates } from "../data"

const ResumeList = ({ resumes, setResumes }) => {
  const { user } = useAuth()

  const hiddenResumeRefs = useRef({})

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

  const handleDelete = async (resumeId) => {
    try {
      await axiosInstance.delete(`/api/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setResumes(resumes.filter((resume) => resume._id !== resumeId))
    } catch (error) {
      alert("Failed to delete resume.")
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {resumes.map((resume) => {
        const TemplateComp = templates.find(t => t.id === resume.templateId)?.component
        return (
          <div
            key={resume._id}
            className="col col-span-12 md:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-lg p-4 shadow-md"
          >
            <Link to={`/resumes/${resume._id}`} className="flex-1">
              {TemplateComp ? (
                <>
                  <TemplateComp data={resume} size="thumbnail" />
                  <div
                    className="absolute -left-[9999px] w-[210mm] h-[297mm]"
                    ref={(el) => (hiddenResumeRefs.current[resume._id] = el)}
                  >
                    <TemplateComp
                      data={resume}
                      size="full"
                      customClasses="!m-0"
                    />
                  </div>
                </>
              ) : (
                <>
                  <DefaultTemplate data={resume} size="thumbnail" />
                  <div
                    className="absolute -left-[9999px] w-[210mm] h-[297mm]"
                    ref={(el) => (hiddenResumeRefs.current[resume._id] = el)}
                  >
                    <DefaultTemplate
                      data={resume}
                      size="full"
                      customClasses="!m-0"
                    />
                  </div>
                </>
              )}
            </Link>
            <div className="mt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => handleExportPDF(resume._id)}
                className="text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-100 transition-all duration-300 ease-in-out"
              >
                <span>
                  <ArrowDownTrayIcon className="size-5" />
                </span>
                <span>Export</span>
              </button>
              <Link
                to={`/resumes/${resume._id}/edit?from=/resumes`}
                className="mr-2 text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-100 transition-all duration-300 ease-in-out"
              >
                <span>
                  <PencilIcon className="size-5" />
                </span>
                <span>Edit</span>
              </Link>
              <button
                onClick={() => handleDelete(resume._id)}
                className="text-red-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-red-50 transition-all duration-300 ease-in-out"
              >
                <span>
                  <TrashIcon className="size-5" />
                </span>
                <span>Delete</span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResumeList
