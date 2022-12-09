import { useRouter } from "next/router"
import { useState } from "react"

import ContactForm from "../components/ContactForm"
import Footer from "../components/Footer"
import { GeneralSuccessDialog } from "../components/Dialogs"

export default function Contact(){
  const [openSuccess, setOpenSuccess] = useState(false)
  const router = useRouter()
  const { userID } = router.query
  return(
    <>
      <div className="bg-[#f9f9f9] min-h-screen">
        <NewNavbar pageTitle="Contact Us" userID={userID} />
        { openSuccess && <GeneralSuccessDialog setOpenSuccess={setOpenSuccess} message="Message was sent successfully!"/>}
        <div className="bg-[#f9f9f9]">
          <div className="w-6/12 mx-auto rounded mt-10">
            <div className="bg-white p-10 shadow-sm mb-10">
              <h3 className="text-lg font-medium text-gray-800 text-center">Contact</h3>
              <p className="text-sm font-light text-gray-600 my-3 text-center">
              Email us with any questions or inquiries or call 1-800-DegreeD. We would be happy to answer your questions! 
              </p>
              <div className="border-b mb-8" />
              <div className="py-6">
              <ContactForm setOpenSuccess={setOpenSuccess}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-full">
        <Footer userID={userID}/>
      </div>
    </>
  )
}