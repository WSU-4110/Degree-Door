import Link from 'next/link'
import { collection, query, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router'

import Dropdown from '../components/Dropdown'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import ProtectedRoute from '../components/HOC/ProtectedRoute'
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
      <div className='font-mono mt-80 ml-10'>
        <h1>Degrees</h1>
      </div>
      
      <div className='after:: content-none clear-both table mx-auto w-full h-full'>
        {favDegrees.map((degree, index) => (
          <Link href={{pathname: `/${degree.link}`, query: {userID: router.query.userID}}} key={index}>
            <div className='float-left w-1/5 h-20 p-5px'>
              {degree.name}
            </div>
          </Link>

        ))}
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
    name: doc.data().degreeName
  }))
  // Return server side props
  return {
    props: { 
      degreeDocs: degreesData,
      favDegrees: favDegreesData
    }
  };
}