import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogService from '../services/blog';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import { PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await BlogService.getById(id);
      setBlog(response.data);
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await BlogService.delete(id);
        navigate('/blogs');
      } catch (error) {
        alert('Failed to delete blog');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
      published: { color: 'bg-green-100 text-green-800', label: 'Published' },
      scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>{config.label}</span>;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-8 py-[88px]">
          <div className="text-center">Loading...</div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-8 py-[88px]">
          <div className="text-center">Blog not found</div>
        </div>
      </>
    );
  }

  const linkList = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: blog.title, href: `/blogs/${blog._id}` },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px] max-w-4xl">
        <div className="">
          <Breadcrumb linkList={linkList} />
        </div>
        
      

        <article className="mt-5 bg-white p-8 shadow-md rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                {getStatusBadge(blog.status)}
                <span className="text-gray-500">
                  {blog.status === 'published' 
                    ? `Published on ${new Date(blog.publishedAt).toLocaleDateString()}`
                    : blog.status === 'scheduled'
                    ? `Scheduled for ${new Date(blog.publishedAt).toLocaleDateString()}`
                    : `Last updated ${new Date(blog.updatedAt).toLocaleDateString()}`
                  }
                </span>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{blog.description}</p>

          <div className="prose max-w-none mb-8">
            <div className="whitespace-pre-wrap text-gray-700 leading-8">{blog.content}</div>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
         <div className="mt-4 flex justify-end gap-4">
            <Link
              to={`/blogs/${blog._id}/edit`}
              className="text-violet-800 px-4 py-2 rounded flex items-center hover:bg-violet-100 transition-all duration-300 ease-in-out"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="text-red-600 px-4 py-2 rounded flex items-center hover:bg-red-50 transition-all duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
      </div>
    </>
  );
};

export default BlogDetail;