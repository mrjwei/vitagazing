import Breadcrumb from "../components/Breadcrumb"
import CoverLetterCreationForm from '../components/CoverLetterCreationForm';
import Navbar from "../components/Navbar"

const linkList = [
  {label: 'Home', href: '/'},
  {label: 'New Cover Letter', href: '/cover-letters/new'},
]

const CoverLetterCreation = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
      <Breadcrumb linkList={linkList}/>
      <h1 className="text-3xl font-bold mt-2 mb-6">New Cover Letter</h1>
      <CoverLetterCreationForm />
      </div>
    </>

  )
}

export default CoverLetterCreation
