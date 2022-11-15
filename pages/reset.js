import Link from 'next/link'
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Zoom } from '@mui/material'

import bg from '../public/oldMain.jpg'
import Navbar from "../components/Navbar"
import { useAuthContext } from '../context/AuthContext'

export default function ResetPassword() {
  // Use router in ResetPassword page in case we need to redirect to home page.
  const router = useRouter()

  // Gain auth from auth context
  const { auth } = useAuthContext()

  // Keep track of state to show an alert.
  const [showAlert, setShowAlert] = useState(false)

  // Keep track of alert message state.
  const [alertMessage, setAlertMessage] = useState("")

  // Keep track of alertseverity state.
  const [alertSeverity, setAlertSeverity] = useState("success")

  // Form state to keep track of what user is inputting
  // into the input fields.
  const [formData, setFormData] = useState(
    {
      email: "",
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

  // Create a handleSubmit function for the data of the form.
  async function handleSubmit(event) {
    event.preventDefault() // Prevent page from refreshing.

    try {
      await sendPasswordResetEmail(auth, formData.email.trim())
      setAlertSeverity("success")
      setAlertMessage("Email sent successfully")
    } catch (error) {
      // If reset-pass failed, display error message in the form
      // of an alert dialog.
      setAlertSeverity("error")
      setAlertMessage("Wrong email/password")
    }
    setShowAlert(true)
  }

  return (
    /* The Reset Password page will have two sections to it:
      1. Welcome text that is displayed above the form
      2. The reset password form where the user enters their email
      to which send the password reset email to.
    */ 
    <>
      <Navbar user="" links={[{route: "/register", name: "Register"}, {route:"/login", name: "Login"}]}/>
      <div 
        className="reset-pass-page-background flex justify-center min-w-screen min-h-screen bg-no-repeat bg-cover bg-center relative font-Inter" 
        style={{backgroundImage: `url(${bg.src})`}}
      >
        {/*Include another div that will provide the gradient for the reset password page page.*/}
      <div className="reset-pass-page-gradient absolute bg-gradient-to-b min-w-screen min-h-screen from-green-400 to-green-300 opacity-75 inset-0 z-0"></div>
        <div className="reset-pass-page-wrapper flex flex-col justify-center">
          <div className="reset-pass-page-welcome flex flex-col self-center p-8 z-10">
            <div className="self-start flex flex-col items-center text-white">
              <h1 className="reset-pass-message-h1 text-8xl font-bold mb-3 ">Reset Your Password!</h1>
            </div>
          </div>
          <div className="reset-pass-page-form flex justify-center self-center z-10">
            {/* The following component is a Material UI component that will
            render an animated Alert message to the screen if firebase 
            fails to send a password reset email.*/}
            <Zoom in={showAlert} style={{ transitionDelay: showAlert ? '500ms' : '0ms' }}>
              <Alert 
                variant="filled" 
                sx={{zIndex: 100, position: "absolute", fontSize: "1.25rem"}} 
                severity={alertSeverity}
                onClose={() => setShowAlert(false)}
              >
                {alertMessage}
              </Alert>
            </Zoom>
            <form className="form-wrapper p-10 bg-white m-auto rounded-xl min-w-2/3 shadow-float" onSubmit={handleSubmit}>
              <div className="form-text mb-4 flex flex-col items-center">
                <h2 className="font-bold text-2xl mb-4">Reset Password</h2>
                <p>Enter the email that is associated with your Degree Door account</p>
              </div>
              <div className="field-wrapper m-2">
                <label className="field-label font-semibold mb-2">Email</label>
                <input 
                  className="field-input border-2 border-slate-300 outline-0 rounded-md w-full my-2 p-4 hover:shadow duration-200 ease-in-out"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                /> 
              </div>
              <button type="submit" className="reset-pass-btn w-full bg-green-600 
               hover:bg-green-400 hover:scale-90 text-gray-100 p-3 mb-6 rounded-full tracking-wide 
               font-semibold shadow-lg cursor-pointer transition ease-in-out duration-300"
              >
                Send password reset email!
              </button>
              <Link href="/login">
                <button type="button" className="go-to-register-page-btn w-full justify-center bg-green-600 
                hover:bg-green-400 hover:scale-90 text-gray-100 p-3 rounded-full tracking-wide 
                font-semibold shadow-lg cursor-pointer transition ease-in-out duration-300"
                >
                Return to login page!
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>  
  )
}