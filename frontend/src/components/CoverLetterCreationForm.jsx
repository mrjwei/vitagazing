import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const CoverLetterCreationForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    creationDate: "",
    employer: "",
    body: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/api/cover-letters", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      const newId = response.data._id
      navigate(`/cover-letters/${newId}`)
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        creationDate: "",
        employer: "",
        body: "",
      })
    } catch (error) {
      console.error(error)
      alert("Failed to save cover letter.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 shadow-md rounded-lg"
    >
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Personal Info</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
            required
          />
        </div>
        <div className="block md:flex md:gap-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Creation Date</h2>
        <input
          type="date"
          name="creationDate"
          id="creationDate"
          value={formData.creationDate}
          onChange={(e) =>
            setFormData({ ...formData, creationDate: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
          required
        ></input>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Employer</h2>
        <input
          type="text"
          placeholder="Employer Name"
          value={formData.employer}
          onChange={(e) =>
            setFormData({ ...formData, employer: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Body</h2>
        <textarea
          rows={10}
          placeholder="Body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        ></textarea>
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

export default CoverLetterCreationForm
