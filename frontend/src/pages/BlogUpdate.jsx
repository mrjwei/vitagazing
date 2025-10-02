import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import BlogUpdateForm from "../components/BlogUpdateForm"
import Navbar from "../components/Navbar"
import axiosInstance from "../axiosConfig"
import { useAuth } from '../context/AuthContext'

const linkList = [
  { label: "Home", href: "/" },
  { label: "Update Blog Post", href: "" },
]

const BlogEdit = () => {
  const { blogId } = useParams()
  const { user } = useAuth()
  const [blog, setBlog] = useState()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/api/blog/${blogId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setBlog(response.data)
      } catch (error) {
        alert("Failed to fetch blog post.")
      }
    }
    fetchBlog()
  }, [user, blogId])

  if (!blog) {
    return
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-6">Update Blog Post</h1>
        <BlogUpdateForm blog={blog} />
      </div>
    </>
  )
}

export default BlogEdit