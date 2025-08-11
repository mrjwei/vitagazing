import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ResumeForm = ({ resumes, setResumes, editingResume, setEditingResume }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', phone: '' });

  useEffect(() => {
    if (editingResume) {
      setFormData({
        firstname: editingResume.firstname,
        lastname: editingResume.lastname,
        email: editingResume.email,
        phone: editingResume.phone,
      });
    } else {
      setFormData({ firstname: '', lastname: '', email: '', phone: '' });
    }
  }, [editingResume]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingResume) {
        const response = await axiosInstance.put(`/api/resumes/${editingResume._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResumes(resumes.map((resume) => (resume._id === response.data._id ? response.data : resume)));
      } else {
        const response = await axiosInstance.post('/api/resumes', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResumes([...resumes, response.data]);
      }
      setEditingResume(null);
      setFormData({ firstname: '', lastname: '', email: '', phone: '' });
    } catch (error) {
      alert('Failed to save resume.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingResume ? 'Update Resume' : 'Create Resume'}</h1>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstname}
        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingResume ? 'Update Resume' : 'Create Resume'}
      </button>
    </form>
  );
};

export default ResumeForm;
