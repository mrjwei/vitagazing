import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const JobBoardCreationForm = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        jobTitle: "",
        description: "",
        deadline: "",
        location: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post("/api/job-boards", formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const newId = response.data._id
            navigate(`/job-boards/${newId}`)
            setFormData({
                jobTitle: "",
                description: "",
                deadline: "",
                location: "",
            })
        } catch (error) {
            console.error(error)
            alert("Failed to save job posting.")
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
                    rows={10}
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full mb-4 p-2 border rounded"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-4">Deadline</h2>
                <input
                    type="date"
                    name="deadline"
                    id="deadline"
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
            <button
                type="submit"
                className="w-full bg-violet-800 text-white p-2 rounded-lg mt-4"
            >
                Save
            </button>
        </form>
    )
}

export default JobBoardCreationForm