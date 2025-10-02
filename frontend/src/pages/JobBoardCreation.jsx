import Breadcrumb from "../components/Breadcrumb"
import JobBoardCreationForm from '../components/JobBoardCreationForm';
import Navbar from "../components/Navbar"

const linkList = [
    { label: 'Home', href: '/' },
    { label: 'New Job Board', href: '/job-boards/new' },
]

const JobBoardCreation = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-8 py-[88px]">
                <Breadcrumb linkList={linkList} />
                <h1 className="text-3xl font-bold mt-2 mb-6">New Job Board</h1>
                <JobBoardCreationForm />
            </div>
        </>
    )
}

export default JobBoardCreation
