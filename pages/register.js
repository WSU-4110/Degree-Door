import Image from 'next/image'
import { useState } from 'react'

export default function Register() {

  // Form state to keep track of what user is inputting
  // into the input fields.
  const [formData, setFormData] = useState(
    {
      firstName: "",
      lastName: "",
      status: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  )

  // In React, create a handleChange function
  // for the data of the form fields.
  function handleChange(event) {
    const { name, value } = event.target // Destruct props from event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value // ES6 computed name syntax for field
      }
    })
  }

  // Render the following onto the register page.
  return (
    <div className="register-page max-h-screen">
      <nav>Hello</nav>
      <section className="register-wrapper flex">
        <div className="register-page p-20 w-3/5">
          <h1 className="signup-h1 mb-4 text-2xl">Sign up for DegreeDoor!</h1>
          <h6 className="signup-h6 mb-8 text-gray-500">Let's get you set up so you can verify your email.</h6>
          <div className="form-wrapper">
            <form className="form-section grid grid-cols-2 text-xl gap-8">
              <label className="form-label mb-2">First Name</label>
              <input 
                className="form-input border outline-0 rounded-md w-full mt-2 p-4"
                type="text"
                placeholder="First name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
              /> 
            </form>
          </div>
        </div>
        <div className="register-right w-2/5 relative">
          <Image src="/oldMain.jpg" alt="Old Main WSU" layout="fill" objectFit="contain" />
        </div>
      </section>
    </div>

  )
}