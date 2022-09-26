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
      <section>
        <div>Left Side</div>
        <div className="register-right w-2/5 relative">
          <Image src="/oldMain.jpg" alt="Old Main WSU" layout="fill" objectFit="contain" />
        </div>
      </section>
    </div>

  )
}