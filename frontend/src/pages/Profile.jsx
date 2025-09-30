import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import Navbar from "../components/Navbar"
import Breadcrumb from "../components/Breadcrumb"

const linkList = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "" },
]

const Profile = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Profile data:', response.data);
        login({...user, ...response.data });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, []);

  const handleSubscription = async () => {
    if (user.subscribed) {
      // Unsubscribe logic
      try {
        await axiosInstance.put('/api/auth/unsubscribe', {subscribed: false}, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        login({ ...user, subscribed: false });
        alert('You have unsubscribed successfully.');
      } catch (error) {
        alert('Failed to unsubscribe. Please try again.');
      }
    } else {
      // Redirect to subscription page
      localStorage.setItem("prevURL", window.location.pathname)
      navigate('/subscribe');
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-8 py-[88px] !max-w-[1280px]">
        <Breadcrumb linkList={linkList} />
        <div className="bg-white p-6 shadow-md rounded-xl mt-2">
          <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <th className="font-semibold pr-4 py-2 text-left">Username</th>
                <td className="py-2">{user.username}</td>
              </tr>
              <tr className="border-b">
                <th className="font-semibold pr-4 py-2 text-left">Email</th>
                <td className="py-2">{user.email}</td>
              </tr>
              <tr className="border-b">
                <th className="font-semibold pr-4 py-2 text-left">University</th>
                <td className="py-2">{user.university}</td>
              </tr>
              <tr className="border-b">
                <th className="font-semibold pr-4 py-2 text-left">Address</th>
                <td className="py-2">{user.address}</td>
              </tr>
              <tr className="border-b">
                <th className="font-semibold pr-4 py-2 text-left">Subscription</th>
                <td className="py-2 flex justify-between">
                  <span>{user.subscribed ? 'Yes' : 'No'}</span>
                  <button onClick={handleSubscription} className="ml-2 text-violet-600 hover:underline">
                    {user.subscribed ? 'Unsubscribe' : 'Subscribe'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
