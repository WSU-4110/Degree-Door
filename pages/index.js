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
        <div className="flex flex-col">
          <h2 className="mb-4 text-2xl font-bold">Favorited Degrees</h2>
          <div className="mt-4 grid grid-col-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className='after:: content-none clear-both table mx-auto w-full h-full'>
              {favDegrees && favDegrees.map((degree, index) => (
              <Link href={{pathname: `/${degree.link}`, query: {userID: router.query.userID}}} key={index}>
              <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
                <div className="flex h-14 w-14   items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                  <div>
                    <br></br>
                    <p class="text-align: right-5 text-center">{degree.name}</p>
                    Info: 
                    <p class="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, ei his summo accumsan. Ex sed timeam quaeque efficiantur, ex soleat efficiendi usu. Fugit praesent eos ut, ut pro eius consul accusamus, iudicabit maluisset disputando per ad. </p>
                    <br></br>
                    <p class="text-center"> x </p>
                  </div>
                </div>
              </Link>
          ))}
          </div>
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