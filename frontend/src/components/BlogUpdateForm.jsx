import { useState, useEffect } from "react"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const BlogUpdateForm = ({ blog }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const from = searchParams.get("from")

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  })

  // Pre-fill form with existing blog data
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        tags: blog.tags || [],
      })
    }
  }, [blog])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put(`/api/blog/${blog._id}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      navigate(`/blog/${blog._id}`)
    } catch (error) {
      console.error(error)
      alert("Failed to update post.")
    }
  }

  return (
    // styling consistent with other update forms
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 shadow-md rounded-lg"
    >
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Title</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Content</h2>
        <textarea
          rows={10}
          placeholder="Content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Tags</h2>
        <select
          multiple
          value={formData.tags}
          onChange={(e) =>
            setFormData({
              ...formData,
              tags: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            })
          }
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="Tech">Tech</option>
          <option value="Health">Health</option>
          <option value="Education">Uni Life</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 py-8 mt-4">
        <Link
          to={from ? from : "/blog"}
          className="mr-2 border-violet-800 border-2 text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-800 hover:text-white transition-all duration-300 ease-in-out"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-violet-800 text-white px-4 py-2 rounded hover:bg-violet-900 transition-all duration-300 ease-in-out"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default BlogUpdateForm