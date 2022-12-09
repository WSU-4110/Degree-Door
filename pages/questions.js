import { useRouter } from "next/router"

import Footer from "../components/Footer"
import NewNavbar from "../components/NewNavbar"

export default function FAQs(){
  const router = useRouter()
  const { userID } = router.query
  return(
    <div>
      <NewNavbar pageTitle="FAQ" userID={userID} />
      <div className="bg-[#f9f9f9] grid">
        <div className="w-6/12 mx-auto rounded mt-10">
          <div className="bg-white p-10 shadow-sm mb-10">
            <h3 className="text-lg font-medium text-gray-800 text-center">ASK US ANYTHING</h3>
            <p className="text-sm font-light text-gray-600 my-3 text-center">
              Have any questions? We are here to assist you.
            </p>
            <div className="border-b mb-8"/>
            <div className="p-4 bg-white rounded-lg border border-gray-200 mb-6">
              <div className="justify-between items-center mb-3 sm:flex">
                <a href="#" className="text-sm font-semibold text-gray-900">What is DegreeDoor?</a>
              </div>
              <div className="p-3 text-xs italic font-normal text-gray-500 bg-[#f9f9f9] rounded-lg border border-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 mb-6">
              <div className="justify-between items-center mb-3 sm:flex">
                <a href="#" className="text-sm font-semibold text-gray-900">Lorem ipsum dolor sit amet?</a>
              </div>
              <div class="p-3 text-xs italic font-normal text-gray-500 bg-[#f9f9f9] rounded-lg border border-gray-200">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 mb-6">
              <div className="justify-between items-center mb-3 sm:flex">
                <a href="#" className="text-sm font-semibold text-gray-900">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua?</a>
              </div>
              <div className="p-3 text-xs italic font-normal text-gray-500 bg-[#f9f9f9] rounded-lg border border-gray-200">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 mb-6">
              <div className="justify-between items-center mb-3 sm:flex">
                <a href="#" className="text-sm font-semibold text-gray-900">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?</a>
              </div>
              <div className="p-3 text-xs italic font-normal text-gray-500 bg-[#f9f9f9] rounded-lg border border-gray-200">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer userID={router.query.userID !== undefined ? router.query.userID : ""} />
    </div>
  )
}
