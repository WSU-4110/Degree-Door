import Dropdown from "../components/Dropdown"
import Link from "next/link"
import { useRouter } from "next/router"

import Footer from "../components/Footer"

export default function FAQs(){
  const router = useRouter()
  return(
    <div>
      {/* begin nav bar */}
      <nav className="bg-white border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href={router.query.userID !== undefined ? {pathname: "/", query: {userID: router.query.userID}} :"/login"}>
            <div className="navbar-brand cursor-pointer flex">
              <img className="w-6 h-6 ml-2" src="https://i.imgur.com/jooFjXL.png"></img><b>egreeDoor</b>
            </div>
          </Link>
          <div className='text-green-700 mr-[4.5rem]'>
            <b>FAQs</b>
          </div>
          <div className="flex md:order-2">
            {router.query.userID && <Dropdown color="#292c2c"/> }
          </div>
        </div>
      </nav>
      {/* end nav bar */}
      <div className="bg-[#f9f9f9] grid">
        <div className="w-6/12 mx-auto rounded mt-10">
          <div className="bg-white p-10 shadow-sm mb-10">
            <h3 className="text-lg font-medium text-gray-800 text-center">ASK US ANYTHING</h3>
            <p className="text-sm font-light text-gray-600 my-3 text-center">
            Have any questions? We are here to assist you.
            </p>

            <div className="border-b mb-8"></div>

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
