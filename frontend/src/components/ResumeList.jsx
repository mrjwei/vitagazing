import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ResumeList = ({ resumes, setResumes, setEditingResume }) => {
  const { user } = useAuth();

  const handleDelete = async (resumeId) => {
    try {
      await axiosInstance.delete(`/api/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setResumes(resumes.filter((resume) => resume._id !== resumeId));
    } catch (error) {
      alert('Failed to delete resume.');
    }
  };

  return (
    <div>
      {resumes.map((resume) => (
        <div key={resume._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">My Resumes</h2>
          <p>{resume.firstname}</p>
          <p>{resume.lastname}</p>
          <p>{resume.email}</p>
          <p>{resume.phone}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingResume(resume)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(resume._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
