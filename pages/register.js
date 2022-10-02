import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Alert from '@mui/material/Alert';
import { Zoom } from '@mui/material'

import { auth } from '../firebase'

export default function Register() {
  const router = useRouter() // Router object to push to other pages.

  // Keep track of state to show an alert.
  const [showAlert, setShowAlert] = useState(false)

  // Keep track of alert message state.
  const [alertMessage, setAlertMessage] = useState("")

  // Keep track of alert severity.
  const [alertSeverity, setAlertSeverity] = useState("error")

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
    if (formData.password.trim() === formData.confirmPassword.trim()) {
      createUserWithEmailAndPassword(auth, formData.email.trim(), formData.password.trim())
      .then((_) => {
        // Signed in, try to sign out user then move to login page.
        auth.signOut()
        .then((_) => {
          // After async successful sign out, set the alert severity
          // to success and notify the user that their registration was successful.
          setAlertSeverity("success")
          setAlertMessage("Registration successful! Return to login page.")
        })
        .catch((error) => {
          // If async sign out failed, set the alert severity
          // as an error and notify the user that their signout was unsuccessful.
          setAlertSeverity("error")
          setAlertMessage(`${error.message}, but you registered successfully`)
        })
      })
      .catch((error) => {
        // If account creation failed, set the alert severity to error and notify the user
        // that their account was not created successfully.
        setAlertSeverity("error")
        setAlertMessage(`${error.message}`)
      })
      setShowAlert(true) // Show alert to the user.
    }
    else {
      // Notify user that the password and password confirmation did not match.
      setAlertSeverity("error") 
      setAlertMessage("Make sure your passwords are matching.")
    }
  }

  // Render the following onto the register page.
  return (
    <div className="register-page min-h-screen min-w-screen bg-gray-100">
      <nav className="flex justify-items-center align-center">
        Navbar
      </nav>
      <div className="register-wrapper flex">
        <div className="register-left p-20 w-3/5 relative">
        {/* The following component is a Material UI component that will
        render an animated Alert message to the screen after the user submits
        the form for registering an account.*/}
        <Zoom in={showAlert} style={{ transitionDelay: showAlert ? '500ms' : '0ms' }}>
          <Alert 
            variant="filled" 
            sx={{zIndex: 100, position: "absolute", fontSize: "1.5rem",  right: "5rem"}} 
            severity={alertSeverity}
            onClose={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
        </Zoom>
          <h1 className="signup-h1 mb-4 text-2xl">Sign up for Degree Door!</h1>
          <h6 className="signup-h6 mb-8 text-gray-500">Let's get you set up so you can start reviewing degrees.</h6>
          <div className="form-wrapper bg-white rounded shadow-md px-6 py-8">
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
                  type="email"
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
                  type="password"
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
                  type="password"
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
      </div>
    </div>
  )
}