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

const CoverLetterList = ({ coverLetters, setCoverLetters }) => {
  const { user } = useAuth()

  const hiddenCoverLetterRefs = useRef({})

  const handleExportPDF = async (id) => {
    const coverLetterElement = hiddenCoverLetterRefs.current[id]
    const canvas = await html2canvas(coverLetterElement, {
      scale: 2,
      useCORS: true,
    })

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`cover-letter-${uuidv4()}.pdf`)
  }

  const handleDelete = async (coverLetterId) => {
    try {
      await axiosInstance.delete(`/api/cover-letters/${coverLetterId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setCoverLetters(
        coverLetters.filter((coverLetter) => coverLetter._id !== coverLetterId)
      )
    } catch (error) {
      alert("Failed to delete cover letter.")
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {coverLetters.map((coverLetter) => {
        return (
          <div
            key={coverLetter._id}
            className="col col-span-12 md:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-lg p-4 shadow-md"
          >
            <Link to={`/cover-letters/${coverLetter._id}`} className="flex-1">
              <div>
                <h1>
                  {coverLetter.firstname} {coverLetter.lastname}
                </h1>
                <p>Email: {coverLetter.email} | Phone Number: {coverLetter.phone}</p>
                <p>{coverLetter.creationDate}</p>
                <p>Employer: {coverLetter.employer}</p>
                <div className="mt-4">
                  <p>{coverLetter.body}</p>
                </div>
              </div>
              <div
                className="absolute -left-[9999px] w-[210mm] h-[297mm]"
                ref={(el) => (hiddenCoverLetterRefs.current[coverLetter._id] = el)}
              >
                <h1>
                  {coverLetter.firstname} {coverLetter.lastname}
                </h1>
                <p>Email: {coverLetter.email} | Phone Number: {coverLetter.phone}</p>
                <p>{coverLetter.creationDate}</p>
                <p>Employer: {coverLetter.employer}</p>
                <div className="mt-4">
                  <p>{coverLetter.body}</p>
                </div>
              </div>
            </Link>
            <div className="mt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => handleExportPDF(coverLetter._id)}
                className="text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-100 transition-all duration-300 ease-in-out"
              >
                <span>
                  <ArrowDownTrayIcon className="size-5" />
                </span>
                <span>Export</span>
              </button>
              <Link
                to={`/cover-letters/${coverLetter._id}/edit?from=/cover-letters`}
                className="mr-2 text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-100 transition-all duration-300 ease-in-out"
              >
                <span>
                  <PencilIcon className="size-5" />
                </span>
                <span>Edit</span>
              </Link>
              <button
                onClick={() => handleDelete(coverLetter._id)}
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

export default CoverLetterList
