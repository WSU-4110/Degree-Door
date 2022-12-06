import Dropdown from "../components/Dropdown"

export default function FAQs(){
  return(
    <div>
      {/* begin nav bar */}
      <nav className="bg-white border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
            <div className="navbar-brand cursor-pointer flex">
              <img className="w-6 h-6 ml-2" src="https://i.imgur.com/jooFjXL.png"></img><b>egreeDoor</b>
            </div>
            <div className='flex ml-[225px] text-green-700'>
              <b>FAQs</b>
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
            <h3 className="text-lg font-medium text-gray-800 text-center">ASK US ANYTHING</h3>
            <p className="text-sm font-light text-gray-600 my-3 text-center">
            Have any questions? We are here to assist you.
            </p>

            <div className="border-b mb-8"></div>

            
          </div>
        </div>
      </div>
    </div>

  )
}
