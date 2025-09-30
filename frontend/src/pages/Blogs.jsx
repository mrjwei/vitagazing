import BlogList from '../components/BlogList';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';

const linkList = [
  { label: 'Home', href: '/' },
  { label: 'Blogs', href: '/blogs' },
];

const Blogs = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-6">My Blogs</h1>
        <BlogList />
      </div>
    </>
  );
};

export default Blogs;