import { useState } from "react"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const JobBoardUpdateForm = ({ jobBoard }) => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [searchParams] = useSearchParams()
    const from = searchParams.get("from")

    const {
        jobTitle,
        description,
        deadline,
        location,
    } = jobBoard

    const [formData, setFormData] = useState({
        jobTitle,
        description,
        deadline,
        location,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.put(`/api/job-boards/${jobBoard._id}`, formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            setFormData({
                jobTitle: "",
                description: "",
                deadline: "",
                location: "",
            })
            navigate(`/job-boards/${jobBoard._id}`)
        } catch (error) {
            alert("Failed to save job board.")
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 md:p-8 shadow-md rounded-lg"
        >
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-4">Job Title</h2>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={(e) =>
                        setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-4">Description</h2>
                <textarea
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full mb-4 p-2 border rounded h-48"
                    required
                />
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-4">Deadline</h2>
                <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                        setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-4">Location</h2>
                <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
            </div>
            <div className="flex justify-end gap-2 py-8 mt-4">
                <Link
                    to={from ? from : "/job-boards"}
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

export default JobBoardUpdateForm