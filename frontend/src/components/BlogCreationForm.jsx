import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogService from '../services/blog';

const BlogCreationForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    strategy: 'draft',
    scheduleDate: '',
    tags: ''
  });

  useEffect(() => {
    fetchStrategies();
  }, []);

  const fetchStrategies = async () => {
    try {
      console.log('Fetching strategies...');
      
      // Check if the service method exists
      if (!BlogService.getStrategies || typeof BlogService.getStrategies !== 'function') {
        console.log('getStrategies not available, using fallback strategies');
        setStrategies(['draft', 'publish', 'schedule']);
        return;
      }
      
      const response = await BlogService.getStrategies();
      console.log('Strategies API response:', response);
      
      if (response && response.data) {
        setStrategies(response.data);
      } else {
        // Fallback if response structure is unexpected
        setStrategies(['draft', 'publish', 'schedule']);
      }
    } catch (error) {
      console.error('Failed to fetch strategies from API:', error);
      // Use fallback strategies - this ensures the form works even if backend is down
      setStrategies(['draft', 'publish', 'schedule']);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    try {
      // Prepare blog data
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      console.log('Submitting blog data:', blogData);

      const response = await BlogService.create(blogData);
      console.log('Blog creation response:', response);
      
      if (response.success) {
        navigate('/blogs');
      } else {
        alert(response.message || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Blog creation error:', error);
      
      // Handle different types of errors
      if (error.response?.data?.message) {
        // Backend validation error
        alert(error.response.data.message);
      } else if (error.message) {
        // Network or other error
        alert(error.message);
      } else {
        alert('Failed to create blog. Please try again.');
      }
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
    
    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getStrategyDescription = (strategy) => {
    const descriptions = {
      draft: 'Save as draft with minimal requirements',
      publish: 'Publish immediately with full validation',
      schedule: 'Schedule for future publishing'
    };
    return descriptions[strategy] || '';
  };

  const getStrategyRequirements = (strategy) => {
    const requirements = {
      draft: '• Title only required',
      publish: '• Title (10+ chars)\n• Content (200+ chars)\n• Description (50+ chars)',
      schedule: '• Title required\n• Future date required'
    };
    return requirements[strategy] || '';
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 shadow-md rounded-lg">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Publishing Strategy</h2>
        <p className="text-gray-600 mb-4">Choose how you want to publish your blog:</p>
        
        {strategies.length === 0 ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-800 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading strategies...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {strategies.map((strategy) => (
              <label 
                key={strategy} 
                className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.strategy === strategy 
                    ? 'border-violet-800 bg-violet-50' 
                    : 'border-gray-200 hover:border-violet-400'
                }`}
              >
                <input
                  type="radio"
                  name="strategy"
                  value={strategy}
                  checked={formData.strategy === strategy}
                  onChange={handleChange}
                  className="mt-1 text-violet-800 focus:ring-violet-800"
                />
                <div className="flex-1">
                  <div className="font-medium capitalize text-gray-900">{strategy}</div>
                  <div className="text-sm text-gray-600 mt-1">{getStrategyDescription(strategy)}</div>
                  <div className="text-xs text-gray-500 mt-2 whitespace-pre-line">{getStrategyRequirements(strategy)}</div>
                </div>
              </label>
            ))}
          </div>
        )}

        {formData.strategy === 'schedule' && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="block mb-2 text-gray-700 font-medium">Schedule Date & Time</label>
            <input
              type="datetime-local"
              name="scheduleDate"
              value={formData.scheduleDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-violet-800 focus:ring-1 focus:ring-violet-800"
              required
              min={new Date().toISOString().slice(0, 16)}
            />
            <p className="text-sm text-gray-600 mt-1">
              Your blog will be automatically published at the scheduled time.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-violet-800 focus:ring-1 focus:ring-violet-800"
            placeholder="Enter a compelling blog title..."
            required
          />
          {formErrors.title && (
            <p className="text-red-600 text-sm mt-1">{formErrors.title}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-violet-800 focus:ring-1 focus:ring-violet-800"
            rows="3"
            placeholder="Write a brief description that will attract readers..."
            required
          />
          {formErrors.description && (
            <p className="text-red-600 text-sm mt-1">{formErrors.description}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-violet-800 focus:ring-1 focus:ring-violet-800"
            rows="12"
            placeholder="Write your amazing blog content here... Share your knowledge and insights!"
            required
          />
          {formErrors.content && (
            <p className="text-red-600 text-sm mt-1">{formErrors.content}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Tags <span className="text-gray-500 text-sm font-normal">(comma-separated)</span>
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-violet-800 focus:ring-1 focus:ring-violet-800"
            placeholder="react, javascript, web-development, programming"
          />
          <p className="text-sm text-gray-600 mt-1">
            Add relevant tags to help readers discover your blog.
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => navigate('/blogs')}
          className="flex-1 border-2 border-violet-800 text-violet-800 px-6 py-3 rounded-lg hover:bg-violet-50 font-medium transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-violet-800 text-white px-6 py-3 rounded-lg hover:bg-violet-900 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            `Create ${formData.strategy.charAt(0).toUpperCase() + formData.strategy.slice(1)}`
          )}
        </button>
      </div>

      
    </form>
  );
};

export default BlogCreationForm;