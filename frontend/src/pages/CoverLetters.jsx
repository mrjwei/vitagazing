import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import CoverLetterList from '../components/CoverLetterList';
import { useAuth } from '../context/AuthContext';
import Navbar from "../components/Navbar"
import { Placeholder } from "../components/Placeholder"

const CoverLetters = () => {
  const { user } = useAuth();
  const [coverLetters, setCoverLetters] = useState([]);

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const response = await axiosInstance.get('/api/cover-letters', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCoverLetters(response.data);
        console.log(response.data);
      } catch (error) {
        alert('Failed to fetch cover letters.');
      }
    };

    fetchCoverLetters();
  }, [user]);

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-8 py-[88px] !max-w-[1280px]">
        <h1 className="text-3xl font-bold mt-2 mb-8">My Cover Letters</h1>
        {coverLetters.length === 0 ? (
          <Placeholder label="cover letters" to="/cover-letters/new" />
        ) : (
          <CoverLetterList coverLetters={coverLetters} setCoverLetters={setCoverLetters} />
        )}
      </div>
    </>
  );
};

export default CoverLetters;
