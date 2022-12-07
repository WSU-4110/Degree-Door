
import Dropdown from "../components/Dropdown"
import Link from "next/link"
import ContactForm from "../components/ContactForm";
import { useRouter } from "next/router"

export default function Contact(){
  const router = useRouter()
  return(
    <div>
      {/* begin nav bar */}
      <nav className="bg-white border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href={{pathname: "/", query: {userID: router.query.userID}}}>
            <div className="navbar-brand cursor-pointer flex">
              <img className="w-6 h-6 ml-2" src="https://i.imgur.com/jooFjXL.png"></img><b>egreeDoor</b>
            </div>
          </Link>
            <div className='flex ml-[225px] text-green-700'>
              <b>Contact Us</b>
            </div>
          <div className="flex md:order-2">
            <Dropdown color="#292c2c"/>
          </div>
          <div className="md:flex md:w-auto">
            <ul className="flex flex-col p-2 mt-4 items-center bg-gray-50 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0 md:bg-white">
            </ul>
          </div>
        </div>
      </nav>
      {/* end nav bar */}
      <div className="bg-[#f9f9f9] grid">
        <div className="w-6/12 mx-auto rounded mt-10">
          <div className="bg-white p-10 shadow-sm mb-10">
            <h3 className="text-lg font-medium text-gray-800 text-center">Contact</h3>
            <p className="text-sm font-light text-gray-600 my-3 text-center">
            Email us with any questions or inquiries or call 1-800-DegreeD. We would be happy to answer your questions! 
            </p>

            <div className="border-b mb-8"></div>

            <div className="py-6">

            <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}