import Breadcrumb from "../components/Breadcrumb"
import Navbar from "../components/Navbar"
import SubscriptionForm from "../components/SubscriptionForm"

const linkList = [
  {label: 'Home', href: '/'},
  {label: 'Subscription', href: ''},
]

const Subscription = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-[88px]">
      <Breadcrumb linkList={linkList}/>
      <h1 className="text-3xl font-bold mt-2 mb-6">Subscription</h1>
      <SubscriptionForm/>
      </div>
    </>

  )
}

export default Subscription
