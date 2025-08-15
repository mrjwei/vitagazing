import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import ResumeUpdateForm from "../components/ResumeUpdateForm"
import Navbar from "../components/Navbar"
import axiosInstance from "../axiosConfig"
import {useAuth} from '../context/AuthContext';

const linkList = [
  { label: "Home", href: "/" },
  { label: "Update Resume", href: "" },
]

const ResumeUpdate = () => {
  const { resumeId } = useParams()
  const {user} = useAuth()
  const [resume, setResume] = useState()

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
    return
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-6">Update Resume</h1>
        <ResumeUpdateForm resume={resume} />
      </div>
    </>
  )
}

export default ResumeUpdate
