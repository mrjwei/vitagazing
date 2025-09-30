import { LockClosedIcon } from "@heroicons/react/24/outline"

export const Tag = ({ children, className }) => {
  return (
    <span className={`flex items-center gap-1 bg-gray-200 text-gray-600 text-sm font-medium px-2.5 py-0.5 ${className}`}>
      <LockClosedIcon className="w-4 h-4" />
      {children}
    </span>
  )
}
