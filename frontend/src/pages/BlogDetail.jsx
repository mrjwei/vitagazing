import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"
import Navbar from "../components/Navbar"
import Breadcrumb from "../components/Breadcrumb"

const linkList = [
  { label: "Home", href: "/" },
  { label: "Blog Detail", href: "" },
]

const BlogDetail = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { blogId } = useParams()
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
    return <div>Blog post not found</div>
  }

  const handleDelete = async (blogId) => {
    try {
      await axiosInstance.delete(`/api/blog/${blogId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      navigate("/blog")
    } catch (error) {
      alert("Failed to delete blog post.")
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto lg:max-w-[960px] px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-8">Blog Detail</h1>
        
        {/* Blog Content for blog data */}
        <div className="bg-white rounded-lg p-10 shadow-md mb-4">
          <h2 className="text-3xl font-semibold mb-4">{blog.title}</h2>
          
          <div className="border-y py-4 mb-4">
            <p className="text-neutral-500">
              Created on: {new Date(blog.createdAt).toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-2">
                <span className="text-neutral-500">Tags: </span>
                {blog.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-violet-100 text-violet-800 px-2 py-1 rounded text-sm mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </p>
          </div>
        </div>

        {/* Action Buttons - Right aligned  */}
        
          
          <div className="flex justify-end gap-4">
            <Link
              to={`/blog/${blog._id}/edit?from=/blog/${blog._id}`}
              className="text-violet-800 px-4 py-2 rounded flex items-center hover:bg-violet-100 transition-all duration-300 ease-in-out"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(blog._id)}
              className="text-red-600 px-4 py-2 rounded flex items-center hover:bg-red-50 transition-all duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        
      </div>
    </>
  )
}

export default BlogDetail