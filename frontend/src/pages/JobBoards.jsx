import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import JobBoardList from '../components/JobBoardList';
import { useAuth } from '../context/AuthContext';
import Navbar from "../components/Navbar"
import { Placeholder } from "../components/Placeholder"

const JobBoards = () => {
    const { user } = useAuth();
    const [jobBoards, setJobBoards] = useState([]);

    useEffect(() => {
        const fetchJobBoards = async () => {
            try {
                const response = await axiosInstance.get('/api/job-boards', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setJobBoards(response.data);
            } catch (error) {
                alert('Failed to fetch job boards.');
            }
        };

        fetchJobBoards();
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-8 py-[88px] !max-w-[1280px]">
                <h1 className="text-3xl font-bold mt-2 mb-8">My Jobs</h1>
                {jobBoards.length === 0 ? (
                    <Placeholder label="jobs" to="/job-boards/new" />
                ) : (
                    <JobBoardList jobBoards={jobBoards} setJobBoards={setJobBoards} />
                )}
            </div>
        </>
    );
};

export default JobBoards;
