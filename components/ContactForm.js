import { useState } from "react"
import { db } from "../firebase"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export default function ContactForm({ setOpenSuccess, userID }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const contactRef = collection(db, `ContactMessages`)
    const contactData = {
      timeStamp: serverTimestamp(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }
    await addDoc(contactRef, contactData)
    setFormData({
      name: "",
      email: "",
      message: "",
    })
    setOpenSuccess(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder="Your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <textarea
          placeholder="Your message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <button
          className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Send a message
        </button>
      </div>
    </form>
  )
}