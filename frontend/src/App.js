import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Resumes from './pages/Resumes';
import ResumeDetail from './pages/ResumeDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/resumes/:resumeId" element={<ResumeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
