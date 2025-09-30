import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"
import { templates } from "../data"
import Navbar from "../components/Navbar"

const TemplateList = () => {
  const navigate = useNavigate()
  const { resumeId } = useParams()
  const { user } = useAuth()
  const [resume, setResume] = useState()
  const [selected, setSelected] = useState('default')

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosInstance.get(`/api/resumes/${resumeId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setResume(response.data)
        setSelected(response.data.templateId)
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
    <>
      <Navbar/>
      <div className="container mx-auto px-8 py-[88px]">
        <h1 className="text-3xl font-bold mt-2 mb-8">My Resumes</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-8">
            {templates.map((template) => {
              const Component = template.component
              if (userRef.current.subscribed === true) {
              return (
                <div
                    className={`col col-span-12 md:col-span-6 lg:col-span-4 rounded-xl flex flex-col justify-between border-gray-200 ${selected === template.id ? "border-violet-600 border-4" : "border-gray-200 border-2"}`}
                  key={template.id}
                  onClick={() => setSelected(template.id)}
                >
                  <Component
                    data={resume}
                    size="thumbnail"
                    customClasses="!border-0"
                      premium={false}
                  />
                  <label
                    key={template.id}
                      className={`flex gap-4 px-8 py-4 rounded-b-lg ${selected === template.id ? "bg-violet-600 text-white" : "bg-gray-100"}`}
                  >
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      className="block w-6"
                      checked={selected === template.id}
                      onChange={() => setSelected(template.id)}
                    />
                      <span className="text-lg font-medium">
                        {template.name}
                      </span>
                    </label>
                  </div>
                )
              }
              return template.premium ? (
                <div
                  className={`col col-span-12 md:col-span-6 lg:col-span-4 rounded-xl flex flex-col justify-between border-gray-200 border-2 relative`}
                  key={template.id}
                  onClick={() => setSelected(template.id)}
                >
                  <div className="absolute w-full h-full rounded-xl bg-black opacity-50 z-20"></div>
                  <button onClick={handleClickUpgrade} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-violet-700 font-semibold px-4 py-2 rounded hover:bg-violet-800 hover:text-white transition-all duration-300 ease-in-out z-50">
                    Upgrade
                  </button>
                  <div
                    className={`col col-span-12 md:col-span-6 lg:col-span-4 rounded-xl flex flex-col justify-between border-gray-200 border-2}`}
                    key={template.id}
                  >
                    <Component
                      data={resume}
                      size="thumbnail"
                      customClasses="!border-0"
                      premium={template.premium}
                    />
                    <label
                      key={template.id}
                      className={`flex gap-4 px-8 py-4 bg-gray-100}`}
                    >
                      <input
                        type="radio"
                        name="template"
                        className="block w-6"
                        disabled
                      />
                      <span className="text-lg font-medium">
                        {template.name}
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div
                  className={`col col-span-12 md:col-span-6 lg:col-span-4 rounded-xl flex flex-col justify-between border-gray-200 border-2`}
                  key={template.id}
                  onClick={() => setSelected(template.id)}
                >
                  <div
                    className={`col col-span-12 md:col-span-6 lg:col-span-4 rounded-xl flex flex-col justify-between ${selected === template.id ? "border-violet-600 border-4" : "border-gray-200 border-2"}`}
                    key={template.id}
                    onClick={() => setSelected(template.id)}
                  >
                    <Component
                      data={resume}
                      size="thumbnail"
                      customClasses="!border-0"
                      premium={template.premium}
                    />
                    <label
                      key={template.id}
                      className={`flex gap-4 px-8 py-4 ${selected === template.id ? "bg-violet-600 text-white" : "bg-gray-100"}`}
                    >
                      <input
                        type="radio"
                        name="template"
                        value={template.id}
                        className="block w-6"
                        checked={selected === template.id}
                        onChange={() => setSelected(template.id)}
                      />
                      <span className="text-lg font-medium">
                        {template.name}
                      </span>
                  </label>
                  </div>
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
    </>
  )
}

export default TemplateList
