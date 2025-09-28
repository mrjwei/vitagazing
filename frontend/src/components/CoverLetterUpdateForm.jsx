import { useState } from "react"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const CoverLetterUpdateForm = ({ coverLetter }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const from = searchParams.get("from")

  const {
    firstname,
    lastname,
    email,
    phone,
    creationDate,
    employer,
    body,
  } = coverLetter

  const [formData, setFormData] = useState({
    firstname,
    lastname,
    email,
    phone,
    creationDate,
    employer,
    body,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put(`/api/cover-letters/${coverLetter._id}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        creationDate: "",
        employer: "",
        body: "",
      })
      navigate(`/cover-letters/${coverLetter._id}`)
    } catch (error) {
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
          value={formData.creationDate}
          onChange={(e) =>
            setFormData({ ...formData, creationDate: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Employer</h2>
        <input
          type="text"
          placeholder="Employer"
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
          placeholder="Body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className="w-full mb-4 p-2 border rounded h-48"
          required
        />
      </div>
      <div className="flex justify-end gap-2 py-8 mt-4">
        <Link
          to={from ? from : "/cover-letters"}
          className="mr-2 border-violet-800 border-2 text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-800  hover:text-white transition-all duration-300 ease-in-out"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-violet-800 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default CoverLetterUpdateForm
