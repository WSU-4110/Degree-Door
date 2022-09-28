import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../firebase'

export default function Register() {
  let errorCode;
  let errorMessage;
  const router = useRouter()

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

  // Attempt to sign up user with email and password from formData.
  function handleSubmit(event) {
    event.preventDefault()
    createUserWithEmailAndPassword(auth, formData.email.trim(), formData.password.trim())
    .then((_) => {
      // Signed in, try to sign out user then move to login page.
      auth.signOut.then(
        router.push("/")
      )
    })
    .catch((error) => {
      errorCode = error.code;
      errorMessage = error.message;
    });
  }

  // Render the following onto the register page.
  return (
    <div className="register-page max-h-screen">
      <nav>Hello</nav>
      <section className="register-wrapper flex">
        <div className="register-left p-20 w-3/5">
          <h1 className="signup-h1 mb-4 text-2xl">Sign up for DegreeDoor!</h1>
          <h6 className="signup-h6 mb-8 text-gray-500">Let's get you set up so you can verify your email.</h6>
          <div className="form-wrapper">
            <form className="form-section grid grid-cols-2 text-xl gap-8" onSubmit={handleSubmit}>
              {/*
                Each field-wrapper div will resize itself to fit within the grid
                column.

                For each field label, it will have a margin-bottom of
                0.5 rem. 
                
                For each input field, each box will have a rounded 
                border of 0.375 rem, an outline of 0 when typing, a margin-top
                of 0.5 rem, and a padding of 4. Additionally, they will take
                up the max width of the div they are in.
              */}
              <div className="field-wrapper col">
                <label className="field-label mb-2">First Name</label>
                <input 
                  className="field-input border outline-0 rounded-md w-full mt-2 p-4"
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                  value={formData.firstName}
                /> 
              </div>
              <div className="field-wrapper col">
                <label className="field-label mb-2">Last Name</label>
                <input
                  className="field-input border outline-0 rounded-md w-full mt-2 p-4"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  value={formData.lastName}
                />
              </div>
              <div className="field-wrapper col">
                <label className="field-label mb-2">Status</label>
                <select
                  className="field-input border outline-0 rounded-md w-full mt-2 p-4"
                  id="status"
                  onChange={handleChange}
                  name="status"
                  value={formData.status}
                >
                  <option value="Upcoming Student">Upcoming Student</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Professor">Professor</option>
                </select>
              </div>
              <div className="field-wrapper col">
                <label className="field-label mb-2">Email</label>
                <input
                  className="field-input border outline-0 rounded-md w-full mt-2 p-4"
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                />
              </div>
              <div className="field-wrapper col">
                <label className="field-label mb-2">Password</label>
                <input
                  className="field-input border outline-0 rounded-md w-full mt-2 p-4"
                  type="text"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                />
              </div>
              <div className="field-wrapper col">
                <label className="field-label mb-2">Confirm Password</label>
                <input
                  className="field-input border outline-0 rounded-md w-full mt-2 p-4"
                  type="text"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                />
              </div>
              <button className="signup-submit-button bg-lime-600 hover:bg-lime-500 hover:scale-90 duration-300
                ease-in-out text-white rounded-lg mt-6 p-4 cursor-pointer justify-between items-center"
                type="submit"
              >
                Sign-up!
              </button>
              <Link href="/">
                <button className="signup-submit-button bg-lime-600 hover:bg-lime-500 hover:scale-90 duration-300
                  ease-in-out text-white rounded-lg mt-6 p-4 cursor-pointer justify-between items-center"
                  type="button"
                >
                  Return to login!
                </button>
              </Link>
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