import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ResumeForm from '../components/ResumeForm';
import ResumeList from '../components/ResumeList';
import { useAuth } from '../context/AuthContext';

const Resumes = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [editingResume, setEditingResume] = useState(null);

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
    <div className="container mx-auto p-6">
      <ResumeForm
        resumes={resumes}
        setResumes={setResumes}
        editingResume={editingResume}
        setEditingResume={setEditingResume}
      />
      <ResumeList resumes={resumes} setResumes={setResumes} setEditingResume={setEditingResume} />
    </div>
  );
};

export default Resumes;
