import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { addDoc, collection, serverTimestamp, getDoc, doc } from 'firebase/firestore'

import DegreeNavbar from '../../components/DegreeNavBar'
import ProtectedRoute from '../../components/HOC/ProtectedRoute'
import { db } from '../../firebase'

export default function Post({initFavState}) {
  const router = useRouter()
  const { degreeID, degreeName, userID } = router.query
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
      <div className="degree-home bg-white font-Inter relative">
      <DegreeNavbar degreeName={degreeName} degreeID={degreeID} userID={userID} initFavState={initFavState} active="post" />
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
                    <svg aria-hidden="true" class="mx-auto mb-2 w-8 h-8 text-[#de9b61]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mt-2 font-semibold text-gray-800">WARNING</h3>
                    <div>
                        <p className="mt-2 text-sm text-gray-500">Please fill out all fields before submitting!</p>
                      </div>
                    </div>
                  </div>
                <div className="bg-white py-3 flex flex-row-reverse px-6">
                  <button 
                    type="button"
                    className="flex-1 px-4 py-2 bg-[#de9b61] hover:bg-[#e6a771] text-white text-sm font-medium rounded-md"
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
                    <svg aria-hidden="true" class="mx-auto mb-2 w-8 h-8 text-[#de9b61]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
                  className="flex-1 px-4 py-2 ml-2 bg-[#de9b61] hover:bg-[#e6a771] text-white text-sm font-medium rounded-md"
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
                    <svg aria-hidden="true" class="mx-auto mb-2 w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mt-2 font-semibold text-gray-800">CONFIRMATION</h3>
                    <div>
                      <p className="mt-2 text-sm text-gray-500">Do you want to continue with submission?</p>
                    </div>
                  </div>
                </div>
              <div className="bg-white py-3 flex flex-row-reverse px-6">
                <button 
                  type="button" 
                  className="flex-1 px-4 py-2 ml-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium rounded-md"
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
      {openSuccess && <div className="flex items-center p-4 m-auto my-10 mt-[-60px] w-[350px] text-gray-500 bg-white rounded-lg border border-gray-100 shadow-sm" role="alert">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-700 bg-green-100 rounded-lg">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          </div>
          <div className="ml-3 text-sm font-normal">Review has successfully submitted!</div>
          <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close"
            onClick={() => setOpenSuccess(false)}
          >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
      </div>}
      {/* end success alert */}

      <div className="form-wrapper w-1/2 mt-[-20px] m-auto pl-10 pr-10 border-[0.5px] bg-[#f9f9f9] rounded shadow-sm py-8">
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col text-[#292c2c] text-sm">
            <div>
              <div className = "font-semibold">COURSE</div>
            </div>
            <textarea
              className="overflow-auto border border-gray-300 border-solid rounded p-2 h-20 text-sm"
              placeholder="Course name"
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-[#292c2c] text-sm">
            <div>
              <div className = "font-semibold">PROS</div>
            </div>
            <textarea
              className="overflow-auto border border-gray-300 border-solid rounded p-2 h-20 text-sm"
              placeholder="List the positives of this course"
              name="pros"
              value={formData.pros}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-[#292c2c] text-sm">
            <div>
              <div className = "font-semibold">CONS</div>
            </div>
            <textarea
              className="overflow-auto border border-gray-300 border-solid rounded p-2 h-20 text-sm"
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
                      className="inline-flex w-auto justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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
    </ProtectedRoute>
  )
}

export async function getServerSideProps(context) {

  // Check if the user is following the degree
  const favRef = doc(db,`Users/${context.query.userID}/Favorites`,`${context.params.degreeID}`)
  const favSnap = await getDoc(favRef)

  // True if user has the degree favorited
  const initFavState = favSnap.exists()

  return {
    props: {
      initFavState: initFavState,
    }
  }
}