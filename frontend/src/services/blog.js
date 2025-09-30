import axiosInstance from '../axiosConfig';

// Use object syntax instead of class
const BlogService = {
  async create(data) {
    try {
      // Get token from localStorage (same way your auth works)
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      
      const response = await axiosInstance.post('/api/blogs', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAll() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      
      const response = await axiosInstance.get('/api/blogs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      
      const response = await axiosInstance.get(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async update(id, data) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      
      const response = await axiosInstance.put(`/api/blogs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      
      const response = await axiosInstance.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getStrategies() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      
      const response = await axiosInstance.get('/api/blogs/strategies', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default BlogService;