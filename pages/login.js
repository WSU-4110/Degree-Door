import { useState } from 'react'

import bg from '../public/oldMain.jpg'

export default function Login() {

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
    <>
      <div className="login-page-background flex justify-center min-w-screen min-h-screen bg-no-repeat bg-cover bg-center relative" style={{backgroundImage: `url(${bg.src})`}}>
        <div className="login-page-wrapper flex flex-col justify-center">
          <div className="login-page-welcome flex flex-col self-center p-8 z-10">
            <div class="self-start flex flex-col items-center text-white">
              <h1 class="login-message-h1 mb-3 font-bold text-8xl">Welcome to Degree Door</h1>
              <p class="login-message-p text-lg font-bold pr-3">Login to Degree Door and get started on looking at your degree!</p>
            </div>
          </div>
          <div className="login-page-form flex justify-center self-center z-10">
            <form className="form-wrapper p-12 bg-white m-auto mb rounded-xl w-100">
              <div className="form-text mb-4">
                <h2 className="font-bold text-2xl mb-4">Sign In</h2>
                <p>Please sign into your Degree Door account.</p>
              </div>
              <div className="field-wrapper m-2">
                <label className="field-label font-semibold mb-2">Email</label>
                <input 
                  className="field-input border outline-0 rounded-md w-full my-2 p-4"
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
                  className="field-input border outline-0 rounded-md w-full my-2 p-4"
                  type="text"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formData.lastName}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="login-page-gradient absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
    </>
    
  )
}