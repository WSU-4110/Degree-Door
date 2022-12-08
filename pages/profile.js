import { collection, query, getDocs } from "firebase/firestore"
import Dropdown from "../components/Dropdown"
import Link from 'next/link'
import { useRouter } from "next/router"
import { useState } from 'react'
import FavoriteDegree from '../components/FavoriteDegree'
import { db } from '../firebase'


export default function Profile({favDegrees}){
    const router = useRouter()

    return (
        <div>
        {/* begin nav bar */}
        <nav className="bg-[#292828] border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
        <div className="container text-white flex flex-wrap justify-between items-center mx-auto">
            <Link href={{pathname: "/", query: {userID: router.query.userID}}}>
            <div className="navbar-brand cursor-pointer flex">
                <img className="w-6 h-6 ml-2 text-[#FFFFFF]" src="https://i.imgur.com/PUIKaAn.png"></img><b>egreeDoor</b>
            </div>
            </Link>
            <div className="flex ml-[190px] text-white">
                <b>Profile Settings</b>
            </div>
            <div className="flex md:order-2">
            <Dropdown color="#FFFFFF"/>
            </div>
            <div className="md:flex md:w-auto">
            <ul className="mt-4 items-center bg-gray-50 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0 md:bg-white">
            </ul>
            </div>
        </div>
        </nav>
        {/* end nav bar */}

        <div className="mt-10"> 
            <div className="m-auto w-full max-w-sm">
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://static01.nyt.com/images/2021/07/28/us/28xp-arthur/28xp-arthur-mediumSquareAt3X.png" alt="Arthur"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Test User</h5>
                </div>
            </div>
        </div>

        <div className="mt-2 mx-96 border shadow-md rounded-md p-10">
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
                    </div>
                    <div>
                        <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
                    </div>
                    <div>
                        <label for="Status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="status"
                        name="status"
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
                    <div>
                        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                    </div>
                </div>
                <div className="mb-6">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Test@email.com" required/>
                </div> 
                <div className="mb-6">
                    <label for="About me" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About me</label>
                    <textarea type="text" id="About me" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hello my name is..." required/>
                </div> 
                <button type="Save" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>
        </div>
        <h2 className="my-10 mb-4 mx-5 text-2xl font-bold">Favorited Degrees</h2>
        <div className='flex gap-4 mx-5 w-full h-full'>
            {favDegrees && favDegrees.map((degree, index) => (
              <FavoriteDegree key={index} degree={degree} user={router.query.userID} />
            ))}  
        </div>
    </div>
    )
}

export async function getServerSideProps(context) {
    const collectionRef = query(collection(db, "Degrees")); // Create collection reference
    const degreesSnapshot = await getDocs(collectionRef); // Get document snapshots from firestore
  
    const favoritesRef = query(collection(db,`Users/${context.query.userID}/Favorites`))
    const favoritesSnapshot = await getDocs(favoritesRef)
  
    // Get both degree name and description from the document.
    const degreesData = degreesSnapshot.docs.map((doc) => ({
      link: doc.id,
      name: doc.data().degreeName
    }))
  
  
    const favDegreesData = favoritesSnapshot.docs.map((doc) => ({
      link: doc.id,
      name: doc.data().degreeName,
      description: doc.data().description
    }))
    // Return server side props
    return {
      props: { 
        degreeDocs: degreesData,
        favDegrees: favDegreesData
      }
    };
  }