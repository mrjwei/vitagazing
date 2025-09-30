import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Resumes from "./pages/Resumes"
import CoverLetters from "./pages/CoverLetters"
import CoverLetterDetail from "./pages/CoverLetterDetail"
import ResumeDetail from "./pages/ResumeDetail"
import Templates from "./pages/TemplateList"
import ResumeCreation from "./pages/ResumeCreation"
import CoverLetterCreation from "./pages/CoverLetterCreation"
import ResumeUpdate from "./pages/ResumeUpdate"
import CoverLetterUpdate from "./pages/CoverLetterUpdate"
import Subscription from "./pages/Subscription"
import { useAuth } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const { user } = useAuth()
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes/new"
          element={
            <ProtectedRoute user={user}>
              <ResumeCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes"
          element={
            <ProtectedRoute user={user}>
              <Resumes />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/resumes" replace />} />
        <Route
          path="/resumes/:resumeId/edit"
          element={
            <ProtectedRoute user={user}>
              <ResumeUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes/:resumeId"
          element={
            <ProtectedRoute user={user}>
              <ResumeDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes/:resumeId/templates"
          element={
            <ProtectedRoute user={user}>
              <Templates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cover-letters/new"
          element={
            <ProtectedRoute user={user}>
              <CoverLetterCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cover-letters"
          element={
            <ProtectedRoute user={user}>
              <CoverLetters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cover-letters/:coverLetterId/edit"
          element={
            <ProtectedRoute user={user}>
              <CoverLetterUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cover-letters/:coverLetterId"
          element={
            <ProtectedRoute user={user}>
              <CoverLetterDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscribe"
          element={
            <ProtectedRoute user={user}>
              <Subscription />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
