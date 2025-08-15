import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ResumeList from '../components/ResumeList';
import { useAuth } from '../context/AuthContext';
import Navbar from "../components/Navbar"

const Resumes = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axiosInstance.get('/api/resumes', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResumes(response.data);
      } catch (error) {
        alert('Failed to fetch resumes.');
      }
    };

    fetchResumes();
  }, [user]);

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-8 py-[88px] !max-w-[1280px]">
        <h1 className="text-3xl font-bold mt-2 mb-8">My Resumes</h1>
        <ResumeList resumes={resumes} setResumes={setResumes} />
      </div>
    </>
  );
};

export default Resumes;
