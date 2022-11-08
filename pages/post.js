import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import Dropdown from '../components/Dropdown'
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/HOC/ProtectedRoute'
import { useAuthContext } from '../context/AuthContext'

export default function Post() {
  const { db } = useAuthContext() // Gain db from AuthContext
  const router = useRouter()

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

  async function handleSubmit(event) {
    const reviewsRef = collection(db, "Degrees/cs/Reviews")
    const reviewData = {
      timeStamp: serverTimestamp(),
      course: formData.course,
      pros: formData.pros,
      cons: formData.cons
    }
    await addDoc(reviewsRef, reviewData)
    router.push('/')
  }

  return (
    <ProtectedRoute>
       <Navbar>
        <Dropdown />
      </Navbar>
      <div className="box-border h-max-[100vh] w-30 p-20"> 
      {/* add confirmation message for submit button (also add an X to close) */}
        <div className="form-wrapper w-1/2 m-auto mt-8 placeholder:p-4 border-4 bg-gradient-to-b from-gray-200 to-gray-100 opacity-75 inset-0 z-0 bg-white rounded shadow-md px-6 py-8 flex items-center justify-center">
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
              <div class="p-2 flex">
                <div class="w-1/2"></div>
                <div class="w-1/2 flex justify-end">
                  <Link href="/">
                    <button type="button" class="bg-black hover:scale-90 duration-300 text-white p-2 rounded text-xs w-auto">
                      CANCEL
                    </button>
                  </Link>
                  <button type="submit" class="bg-green-900 hover:scale-90 duration-300 text-white p-2 ml-6 rounded text-xs w-auto">
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
