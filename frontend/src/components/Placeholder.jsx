import { Link } from "react-router-dom"

export const Placeholder = ({ label, to }) => {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-12 border-4 border-dashed border-gray-300 rounded-lg text-center space-y-4">
      <h3 className="text-2xl text-neutral-500 mb-4">You don't have any {label} yet.</h3>
      <Link to={to} className="px-4 py-2 bg-violet-600 text-white rounded-lg border-b-4 border-violet-400">Create Now</Link>
    </div>
  )
}
