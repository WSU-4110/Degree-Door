import Link from 'next/link'
import { collection, query, getDocs } from "firebase/firestore"
import { useRouter } from 'next/router'

import Dropdown from '../components/Dropdown'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Footer from '../components/Footer'
import ProtectedRoute from '../components/HOC/ProtectedRoute'
import FavoriteDegree from '../components/FavoriteDegree'
import { db } from '../firebase'
import Carousel from '../components/Carousel'

export default function Home({degreeDocs, favDegrees}) {
  const router = useRouter()

  return(
    <ProtectedRoute>
      {/* begin nav bar */}
      <nav className="bg-[#292828] px-2 py-2.5">
        <div className="container flex text-[#FFFFFF] justify-between items-center ">
          <div className="navbar-brand flex">
            <img className="w-6 h-6 ml-2 text-[#FFFFFF]" src="https://i.imgur.com/PUIKaAn.png"></img><b>egreeDoor</b>
          </div>
          <Searchbar degrees={degreeDocs} user={router.query.userID}/>
          <div className="flex">
            <Dropdown color="#FFFFFF"/>
          </div>
        </div>
      </nav>

      <div className="relative h-[200px] mt-5 mb-14 w-auto bg-white">
        {/* <img src='https://i.imgur.com/FVOB96X.png' className='h-20 w-20'></img> */}
        <h1 className="absolute text-4xl top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent font-bold bg-clip-text bg-gradient-to-r from-green-700 to-green-900">Welcome to DegreeDoor</h1>
        <p className="absolute top-[110px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-3 font-light text-center text-gray-500 dark:text-gray-400">A collaborative space allowing students and faculty to share their experiences with upcoming students.  Providing information of courses, degrees, and work loads in a forum like style allowing access to inside information. The one stop shop for all things college, course, and degree related!</p>
        <p className='absolute top-[180px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black'>
          <button type="button" class="text-white bg-green-900 hover:bg-green-800 font-medium rounded-md text-sm px-4 py-2 text-center inline-flex">
            Learn More
            <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </p>
      </div>
      <Carousel degrees={degreeDocs} user={router.query.userID}/>

      <div className='font-mono mt-[80px] mb-10 mx-4'>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mb-4 text-2xl font-bold">Favorited Degrees</h2>   
          <div className='flex items-center justify-center gap-4 w-full h-full'>
            {favDegrees && favDegrees.map((degree, index) => (
              <FavoriteDegree key={index} degree={degree} user={router.query.userID} />
            ))}
          </div>
        </div>
      </div>
      <Footer userID={router.query.userID}/>
    </ProtectedRoute>
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