import Alert from '@mui/material/Alert';
import { useState } from 'react'
import { Zoom } from '@mui/material'

import bg from '../public/oldMain.jpg'
import Navbar from "../components/Navbar"

export default function Login() {
  // Keep track of state to show an alert.
  const [showAlert, setShowAlert] = useState(false)

  // Keep track of alert message state.
  const [alertMessage, setAlertMessage] = useState("")

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

  return (
    /* The Login page will have two sections to it:
      1. Welcome text that is displayed above the login form
      2. The login form where the user can enter their credentials
      or can go to the registration page.
    */ 
    <>
      <Navbar links={[{route: "/register", name: "Register"}, {route:"/login", name: "Login"}]}/>
      <div 
        className="login-page-background flex justify-center min-w-screen min-h-screen bg-no-repeat bg-cover bg-center relative font-Inter" 
        style={{backgroundImage: `url(${bg.src})`}}
      >
        {/*Include another div that will provide the gradient for the login page.*/}
      <div className="login-page-gradient absolute bg-gradient-to-b min-w-screen min-h-screen from-green-400 to-green-300 opacity-75 inset-0 z-0"></div>
        <div className="login-page-wrapper flex flex-col justify-center">
          <div className="login-page-welcome flex flex-col self-center p-8 z-10">
            <div className="self-start flex flex-col items-center text-white">
              <h1 className="login-message-h1 text-8xl font-bold mb-3 ">Welcome to Degree Door</h1>
              <p className="login-message-p text-2xl font-bold pr-3">Login to Degree Door and get started on looking at your degree!</p>
            </div>
          </div>
          <div className="login-page-form flex justify-center self-center z-10">
            {/* The following component is a Material UI component that will
            render an animated Alert message to the screen if the user 
            fails to log in.*/}
            <Zoom in={showAlert} style={{ transitionDelay: showAlert ? '500ms' : '0ms' }}>
              <Alert 
                variant="filled" 
                sx={{zIndex: 100, position: "absolute", fontSize: "1.25rem"}} 
                severity="error"
                onClose={() => setShowAlert(false)}
              >
                {alertMessage}
              </Alert>
            </Zoom>
            <form className="form-wrapper p-10 bg-white m-auto mb rounded-xl w-100 shadow-float">
              <div className="form-text mb-4 flex flex-col items-center">
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
                  name="email"
                  value={formData.email}
                /> 
              </div>
              <div className="field-wrapper m-2">
                <label className="field-label font-semibold mb-2">Password</label>
                <input
                  className="field-input border-2 border-slate-300 outline-0 rounded-md w-full my-2 p-4 hover:shadow duration-200 ease-in-out"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                />
              </div>
              <div className="field-wrapper m-4 flex justify-end">
              <a className="cursor-pointer no-underline hover:underline">Forgot password?</a>
              </div>
              <button type="submit" className="login-btn w-full bg-green-600 
               hover:bg-green-400 hover:scale-90 text-gray-100 p-3 mb-6 rounded-full tracking-wide 
               font-semibold shadow-lg cursor-pointer transition ease-in-out duration-300"
              >
                Sign in
              </button>
              <button type="button" className="go-to-register-page-btn w-full justify-center bg-green-600 
                hover:bg-green-400 hover:scale-90 text-gray-100 p-3 rounded-full tracking-wide 
                font-semibold shadow-lg cursor-pointer transition ease-in-out duration-300"
              >
                Don't have an account? Sign up!
              </button>
            </form>
          </div>
        </div>
      </div>
    </>  
  )
}