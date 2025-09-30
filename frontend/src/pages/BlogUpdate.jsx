import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogService from '../services/blog';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';

const BlogUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    strategy: 'draft',
    scheduleDate: '',
    tags: ''
  });

  useEffect(() => {
    fetchBlog();
    fetchStrategies();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await BlogService.getById(id);
      const blogData = response.data;
      setBlog(blogData);
      setFormData({
        title: blogData.title,
        description: blogData.description,
        content: blogData.content,
        strategy: blogData.status,
        scheduleDate: blogData.scheduleDate ? new Date(blogData.scheduleDate).toISOString().slice(0, 16) : '',
        tags: blogData.tags ? blogData.tags.join(', ') : ''
      });
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      navigate('/blogs');
    }
  };

  const fetchStrategies = async () => {
    try {
      const response = await BlogService.getStrategies();
      setStrategies(response.data);
    } catch (error) {
      console.error('Failed to fetch strategies:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await BlogService.update(id, blogData);
      navigate(`/blogs/${id}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStrategyDescription = (strategy) => {
    const descriptions = {
      draft: 'Save as draft with minimal requirements',
      publish: 'Publish immediately with full validation',
      schedule: 'Schedule for future publishing'
    };
    return descriptions[strategy] || '';
  };

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-8 py-[88px]">
          <div className="text-center">Loading...</div>
        </div>
      </>
    );
  }

  const linkList = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: blog.title, href: `/blogs/${blog._id}` },
    { label: 'Edit', href: `/blogs/${blog._id}/edit` },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-6">Edit Blog</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 shadow-md rounded-lg">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Publishing Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {strategies.map((strategy) => (
                <label key={strategy} className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="strategy"
                    value={strategy}
                    checked={formData.strategy === strategy}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium capitalize">{strategy}</div>
                    <div className="text-sm text-gray-600">{getStrategyDescription(strategy)}</div>
                  </div>
                </label>
              ))}
            </div>

            {formData.strategy === 'schedule' && (
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Schedule Date</label>
                <input
                  type="datetime-local"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Brief description of your blog"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="12"
              placeholder="Write your blog content here..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="react, javascript, web-development"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`/blogs/${id}`)}
              className="flex-1 border-2 border-violet-800 text-violet-800 px-4 py-2 rounded hover:bg-violet-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-violet-800 text-white px-4 py-2 rounded hover:bg-violet-900 disabled:opacity-50"
            >
              {loading ? 'Updating...' : `Update ${formData.strategy.charAt(0).toUpperCase() + formData.strategy.slice(1)}`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogUpdate;