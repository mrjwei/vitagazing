import { useState, useEffect, useMemo } from 'react';
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
    <Component data={resume} size="full" />
  )
}

export default ResumeDetail
