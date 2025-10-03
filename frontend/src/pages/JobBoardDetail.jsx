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
    { label: "Job Board Detail", href: "" },
]

const JobBoardDetail = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { jobBoardId } = useParams()
    const [jobBoard, setJobBoard] = useState()

    const hiddenJobBoardRefs = useRef({})

    useEffect(() => {
        const fetchJobBoard = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/job-boards/${jobBoardId}`,
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                )
                setJobBoard(response.data)
            } catch (error) {
                alert("Failed to fetch job board.")
            }
        }

        fetchJobBoard()
    }, [user, jobBoardId])

    if (!jobBoard) {
        return <div>Job Board not found</div>
    }

    const handleDelete = async (jobBoardId) => {
        try {
            await axiosInstance.delete(`/api/job-boards/${jobBoardId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            navigate("/job-boards")
        } catch (error) {
            alert("Failed to delete job board.")
        }
    }

    const handleExportPDF = async (id) => {
        const jobBoardElement = hiddenJobBoardRefs.current[id]
        const canvas = await html2canvas(jobBoardElement, {
            scale: 2,
            useCORS: true,
        })

        const imgData = canvas.toDataURL("image/png")

        const pdf = new jsPDF("p", "mm", "a4")
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
        pdf.save(`job-boards-${uuidv4()}.pdf`)
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto lg:max-w-[960px] px-8 py-[88px]">
                <Breadcrumb linkList={linkList} />
                <h1 className="text-3xl font-bold mt-2 mb-8">Job Board Detail</h1>
                <div className="bg-white rounded-lg p-10 shadow-md mb-4">
                    <h2 className="text-3xl font-semibold mb-4">
                        {jobBoard.jobTitle}
                    </h2>
                    <p className="border-y py-2 mb-2">
                        <span className="text-neutral-500">Location:</span> {jobBoard.location} <span className="text-neutral-500 font-semibold">&nbsp;|&nbsp;</span> <span className="text-neutral-500 font-semibold">Deadline:</span> {new Date(jobBoard.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <div className="mt-4">
                        <p>{jobBoard.description}</p>
                    </div>
                </div>
                <div
                    className="absolute -left-[9999px] w-[210mm] h-[297mm]"
                    ref={(el) => (hiddenJobBoardRefs.current[jobBoard._id] = el)}
                >
                    <h1>
                        {jobBoard.jobTitle}
                    </h1>
                    <p>
                        Location: {jobBoard.location} | Deadline: {jobBoard.deadline}
                    </p>
                    <div className="mt-4">
                        <p>{jobBoard.description}</p>
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => handleExportPDF(jobBoard._id)}
                            className="bg-violet-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-900 transition-all duration-300 ease-in-out"
                        >
                            Export
                        </button>
                        <Link
                            to={`/job-boards/${jobBoard._id}/edit?from=/job-boards/${jobBoard._id}`}
                            className="text-violet-800 px-4 py-2 rounded flex items-center hover:bg-violet-100 transition-all duration-300 ease-in-out"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(jobBoard._id)}
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

export default JobBoardDetail