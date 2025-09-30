import BlogCreationForm from '../components/BlogCreationForm';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';

const linkList = [
  { label: 'Home', href: '/' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'New Blog', href: '/blogs/new' },
];

const BlogCreation = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
        <Breadcrumb linkList={linkList} />
        <h1 className="text-3xl font-bold mt-2 mb-6">Create New Blog</h1>
        <BlogCreationForm />
      </div>
    </>
  );
};

export default BlogCreation;