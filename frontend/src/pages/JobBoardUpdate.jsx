import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import JobBoardUpdateForm from "../components/JobBoardUpdateForm"
import Navbar from "../components/Navbar"
import axiosInstance from "../axiosConfig"
import { useAuth } from '../context/AuthContext';

const linkList = [
    { label: "Home", href: "/" },
    { label: "Update Job Board", href: "" },
]

const JobBoardUpdate = () => {
    const { jobBoardId } = useParams()
    const { user } = useAuth()
    const [jobBoard, setJobBoard] = useState()

    useEffect(() => {
        const fetchJobBoard = async () => {
            try {
                const response = await axiosInstance.get(`/api/job-boards/${jobBoardId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                setJobBoard(response.data)
            } catch (error) {
                alert("Failed to fetch job board.")
            }
        }
        fetchJobBoard()
    }, [user, jobBoardId])
    if (!jobBoard) {
        return
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-8 py-[88px]">
                <Breadcrumb linkList={linkList} />
                <h1 className="text-3xl font-bold mt-2 mb-6">Update Job Board</h1>
                <JobBoardUpdateForm jobBoard={jobBoard} />
            </div>
        </>
    )
}

export default JobBoardUpdate