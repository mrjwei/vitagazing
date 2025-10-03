import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  UserCircleIcon as UserCircleOutlineIcon,
  PlusIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Bars2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { UserCircleIcon as UserCircleSolidIcon } from "@heroicons/react/24/solid"

const links = [
  { to: "/resumes", label: "Resumes" },
  { to: "/cover-letters", label: "Cover Letters" },
  { to: "/blog", label: "Blog" },
  { to: "/job-boards", label: "Job Board" },
]

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="text-gray-800 bg-white fixed w-full z-20 border-b-2 py-2">
      <div className="container !max-w-[1280px] mx-auto flex justify-between items-center px-4 py-2 lg:px-8">
        <div className="flex items-center">
          <button type="button" className="mr-4" onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}>
            {isNavMenuOpen ? (
              <XMarkIcon className="size-8 md:hidden" />
            ) : (
              <Bars2Icon className="size-8 md:hidden" />
            )}
          </button>
          {isNavMenuOpen && (
            <ul className="absolute top-full translate-y-1 left-0 bg-white p-2 shadow-md border rounded-lg z-10">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link to="/" className="text-2xl font-bold mr-8">
            <img
              src="/logo.svg"
              width={160}
              alt=""
              className="hidden md:block"
            />
            <img
              src={`/logo-sp.svg`}
              width={48}
              alt=""
              className="block md:hidden"
            />
          </Link>
          <ul className="gap-4 hidden md:flex">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {user ? (
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <button onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}>
                  {isNewMenuOpen ? (
                    <span className="flex items-center gap-1">
                      <PlusIcon className="size-8" />
                      <ChevronUpIcon className="size-4" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <PlusIcon className="size-8" />
                      <ChevronDownIcon className="size-4" />
                    </span>
                  )}
                </button>
                {isNewMenuOpen && (
                  <ul className="absolute top-full translate-y-1 right-0 bg-white p-2 shadow-md border rounded-lg z-10">
                    <li>
                      <Link
                        to="/resumes/new"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md text-nowrap"
                      >
                        New Resume
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cover-letters/new"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md text-nowrap"
                      >
                        New Cover Letter
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog/new"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md text-nowrap"
                      >
                        New Post
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/job-boards/new"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md text-nowrap"
                      >
                        New Job Board
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <UserCircleSolidIcon className="size-8" />
                ) : (
                  <UserCircleOutlineIcon className="size-8" />
                )}
              </button>
              {isOpen && (
                <ul className="absolute top-full translate-y-1 right-0 bg-white p-2 shadow-md border rounded-lg z-10">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-100 rounded-md"
                    >
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
