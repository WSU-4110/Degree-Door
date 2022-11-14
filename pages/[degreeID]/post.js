import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import Dropdown from '../../components/Dropdown'
import Navbar from '../../components/Navbar'
import ProtectedRoute from '../../components/HOC/ProtectedRoute'
import { useAuthContext } from '../../context/AuthContext'

export default function Post() {
  const router = useRouter()
  const { db } = useAuthContext() // Gain db from AuthContext
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

  function validateForm() {
    if (formData.course === "" || formData.pros === "" || formData.cons === "") {
      setOpenError(true)
    } else {
      setOpen(true);
    }
  }

  async function handleSubmit() {
    const reviewsRef = collection(db, `Degrees/${router.query.degreeID}/Reviews`)
    const reviewData = {
      timeStamp: serverTimestamp(),
      course: formData.course,
      pros: formData.pros,
      cons: formData.cons,
      userID: router.query.userID
    }
    await addDoc(reviewsRef, reviewData)
    setFormData({
      course: "",
      pros: "",
      cons: "",
    })
    setOpen(false)
    setOpenSuccess(true)
    setOpenCancellation(false)
  }

  return (
    <ProtectedRoute>
      <Navbar user={router.query.userID}>
        <Dropdown />
      </Navbar>
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
              <Link href={{pathname: `/${router.query.degreeID}/`, query: {userID: router.query.userID}}}>
                <button 
                  type="button" 
                  className="flex-1 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
                >
                  Leave this Page
                </button>
                </Link>
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
      {openSuccess && <div id="alert" className="flex w-[700px] ml-[280px] p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200" role="alert">
        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
          Review has successfully submitted!
        </div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300" data-dismiss-target="#alert" aria-label="Close"
          onClick={() => setOpenSuccess(false)}
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>}
      {/* end success alert */}

        <div className="form-wrapper w-1/2 m-auto mt-8 placeholder:p-4 pl-10 pr-10 border-4 bg-gradient-to-b from-gray-200 to-gray-100 opacity-75 inset-0 z-0 bg-white rounded shadow-md px-6 py-8 flex items-center justify-center">
          <form className="flex flex-col w-full gap-10" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label><b>COURSE</b></label>
              <textarea
                className="overflow-auto border border-slate-400 border-solid rounded p-2"
                placeholder="Course name"
                name="course"
                value={formData.course}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label><b>PROS</b></label>
              <textarea
                className="overflow-auto border border-slate-400 border-solid rounded p-2"
                placeholder="List the positives of this course"
                name="pros"
                value={formData.pros}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label><b>CONS</b></label>
              <textarea
                className="overflow-auto border border-slate-400 border-solid rounded p-2"
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
    </ProtectedRoute>
  )
}
