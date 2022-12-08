import Dropdown from "../components/Dropdown"
import Link from "next/link"
import ContactForm from "../components/ContactForm"
import { useRouter } from "next/router"
import { useState } from "react"
import { GeneralSuccessDialog } from "../components/Dialogs"
import Footer from "../components/Footer"

export default function Contact(){
  const [openSuccess, setOpenSuccess] = useState(false)
  const router = useRouter()
  return(
    <div>
      {/* begin nav bar */}
      <nav className="bg-[#292828] border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 dark:bg-gray-900 shadow-md">
        <div className="container text-white flex flex-wrap justify-between items-center mx-auto">
          <Link href={router.query.userID !== undefined ? {pathname: "/", query: {userID: router.query.userID}} :"/login"}>
            <div className="navbar-brand cursor-pointer flex">
              <img className="w-6 h-6 ml-2 text-[#ffffff]" src="https://i.imgur.com/PUIKaAn.png%22%3E"/><b>egreeDoor</b>
            </div>
          </Link>
          <div className='text-white mr-[4.5rem]'>
            <b>Contact Us</b>
          </div>
          <div className="flex md:order-2">
            {router.query.userID && <Dropdown color="#292c2c"/> }
          </div>
        </div>
      </nav>
      {/* end nav bar */}
      { openSuccess && <GeneralSuccessDialog setOpenSuccess={setOpenSuccess} message="Message was sent successfully!"/>}
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
            <ContactForm setOpenSuccess={setOpenSuccess}/>
            </div>
          </div>
        </div>
      </div>
      <Footer userID={router.query.userID !== undefined ? router.query.userID : ""}/>
    </div>
  )
}