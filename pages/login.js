import Link from 'next/link'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Zoom } from '@mui/material'
import Alert from '@mui/material/Alert';




import bg from '../public/oldMain.jpg'

export default function Login() {
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
      email: "",
      password: "",
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
  function handleSubmit(event) {
    event.preventDefault() // Prevent page from refreshing.
    

  }

  return (
    /* The Login page will have two sections to it:
      1. Welcome text that is displayed above the login form
      2. The login form where the user can enter their credentials
      or can go to the registration page.
    */ 
    <>
      <div className="login-page-background flex justify-center min-w-screen min-h-screen bg-no-repeat bg-cover bg-center relative" style={{backgroundImage: `url(${bg.src})`}}>
        <div className="login-page-wrapper flex flex-col justify-center">
          <div className="login-page-welcome flex flex-col self-center p-8 z-10">
            <div class="self-start flex flex-col items-center text-white">
              <h1 class="login-message-h1 mb-3 font-bold text-8xl">Welcome to Degree Door</h1>
              <p class="login-message-p text-2xl font-bold pr-3">Login to Degree Door and get started on looking at your degree!</p>
            </div>
          </div>
          <div className="login-page-form flex justify-center self-center z-10">
            <form className="form-wrapper p-10 bg-white m-auto mb rounded-xl w-100">
              <div className="form-text mb-4">
                <h2 className="font-bold text-2xl mb-4">Sign In</h2>
                <p>Please sign into your Degree Door account</p>
              </div>
              <div className="field-wrapper m-2">
                <label className="field-label font-semibold mb-2">Email</label>
                <input 
                  className="field-input border-2 border-slate-300 outline-0 rounded-md w-full my-2 p-4 hover:shadow duration-200 ease-in-out"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  name="firstName"
                  value={formData.firstName}
                /> 
              </div>
              <div className="field-wrapper m-2">
                <label className="field-label font-semibold mb-2">Password</label>
                <input
                  className="field-input border-2 border-slate-300 outline-0 rounded-md w-full my-2 p-4 hover:shadow duration-200 ease-in-out"
                  type="text"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formData.lastName}
                />
              </div>
              <button type="submit" class="w-full flex justify-center bg-green-600 
               hover:bg-green-400 text-gray-100 p-3 mb-6 rounded-full tracking-wide 
               font-semibold  shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Sign in
              </button>
              <Link href="/register">
                <button type="button" class="w-full flex justify-center bg-green-600 
                hover:bg-green-400 text-gray-100 p-3  rounded-full tracking-wide 
                font-semibold  shadow-lg cursor-pointer transition ease-in duration-300"
                >
                  Don't have an account? Sign up!
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
      {/*Include another div that will provide the gradient for the login page.*/}
      <div className="login-page-gradient absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
    </>  
  )
}