import { Link } from "react-router-dom"
import {
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const Posts = ({ posts, setPosts }) => {
  const { user } = useAuth()

  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/api/blog/${postId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setPosts(
        posts.filter((post) => post._id !== postId)
      )
    } catch (error) {
      alert("Failed to delete post.")
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="col col-span-12 md:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-lg p-4 shadow-md"
          >
            <Link to={`/blog/${post._id}`} className="flex-1">
              <div>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
                <h1>
                  {post.title}
                </h1>
                <p>{post.content}</p>
              </div>
            </Link>
            <div className="mt-4 flex justify-between items-center">
              {/* Blog Edit Navigation */}
              <Link
                to={`/blog/${post._id}/edit?from=/blog`}
                className="mr-2 text-violet-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-100 transition-all duration-300 ease-in-out"
              >
                <span>
                  <PencilIcon className="size-5" />
                </span>
                <span>Edit</span>
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
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

export default Posts
