import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
      document.body.style.backgroundImage = 'url("/bg.jpg")'
      document.body.className = 'h-full bg-cover bg-center bg-no-repeat flex justify-center items-center'
      return () => {
        document.body.style.backgroundImage = ''
        document.body.classList.remove('flex', 'justify-center', 'items-center')
      }
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg text-gray-800">
      <form onSubmit={handleSubmit} className="p-6">
        <h1 className="text-2xl font-medium mb-4 text-center">Create an Account</h1>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-violet-800 text-white p-2 rounded-lg">
          Sign Up
        </button>
      </form>
      <div className="flex items-center justify-center gap-2 bg-gray-100 p-6 rounded-b-lg border-t-[1px] border-gray-300">
                <p className="text-gray-500">Already have an account?</p>
                <Link to="/login" className="font-medium">Log In</Link>
              </div>
    </div>
  );
};

export default Register;
