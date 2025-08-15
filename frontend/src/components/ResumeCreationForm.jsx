import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import {v4 as uuidv4} from 'uuid'
import {PlusIcon} from '@heroicons/react/24/outline';

const ResumeCreationForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [formData, setFormData] = useState(
    {
      firstname: '', lastname: '', email: '', phone: '',
      summary: '',
      workExperiences: [],
      educations: [],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('/api/resumes', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      const newId = response.data._id
      navigate(`/resumes/${newId}/templates`)
      setFormData({
        firstname: '', lastname: '', email: '', phone: '',
        summary: '',
        workExperiences: [],
        educations: []
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
    const updatedWorkExperiences = formData.workExperiences.filter(w => {
      if (w.companyName && w.startDate) {
        return  w.companyName !== e.target.dataset.companyName && w.startDate !== e.target.dataset.startDate
      } else if (w.id) {
        return  w.id !== e.target.id
      }
      return false
    })
    setFormData({...formData, workExperiences: updatedWorkExperiences})
  }

  const handleAddEducation = () => {
    const newEducation = {id: uuidv4(), degree: '', institution: '', startDate: '', endDate: ''}
    setFormData({...formData, educations: [...formData.educations, newEducation]})
  }

  const handleDeleteEducation = (e) => {
    const updatedEducations = formData.educations.filter(edu => {
      if (edu.institution && edu.startDate) {
        return edu.institution !== e.target.dataset.institution && edu.startDate !== e.target.dataset.startDate
      } else if (edu.id) {
        return edu.id !== e.target.id
      }
      return false
    })
    setFormData({...formData, educations: updatedEducations})
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 shadow-md rounded-lg">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Personal Info</h2>
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
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Summary</h2>
        <textarea name="summary" id="summary" placeholder="Summary" value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="w-full mb-4 p-2 border rounded"></textarea>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Work Experience</h2>
        {formData.workExperiences.map((w, i) => {
          return (
            <div key={w.id} className="border p-4 rounded-lg mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-600 mb-2">Work Experience {i+1}</h3>
                <button type="button" className="text-red-600" onClick={handleDeleteWorkExperience} data-company-name={w.companyName} data-start-date={w.startDate} id={w.id}>Delete</button>
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
        <button type="button" className="text-violet-800 flex items-center gap-1" onClick={handleAddWorkExperience}>
          <span>
            <PlusIcon className="size-5" />
          </span>
          <span>Add Work Experience</span>
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Education</h2>
        {formData.educations.map((edu, i) => {
          return (
            <div key={edu.id} className="border p-4 rounded-lg mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-600 mb-2">Education {i+1}</h3>
                <button type="button" className="text-red-600" onClick={handleDeleteEducation} data-institution={edu.institution} data-start-date={edu.startDate} id={edu.id}>Delete</button>
              </div>
              <div>
                <label htmlFor={`${edu.id}${edu.degree}`} className="block mb-2 text-gray-500">Degree</label>
                <input type="text" className="w-full mb-4 p-2 border rounded" placeholder="Degree" name={`${edu.id}${edu.degree}`} id={`${edu.id}${edu.degree}`} value={edu.degree} onChange={(e) => setFormData({ ...formData, educations: formData.educations.map(education => education.id === edu.id ? {...education, degree: e.target.value} : education)})} />
              </div>
              <div>
                <label htmlFor={`${edu.id}${edu.institution}`} className="block mb-2 text-gray-500">Institution</label>
                <input type="text" className="w-full mb-4 p-2 border rounded" placeholder="Institution" name={`${edu.id}${edu.institution}`} id={`${edu.id}${edu.institution}`} value={edu.institution} onChange={(e) => setFormData({ ...formData, educations: formData.educations.map(education => education.id === edu.id ? {...education, institution: e.target.value} : education)})} />
              </div>
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <label htmlFor={`${edu.id}${edu.startDate}`} className="block mb-2 text-gray-500">Started From</label>
                  <input type="date" className="w-full mb-4 p-2 border rounded" placeholder="Start Date" name={`${edu.id}${edu.startDate}`} id={`${edu.id}${edu.startDate}`} value={edu.startDate} onChange={(e) => setFormData({ ...formData, educations: formData.educations.map(education => education.id === edu.id ? {...education, startDate: e.target.value} : education)})} />
                </div>
                <div className="flex-1">
                  <label htmlFor={`${edu.id}${edu.endDate}`} className="block mb-2 text-gray-500">Ended On</label>
                  <input type="date" className="w-full mb-4 p-2 border rounded" placeholder="End Date" name={`${edu.id}${edu.endDate}`} id={`${edu.id}${edu.endDate}`} value={edu.endDate} onChange={(e) => setFormData({ ...formData, educations: formData.educations.map(education => education.id === edu.id ? {...education, endDate: e.target.value} : education)})} />
                </div>
              </div>
            </div>
          )
        })}
        <button type="button" className="text-violet-800  flex items-center gap-1" onClick={handleAddEducation}>
          <span>
            <PlusIcon className="size-5"/>
          </span>
          <span>Add Education</span>
        </button>
      </div>
      <button type="submit" className="w-full bg-violet-800 text-white p-2 rounded-lg mt-4">
        Save & Choose Template
      </button>
    </form>
  );
};

export default ResumeCreationForm;
