import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"
import { templates } from "../data"

const TemplateList = () => {
  const navigate = useNavigate()
  const { resumeId } = useParams()
  const { user } = useAuth()
  const [resume, setResume] = useState()
  const [selected, setSelected] = useState()

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosInstance.get(`/api/resumes/${resumeId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setResume(response.data)
        setSelected(response.data.template)
      } catch (error) {
        alert("Failed to fetch resume.")
      }
    }

    fetchResume()
  }, [user, resumeId])

  if (!resume) {
    return <div>Resume not found</div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const template = form.template.value
    try {
      await axiosInstance.put(
        `/api/resumes/${resumeId}`,
        { template },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      navigate(`/resumes/${resumeId}`)
    } catch (error) {
      alert("Failed to apply template.")
    }
  }
  return (
    <div className="container mx-auto p-10">
      <form method="post" onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-8">
          {Object.entries(templates).map(([k, v]) => {
            const Component = v.component
            return (
              <div
                className={`col col-span-12 md:col-span-6 lg:col-span-4 rounded-xl flex flex-col justify-between ${selected === k ? "border-violet-600 border-4" : "border-gray-200 border-2"}`}
                key={k}
                onClick={() => setSelected(k)}
              >
                <Component
                  data={resume}
                  size="thumbnail"
                  customClasses="!border-0"
                />
                <label
                  key={k}
                  className={`flex gap-2 px-8 py-4 ${selected === k ? "bg-violet-600 text-white" : "bg-gray-100"}`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={k}
                    className="block mr-2 w-6"
                    checked={selected === k}
                    onChange={() => setSelected(k)}
                  />
                  <span className="text-lg font-semibold">{k}</span>
                </label>
              </div>
            )
          })}
        </div>
        <div className="flex justify-end gap-2 py-8">
          <Link
            to={`/resumes/${resumeId}`}
            className="mr-2 border-violet-800 border-2 text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-800  hover:text-white transition-all duration-300 ease-in-out"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="mr-2 bg-violet-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-900 transition-all duration-300 ease-in-out"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}

export default TemplateList
