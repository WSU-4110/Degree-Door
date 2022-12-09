import { useRouter } from "next/router"
import { useState } from 'react'
import { doc, setDoc, collection, getDocs, getDoc, query } from 'firebase/firestore'

import Footer from "../components/Footer"
import { db } from "../firebase"
import { GeneralSuccessDialog } from "../components/Dialogs"

export default function Profile({ userData }){
  const router = useRouter()
  const { userID } = router.query
  const [openSuccess, setOpenSuccess] = useState(false)
  const [formData, setFormData] = useState(
    {
      firstName: userData.firstName,
      lastName: userData.lastName,
      status: userData.status,
      about: userData.about || "",
    }
  )

  function handleChange(event) {
    const { name, value } = event.target // Destruct props from event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value // ES6 computed name syntax for field
      }
    })
  }

  async function handleSubmit(event) {
    const userFirstName = formData.firstName.trim()
    const userLastName = formData.lastName.trim()

    event.preventDefault() // Prevent page from refreshing
    const docRef = doc(db, "Users", userID) // Make a document reference to the new user
    const userData = { // Set user data using the form data 
      firstName: userFirstName,
      lastName: userLastName,
      status: formData.status === "" ? "Upcoming Student" : formData.status,
      about: formData.about
    }

    await setDoc(docRef, userData, { merge: true }) // Create the new user document
    setOpenSuccess(true)
  }
  return (
  <div>
    <NewNavbar pageTitle="Profile" userID={userID} />
    <div className="mt-10"> 
      <div className="m-auto w-full max-w-sm">
        <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://static01.nyt.com/images/2021/07/28/us/28xp-arthur/28xp-arthur-mediumSquareAt3X.png" alt="Arthur"/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.firstName} {userData.lastName}</h5>
        </div>
      </div>
    </div>
    {openSuccess && <GeneralSuccessDialog openSuccess={openSuccess} message="Profile successfully updated!" />}
    <div className="mt-2 mx-96 border shadow-md rounded-md p-10">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" name="firstName" onChange={handleChange} value={formData.firstName} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" id="last_name" name="lastName" onChange={handleChange} value={formData.lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
          </div>
          <div>
            <label htmlFor="Status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
            <select 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            id="status"
            name="status"
            onChange={handleChange}
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
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userData.email} readOnly/>
        </div> 
      <div className="mb-6">
        <label htmlFor="About me" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About me</label>
        <textarea name="about" onChange={handleChange} value={formData.about} type="text" id="About me" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hello my name is..."/>
      </div> 
        <button type="Save" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
      </form>
    </div>
    <Footer userID={userID}/>
  </div>
  )
}

export async function getServerSideProps(context) {
  const docRef = doc(db, `Users/${context.query.userID}`) // Create collection reference
  const userSnapshot = await getDoc(docRef); // Get document snapshots from firestore
  const { firstName, lastName, status, about, email } = userSnapshot.data()


  const favoritesRef = query(collection(db,`Users/${context.query.userID}/Favorites`))
  const favoritesSnapshot = await getDocs(favoritesRef)

  // Get both degree name and description from the document.


  const favDegreesData = favoritesSnapshot.docs.map((doc) => ({
    link: doc.id,
    name: doc.data().degreeName,
    description: doc.data().description
  }))

  // Return server side props
  return {
    props: { 
      userData: {
        firstName: firstName,
        lastName: lastName,
        status: status,
        email: email,
        about: about
      },
      favDegrees: favDegreesData
    }
  };
}