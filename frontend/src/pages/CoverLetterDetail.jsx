import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"
import Navbar from "../components/Navbar"
import Breadcrumb from "../components/Breadcrumb"

const linkList = [
  { label: "Home", href: "/" },
  { label: "Resume Detail", href: "" },
]

const CoverLetterDetail = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { coverLetterId } = useParams()
  const [coverLetter, setCoverLetter] = useState()

  const hiddenCoverLetterRefs = useRef({})

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/cover-letters/${coverLetterId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        setCoverLetter(response.data)
      } catch (error) {
        alert("Failed to fetch cover letter.")
      }
    }

    fetchCoverLetter()
  }, [user, coverLetterId])

  if (!coverLetter) {
    return <div>Cover Letter not found</div>
  }

  const handleDelete = async (coverLetterId) => {
    try {
      await axiosInstance.delete(`/api/cover-letters/${coverLetterId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      navigate("/cover-letters")
    } catch (error) {
      alert("Failed to delete cover letter.")
    }
  }

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto lg:max-w-[960px] px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-8">Cover Letter Detail</h1>
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
          <h2 className="text-2xl font-semibold mb-2">
            {coverLetter.firstname} {coverLetter.lastname}
          </h2>
          <p className="border-y py-2 mb-2">
            Email: {coverLetter.email} | Phone Number: {coverLetter.phone}
          </p>
          <p>{new Date(coverLetter.creationDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
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
          <p>
            Email: {coverLetter.email} | Phone Number: {coverLetter.phone}
          </p>
          <p>{coverLetter.creationDate}</p>
          <p>Employer: {coverLetter.employer}</p>
          <div className="mt-4">
            <p>{coverLetter.body}</p>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => handleExportPDF(coverLetter._id)}
              className="bg-violet-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-900 transition-all duration-300 ease-in-out"
            >
              Export
            </button>
            <Link
              to={`/resumes/${coverLetter._id}/edit?from=/resumes/${coverLetter._id}`}
              className="text-violet-800 px-4 py-2 rounded flex items-center hover:bg-violet-100 transition-all duration-300 ease-in-out"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(coverLetter._id)}
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

export default CoverLetterDetail
