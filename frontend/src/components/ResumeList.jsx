import { Link } from "react-router-dom"
import {PencilIcon, TrashIcon} from '@heroicons/react/24/outline';
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"
import DefaultTemplate from "./resume-templates/DefaultTemplate"
import { templates } from "../data"

const ResumeList = ({ resumes, setResumes, setEditingResume }) => {
  const { user } = useAuth()

  const handleDelete = async (resumeId) => {
    try {
      await axiosInstance.delete(`/api/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setResumes(resumes.filter((resume) => resume._id !== resumeId))
    } catch (error) {
      alert("Failed to delete resume.")
    }
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      {resumes.map((resume) => {
        const TemplateComp = templates[resume.template]?.component
        return (
          <div
            key={resume._id}
            className="col col-span-12 md:col-span-6 lg:col-span-4 flex flex-col"
          >
            <Link to={`/resumes/${resume._id}`} className="flex-1">
              {TemplateComp ? <TemplateComp data={resume} size='thumbnail' /> : <DefaultTemplate data={resume} size="thumbnail" />}
            </Link>
            <div className="mt-4 flex justify-between items-stretch">
              <Link to={`/resumes/${resume._id}/templates`} className="mr-2 text-violet-800 border-2 border-violet-800 px-4 py-2 rounded hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all duration-300 ease-in-out">Change Template</Link>
              <div className="flex justify-end flex-1">
                <button
                  onClick={() => setEditingResume(resume)}
                  className="mr-2 text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-100 transition-all duration-300 ease-in-out"
                >
                  <span>
                    <PencilIcon className="size-5"/>
                  </span>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(resume._id)}
                  className="text-red-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-red-50 transition-all duration-300 ease-in-out"
                >
                  <span>
                    <TrashIcon className="size-5" />
                  </span>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResumeList
