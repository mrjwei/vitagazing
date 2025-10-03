import { Link } from "react-router-dom"
import {
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const JobBoardList = ({ jobBoards, setJobBoards }) => {
    const { user } = useAuth()

    const handleDelete = async (jobBoardId) => {
        try {
            await axiosInstance.delete(`/api/job-boards/${jobBoardId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            setJobBoards(jobBoards.filter((jobBoard) => jobBoard._id !== jobBoardId))
        } catch (error) {
            alert("Failed to delete job board.")
        }
    }

    return (
        <div className="grid grid-cols-12 gap-6">
            {jobBoards.map((jobBoard) => {
                return (
                    <div
                        key={jobBoard._id}
                        className="col col-span-12 md:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-lg p-4 shadow-md"
                    >
                        <Link to={`/job-boards/${jobBoard._id}`} className="flex-1">
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{jobBoard.jobTitle}</h3>
                                <p className="text-neutral-600 text-sm mb-2">
                                    <span className="font-medium">Location:</span> {jobBoard.location}
                                </p>
                                <p className="text-neutral-600 text-sm mb-2">
                                    <span className="font-medium">Deadline:</span> {new Date(jobBoard.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                </p>
                                <p className="text-neutral-500 text-sm line-clamp-3">
                                    {jobBoard.description}
                                </p>
                            </div>
                        </Link>
                        <div className="mt-4 flex justify-end items-center">
                            <Link
                                to={`/job-boards/${jobBoard._id}/edit?from=/job-boards`}
                                className="mr-2 text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-100 transition-all duration-300 ease-in-out"
                            >
                                <span>
                                    <PencilIcon className="size-5" />
                                </span>
                                <span>Edit</span>
                            </Link>
                            <button
                                onClick={() => handleDelete(jobBoard._id)}
                                className="text-red-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-red-50 transition-all duration-300 ease-in-out"
                            >
                                <span>
                                    <TrashIcon className="size-5" />
                                </span>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default JobBoardList