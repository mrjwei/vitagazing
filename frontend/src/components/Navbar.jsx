import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { UserCircleIcon as UserCircleOutlineIcon, PlusIcon} from "@heroicons/react/24/outline"
import { UserCircleIcon as UserCircleSolidIcon } from "@heroicons/react/24/solid"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="text-gray-800 bg-gray-100 fixed w-full z-20">
      <div className="container !max-w-[1280px] mx-auto flex justify-between items-center px-4 py-2 lg:px-8">
        <Link to="/" className="text-2xl font-bold">
          <img src="/logo.svg" width={160} alt="" className="hidden md:block" />
          <img src={`/logo-sp.svg`} width={48} alt="" className="block md:hidden" />
        </Link>
        <div>
          {user ? (
            <div className="flex items-center relative">
              <Link to="/resumes/new" className="mr-4 flex items-center gap-1 bg-violet-800 text-white px-3 p-2 rounded-lg">
                <span>
                  <PlusIcon className="size-5"/>
                </span>
                <span>New Resume</span>
              </Link>
              <Link to="/resumes" className="mr-4">
                My Resumes
              </Link>
              <Link to="/cover-letters" className="mr-4">
                My Cover Letters
              </Link>
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <UserCircleSolidIcon className="size-8"/> : <UserCircleOutlineIcon className="size-8" />}
              </button>
              {isOpen && (
                <ul className="absolute top-full right-0 bg-white p-2 shadow-md border rounded-lg z-10">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-md">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
