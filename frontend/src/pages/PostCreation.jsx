import Breadcrumb from "../components/Breadcrumb"
import PostCreationForm from '../components/PostCreationForm';
import Navbar from "../components/Navbar"

const linkList = [
  {label: 'Home', href: '/'},
  {label: 'New Post', href: '/posts/new'},
]

const PostCreation = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
      <Breadcrumb linkList={linkList}/>
      <h1 className="text-3xl font-bold mt-2 mb-6">New Post</h1>
      <PostCreationForm />
      </div>
    </>

  )
}

export default PostCreation
