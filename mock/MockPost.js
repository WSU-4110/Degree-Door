import { useState } from 'react'

export default function MockPost() {
  const [open, setOpen] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openCancellation, setOpenCancellation] = useState(false)
  const [openError, setOpenError] = useState(false)

  const [formData, setFormData] = useState({
    course: "",
    pros: "",
    cons: "",
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  async function handleSubmit() {
    return;
  }

  function validateForm() {
    if (formData.course === "" || formData.pros === "" || formData.cons === "") {
      setOpenError(true)
    } else {
      setOpen(true);
    }
  }

  

  return (
    <>
    <div className="degree-home bg-white font-Inter relative">
    {/* begin nav bar for degree name */}
    <nav class="bg-[#292c2c] px-2 sm:px-4 py-30 pt-0.5 pb-0.5 m-auto items-center">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <ul className="m-auto md:text-sm md:bg-[#292c2c]">
          <li>
            <p className="text-white md:p-0 uppercase">
              <b>Mock Degree</b>
            </p>
          </li>
        </ul>
      </div>
    </nav>
    {/* end nav bar for degree name */}

    {/* begin nav bar */}
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href={{pathname: "/", query: {userID: "user1234"}}}>
          <div className="navbar-brand cursor-pointer flex">
            <img class="w-6 h-6 ml-2" src="https://i.imgur.com/jooFjXL.png"></img><b>egreeDoor</b>
          </div>
        </a>
        <div className="flex md:order-2">
            {/* <Dropdown /> */}
        </div>
        <div className="md:flex md:w-auto">
          <ul className="flex flex-col p-2 mt-4 items-center bg-gray-50 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0 md:bg-white">
            <li>
              <a href={{pathname: `/mock/`, query: {userID: "user1234"}}}>
                <p className="cursor-pointer block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400">
                  <b>OVERVIEW</b>
                </p>
              </a>
            </li>
            <li>
              <a href={{pathname: `/mock/reviews`, query: {userID: `user1234`, degreeName: `Mock Degree`}}}>
                <p className="cursor-pointer block py-2 pr-4 pl-3 text-[#292c2c] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400">
                  <b>REVIEWS</b>
                </p>
              </a>
            </li>
            <li>
              <p className="block py-2 pr-4 pl-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white" aria-current="page">
                <b>POST A REVIEW</b>
              </p>
            </li>
            <li>
              {/* <FavoritesDialog degree={router.query.degreeID} initFavState={initFavState}/> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* end nav bar */}

    <div className="box-border h-max-[100vh] w-30 p-20">
    {/* begin warning for required text field */}
    {openError && 
      <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 items-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl w-full max-w-sm">
              <div className="bg-gray-50 p-4 pb-4 flex">
                <div className="mt-0 ml-10 text-center">
                  <h3 className="mt-2 font-semibold text-gray-800">WARNING</h3>
                  <div>
                      <p className="mt-2 text-sm text-gray-500">Please fill out all fields before submitting!</p>
                    </div>
                  </div>
                </div>
              <div className="bg-white py-3 flex flex-row-reverse px-6">
                <button 
                  type="button"
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                  onClick={() => setOpenError(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>}
    {/* end warning dialog box */}

    {/* begin dialog box confirmation message for cancel button */}
    {openCancellation && 
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 items-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl w-full max-w-sm">
              <div className="bg-gray-50 p-4 pb-4 flex">
                <div className="mt-0 ml-10 text-center">
                  <h3 className="mt-2 font-semibold text-gray-800">WARNING</h3>
                  <div>
                    <p className="mt-2 text-sm text-gray-500">Are you sure you want to leave this page?</p>
                  </div>
                </div>
              </div>
            <div className="bg-white py-3 flex flex-row-reverse px-6">
            <a href={{pathname: `/${router.query.degreeID}/`, query: {userID: router.query.userID}}}>
              <button 
                type="button" 
                className="flex-1 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
              >
                Leave this Page
              </button>
            </a>
              <button 
                type="button" 
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                onClick={() => setOpenCancellation(false)}
              >
                Stay on this Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>}
    {/* end cancel dialog box */}

    {/* begin dialog box confirmation message for submit button */}
    {open && 
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 items-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl w-full max-w-sm">
              <div className="bg-gray-50 p-4 pb-4 flex">
                <div className="mt-0 ml-10 text-center">
                  <h3 className="mt-2 font-semibold text-gray-800">CONFIRMATION</h3>
                  <div>
                    <p className="mt-2 text-sm text-gray-500">Do you want to continue with submission?</p>
                  </div>
                </div>
              </div>
            <div className="bg-white py-3 flex flex-row-reverse px-6">
              <button 
                type="button" 
                className="flex-1 px-4 py-2 ml-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md"
                onClick={handleSubmit}
              >
                YES
              </button>
              <button 
                type="button" 
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                onClick={() => setOpen(false)}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>}
    {/* end submit dialog box */}

    {/* begin success alert */}
    {openSuccess && <div class="flex items-center m-auto p-4 mb-4 w-[350px] text-gray-500 bg-white rounded-lg border border-gray-100 shadow-sm" role="alert">
        <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        </div>
        <div class="ml-3 text-sm font-normal">Review has successfully submitted!</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close"
          onClick={() => setOpenSuccess(false)}
        >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>}
    {/* end success alert */}

    <div className="form-wrapper w-1/2 mt-[-20px] m-auto pl-10 pr-10 border-[0.5px] bg-[#f9f9f9] rounded shadow-sm py-8">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col text-[#292c2c]">
          <b>COURSE</b>
          <textarea
            className="overflow-auto border border-gray-300 border-solid rounded p-2"
            placeholder="Course name"
            name="course"
            value={formData.course}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col text-[#292c2c]">
          <b>PROS</b>
          <textarea
            className="overflow-auto border border-gray-300 border-solid rounded p-2"
            placeholder="List the positives of this course"
            name="pros"
            value={formData.pros}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col text-[#292c2c]">
          <b>CONS</b>
          <textarea
            className="overflow-auto border border-gray-300 border-solid rounded p-2"
            placeholder="List the negatives of this course"
            name="cons"
            value={formData.cons}
            onChange={handleChange}
          />
        </div>
              <div>
                <div className="p-2 flex">
                  <div className="w-1/2"></div>
                  <div className="w-1/2 flex justify-end">
                      <button 
                      type="button" 
                      className="mt-3 inline-flex w-auto justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenCancellation(true)}
                      >
                        GO BACK
                      </button>
                    <button 
                      type="button" 
                      className="inline-flex w-auto justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={validateForm}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}