import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { Zoom } from '@mui/material'

export default function MockRegister() {

  // Keep style of input elements in the register page as one variable
  const commonInputStyle = "field-input border-2 border-gray-400 outline-0 rounded-md w-full mt-2 p-4 hover:shadow duration-200 ease-in-out"
  
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
  // for the data of the form fields
  function handleChange(event) {
    const { name, value } = event.target // Destruct props from event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value // ES6 computed name syntax for field
      }
    })
  }

  // Render the following onto the register page
  return (
    <>
      {/* <Navbar links={[{route: "/register", name: "Register"}, {route:"/login", name: "Login"}]}/> */}
      <div className="register-page min-h-screen min-w-screen bg-gray-100 font-Inter">
        <div className="register-wrapper flex">
          <div className="register-left p-20 w-3/5 relative">
          {/* The following component is a Material UI component that will
          render an animated Alert message to the screen after the user submits
          the form for registering an account.*/}
          <Zoom in={true}>
            <Alert 
              variant="filled" 
              sx={{zIndex: 100, position: "absolute", fontSize: "1.25rem",  right: "5rem"}} 
              severity="success"
            >
              Message
            </Alert>
          </Zoom>
            <h1 className="signup-h1 mb-4 text-2xl">Sign up for Degree Door!</h1>
            <h6 className="signup-h6 mb-8 text-gray-500">Let's get you set up so you can start reviewing degrees.</h6>
            <div className="form-wrapper bg-white rounded shadow-float px-6 py-8">
              <form className="form-section grid grid-cols-2 text-xl gap-8">
                {/*
                  Each field-wrapper div will resize itself to fit within the grid
                  column.

                  For each field label, it will have a margin-bottom of
                  0.5 rem. 
                  
                  For each input field, each box will have a rounded 
                  border of 0.375 rem, an outline of 0 when typing, a margin-top
                  of 0.5 rem, and a padding of 4. Additionally, they will take
                  up the max width of the div they are in.

                  Since each div uses the same style, we will store the constant and
                  reuse it for each input element.
                */}
                <div className="field-wrapper col">
                  <label className="field-label mb-2">First Name</label>
                  <input 
                    className={commonInputStyle}
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
                    className={commonInputStyle}
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
                    className={commonInputStyle}
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
                    className={commonInputStyle}
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
                    className={commonInputStyle}
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
                    className={commonInputStyle}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                  />
                </div>
                <button className="signup-submit-button bg-green-600 hover:bg-green-500 hover:scale-90 duration-300
                  ease-in-out text-white rounded-full mt-6 p-4 cursor-pointer justify-between items-center"
                  type="submit"
                >
                  Sign-up!
                </button>
                <a>
                  <button className="signup-submit-button bg-green-600 hover:bg-green-500 hover:scale-90 duration-300
                    ease-in-out text-white rounded-full mt-6 p-4 cursor-pointer justify-between items-center"
                    type="button"
                  >
                    Return to login!
                  </button>
                </a>
              </form>
            </div>
          </div>
          <div className="register-right w-2/5 relative">
            {/* <Image src="/oldMain.jpg" alt="Old Main WSU" layout="fill" objectFit="contain" /> */}
          </div>
        </div>
      </div>
    </>
  )
}