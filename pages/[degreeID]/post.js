import { useRouter } from 'next/router'
import { useState } from 'react'
import { addDoc, collection, serverTimestamp, getDoc, doc } from 'firebase/firestore'

import DegreeNavbar from '../../components/DegreeNavBar'
import ProtectedRoute from '../../components/HOC/ProtectedRoute'
import {  LeavePageDialog, PostReviewErrorDialog, 
  PostReviewSuccessDialog, SubmitPostDialog } from '../../components/Dialogs'
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
          {openError && <PostReviewErrorDialog setOpenError={setOpenError} />}
          {openCancellation && <LeavePageDialog setOpenCancellation={setOpenCancellation} />}
          {open && <SubmitPostDialog handleSubmit={handleSubmit} setOpen={setOpen} />}
          {openSuccess && <PostReviewSuccessDialog setOpenSuccess={setOpenSuccess} />}
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