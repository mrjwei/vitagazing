import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import Posts from '../components/Posts';
import { useAuth } from '../context/AuthContext';
import Navbar from "../components/Navbar"

const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/blog', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        alert('Failed to fetch blog posts.');
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-8 py-[88px] !max-w-[1280px]">
        <h1 className="text-3xl font-bold mt-2 mb-8">My Posts</h1>
        <Posts posts={posts} setPosts={setPosts} />
      </div>
    </>
  );
};

export default Blog;
