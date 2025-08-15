import Breadcrumb from "../components/Breadcrumb"
import ResumeCreationForm from '../components/ResumeCreationForm';
import Navbar from "../components/Navbar"

const linkList = [
  {label: 'Home', href: '/'},
  {label: 'New Resume', href: '/resumes/new'},
]

const ResumeCreation = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
      <Breadcrumb linkList={linkList}/>
      <h1 className="text-3xl font-bold mt-2 mb-6">New Resume</h1>
      <ResumeCreationForm />
      </div>
    </>

  )
}

export default ResumeCreation
