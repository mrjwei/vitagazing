import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogService from '../services/blog';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const BlogList = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await BlogService.getAll();
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await BlogService.delete(blogId);
        setBlogs(blogs.filter(blog => blog._id !== blogId));
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
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  if (loading) {
    return <div className="text-center py-8">Loading blogs...</div>;
  }

  return (
    <div className="bg-white p-6 md:p-8 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Blogs</h2>
        <Link
          to="/blogs/new"
          className="bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 flex items-center gap-2"
        >
          <span>+</span>
          <span>New Blog</span>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-4">You haven't created any blogs yet.</p>
          <Link
            to="/blogs/new"
            className="bg-violet-800 text-white px-6 py-2 rounded-lg hover:bg-violet-900 inline-block"
          >
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  <Link to={`/blogs/${blog._id}`} className="hover:text-violet-800">
                    {blog.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(blog.status)}
                  <div className="flex gap-1">
                    <Link
                      to={`/blogs/${blog._id}/edit`}
                      className="p-1 text-gray-600 hover:text-violet-800"
                      title="Edit"
                    >
                      <PencilIcon className="size-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-1 text-gray-600 hover:text-red-600"
                      title="Delete"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">{blog.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>
                    {blog.status === 'published' ? (
                      <span className="flex items-center gap-1">
                        <EyeIcon className="size-4" />
                        Published {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                    ) : blog.status === 'scheduled' ? (
                      <span className="flex items-center gap-1">
                        <CalendarDaysIcon className="size-4" />
                        Scheduled for {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <EyeSlashIcon className="size-4" />
                        Draft
                      </span>
                    )}
                  </span>
                </div>
                <span>Created {new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;