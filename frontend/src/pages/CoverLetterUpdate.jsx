import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import CoverLetterUpdateForm from "../components/CoverLetterUpdateForm"
import Navbar from "../components/Navbar"
import axiosInstance from "../axiosConfig"
import {useAuth} from '../context/AuthContext';

const linkList = [
  { label: "Home", href: "/" },
  { label: "Update Cover Letter", href: "" },
]

const CoverLetterUpdate = () => {
  const { coverLetterId } = useParams()
  const {user} = useAuth()
  const [coverLetter, setCoverLetter] = useState()

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const response = await axiosInstance.get(`/api/cover-letters/${coverLetterId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setCoverLetter(response.data)
      } catch (error) {
        alert("Failed to fetch cover letter.")
      }
    }
    fetchCoverLetter()
  }, [user, coverLetterId])
  if (!coverLetter) {
    return
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-6">Update Cover Letter</h1>
        <CoverLetterUpdateForm coverLetter={coverLetter} />
      </div>
    </>
  )
}

export default CoverLetterUpdate
