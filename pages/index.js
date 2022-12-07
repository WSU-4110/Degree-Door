import Link from 'next/link'
import { collection, query, getDocs } from "firebase/firestore"
import { useRouter } from 'next/router'

import Dropdown from '../components/Dropdown'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import ProtectedRoute from '../components/HOC/ProtectedRoute'
import FavoriteDegree from '../components/FavoriteDegree'
import { db } from '../firebase'

export default function Home({degreeDocs, favDegrees}) {
  const router = useRouter()

  return(
    <ProtectedRoute>
      <Navbar user={router.query.userID}>
        <Dropdown />
      </Navbar>
      <div className="relative">
        <img src='homepage2.png' alt='waynestate-banner'/>
        <h1 className="absolute text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold">Degree Door</h1>
      </div>
      <Searchbar degrees={degreeDocs} user={router.query.userID}/>
      <div className='font-mono mt-80 mb-10 mx-4'>
        <div className="flex flex-col">
          <h2 className="mb-4 text-2xl font-bold">Favorited Degrees</h2>   
          <div className='flex gap-4 mx-auto w-full h-full'>
            {favDegrees && favDegrees.map((degree, index) => (
              <FavoriteDegree degree={degree} user={router.query.userID} />
            ))}
          </div>
        </div>
      </div>
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