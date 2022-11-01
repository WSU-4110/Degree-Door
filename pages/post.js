import Link from 'next/link'
import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import ProtectedRoute from '../components/HOC/ProtectedRoute'
import { useAuthContext } from '../context/AuthContext'

export default function Post() {
  const { db } = useAuthContext() // Gain db from AuthContext

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
    event.preventDefault()
    const reviewsRef = collection(db, "Degrees/cs/Reviews")
    const reviewData = {
      timeStamp: serverTimestamp(),
      course: formData.course,
      pros: formData.pros,
      cons: formData.cons
    }
    await addDoc(reviewsRef, reviewData)
  }

  return (
    <ProtectedRoute>
      <div className="form-wrapper min-h-screen bg-white rounded shadow-md px-6 py-8 flex items-center justify-center">
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Course Name:</label>
            <textarea
              className="overflow-auto border border-slate-400 border-solid rounded"
              placeholder="Course name"
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Pros:</label>
            <textarea
              className="overflow-auto border border-slate-400 border-solid rounded"
              placeholder="Pros"
              name="pros"
              value={formData.pros}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Cons:</label>
            <textarea
              className="overflow-auto border border-slate-400 border-solid rounded"
              placeholder="Cons"
              name="cons"
              value={formData.cons}
              onChange={handleChange}
            />
          </div>
          <button className="submit-button bg-green-900 hover:scale-90 duration-300
          text-white rounded-full h-10 w-20 mt-6 p-2 cursor-pointer justify-between items-center"
            type="submit">
            SUBMIT
          </button>
          <Link href="/">
            <button className="submit-button bg-green-900 hover:scale-90 duration-300
            text-white rounded-full h-10 w-20 mt-6 p-2 cursor-pointer justify-between items-center"
              type="button"
            >
              HOME
            </button>
          </Link>
        </form>
      </div>
    </ProtectedRoute>
  )
}
