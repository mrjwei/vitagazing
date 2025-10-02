import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const PostCreationForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/api/blog", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      const newId = response.data._id
      navigate(`/blog/${newId}`)
      setFormData({
        title: "",
        content: "",
        tags: [],
      })
    } catch (error) {
      console.error(error)
      alert("Failed to save post.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 shadow-md rounded-lg"
    >
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
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
      <div>
        <label htmlFor="tags">Tags</label>
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
      <button
        type="submit"
        className="w-full bg-violet-800 text-white p-2 rounded-lg mt-4"
      >
        Save
      </button>
    </form>
  )
}

export default PostCreationForm
