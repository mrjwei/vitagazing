import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import {v4 as uuidv4} from 'uuid'

const ResumeForm = ({ resumes, setResumes, editingResume, setEditingResume }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(
    {
      firstname: '', lastname: '', email: '', phone: '',
      summary: '',
      workExperiences: [],
    }
  );

  useEffect(() => {
    if (editingResume) {
      setFormData(
        {
          firstname: editingResume.firstname,
          lastname: editingResume.lastname,
          email: editingResume.email,
          phone: editingResume.phone,
          summary: editingResume.summary,
          workExperiences: editingResume.workExperiences,
        }
      );
    } else {
      setFormData(
        {
          firstname: '', lastname: '', email: '', phone: '',
          summary: '',
          workExperiences: [],
        }
      );
    }
  }, [editingResume]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingResume) {
        const response = await axiosInstance.put(`/api/resumes/${editingResume._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResumes(resumes.map((resume) => (resume._id === response.data._id ? response.data : resume)))
      } else {
        const response = await axiosInstance.post('/api/resumes', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResumes([...resumes, response.data])
      }
      setEditingResume(null)
      setFormData({
        firstname: '', lastname: '', email: '', phone: '',
        summary: '',
        workExperiences: [],
      })
    } catch (error) {
      alert('Failed to save resume.')
    }
  };

  const handleAddWorkExperience = () => {
    const newWorkExperience = {id: uuidv4(), companyName: '', startDate: '', endDate: '', responsibility: ''}
    setFormData({...formData, workExperiences: [...formData.workExperiences, newWorkExperience]})
  }

  const handleDeleteWorkExperience = (e) => {
    const updatedWorkExperiences = formData.workExperiences.filter(w => w.companyName !== e.target.dataset.companyName && w.startDate !== e.target.dataset.startDate)
    setFormData({...formData, workExperiences: updatedWorkExperiences})
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingResume ? 'Update Resume' : 'Create Resume'}</h1>
      <div>
        <h2 className="text-lg font-bold mb-2">Personal Info</h2>
        <div className="flex gap-4">
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
        </div>
        <div className="block md:flex md:gap-4">
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
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Summary</h2>
        <textarea name="summary" id="summary" placeholder="Summary" value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="w-full mb-4 p-2 border rounded"></textarea>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Work Experience</h2>
        {formData.workExperiences.map((w, i) => {
          return (
            <div key={w.id} className="border p-4 rounded-lg mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-600 mb-2">Work Experience {i+1}</h3>
                <button type="button" className="text-red-600" onClick={handleDeleteWorkExperience} data-company-name={w.companyName} data-start-date={w.startDate}>Delete</button>
              </div>
              <div>
                <label htmlFor={`${w.id}${w.companyName}`} className="block mb-2 text-gray-500">Company Name</label>
                <input type="text" className="w-full mb-4 p-2 border rounded" placeholder="Company Name" name={`${w.id}${w.companyName}`} id={`${w.id}${w.companyName}`} value={w.companyName} onChange={(e) => setFormData({ ...formData, workExperiences: formData.workExperiences.map(we => we.id === w.id ? {...we, companyName: e.target.value} : we)})} />
              </div>
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <label htmlFor={`${w.id}${w.startDate}`} className="block mb-2 text-gray-500">Started From</label>
                  <input type="date" className="w-full mb-4 p-2 border rounded" placeholder="Start Date" name={`${w.id}${w.startDate}`} id={`${w.id}${w.startDate}`} value={w.startDate} onChange={(e) => setFormData({ ...formData, workExperiences: formData.workExperiences.map(we => we.id === w.id ? {...we, startDate: e.target.value} : we)})} />
                </div>
                <div className="flex-1">
                  <label htmlFor={`${w.id}${w.endDate}`} className="block mb-2 text-gray-500">Ended On</label>
                  <input type="date" className="w-full mb-4 p-2 border rounded" name={`${w.id}${w.endDate}`} id={`${w.id}${w.endDate}`} value={w.endDate} onChange={(e) => setFormData({ ...formData, workExperiences: formData.workExperiences.map(we => we.id === w.id ? {...we, endDate: e.target.value} : we)})} />
                </div>
              </div>
              <div>
                <label htmlFor={`${w.id}${w.responsibility}`} className="block mb-2 text-gray-500">Responsibility</label>
                <input type="text" className="w-full mb-4 p-2 border rounded" placeholder="Responsibility" name={`${w.id}${w.responsibility}`} id={`${w.id}${w.responsibility}`} value={w.responsibility} onChange={(e) => setFormData({ ...formData, workExperiences: formData.workExperiences.map(we => we.id === w.id ? {...we, responsibility: e.target.value} : we)})} />
              </div>
            </div>
          )
        })}
        <button type="button" className="text-blue-600 p-2 rounded" onClick={handleAddWorkExperience}>
          Add Work Experience
        </button>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Education</h2>

        <button type="button" className=" text-blue-600 p-2 rounded">
          Add Education
        </button>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingResume ? 'Update Resume' : 'Create Resume'}
      </button>
    </form>
  );
};

export default ResumeForm;
