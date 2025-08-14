import { useState, useEffect, useMemo } from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import {templates} from '../data';

const ResumeDetail = () => {
  const { user } = useAuth();
  const {resumeId} = useParams()
  const [resume, setResume] = useState()

  const Component = useMemo(() => {
    if (resume) {
      const template = templates[resume.template]
      if (template) {
        return template.component
      }
    }
    return templates['Default'].component
  }, [resume])

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosInstance.get(`/api/resumes/${resumeId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResume(response.data);
      } catch (error) {
        alert('Failed to fetch resume.');
      }
    };

    fetchResume();
  }, [user, resumeId]);
  if (!resume) {
    return (
      <div>Resume not found</div>
    )
  }
  return (
    <div className="container mx-auto lg:max-w-[960px]">
      <Component data={resume} size="full" customClasses='!w-full !max-w-full' />
      <div className="flex justify-end"><Link to={`/resumes/${resume._id}/templates`} className="text-violet-800 border-2 border-violet-800 px-4 py-2 rounded hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all duration-300 ease-in-out">Change Template</Link></div>
    </div>
  )
}

export default ResumeDetail
