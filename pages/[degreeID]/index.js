import Link from 'next/link'
import { useRouter } from 'next/router'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

import Dropdown from '../../components/Dropdown'
import FavoritesDialog from '../../components/FavoritesDialog'
import Navbar from '../../components/Navbar'
import ProtectedRoute from '../../components/HOC/ProtectedRoute'
import { db } from '../../firebase'
import { useAuthContext } from '../../context/AuthContext'
export default function DegreeHome({name, description, initFavState}) {
  const router = useRouter()
  const { user } = useAuthContext()

  async function handleFavorites() {
    const docRef = doc(db,`Users/${user.uid}/Favorites`,`${router.query.degreeID}`)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      const favoriteData = {
        degreeName: name
      }
      await setDoc(docRef, favoriteData)
      return true;
    }

    await deleteDoc(docRef)
    return false;
  }

  return (
    <ProtectedRoute>
      <div className="degree-home bg-white font-Inter relative">
        <Navbar user={router.query.userID}>
          <Dropdown />
        </Navbar>
        <header className="header-wrapper w-full container mx-auto pt-12">
          <div className="name-description-wrapper flex flex-col items-center py-12">
              <div className="display-degree-name font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
                  {name}
              </div>
              <p className="text-lg text-gray-600 text-center">
                  {description}
              </p>
          </div>
        </header>
        {/* The following component is a Material UI component that will
        render an animated Dialog message to the screen if the user 
        fails to log in.*/}
        <nav className="degree-page-nav w-full py-4 border-t border-b bg-gray-100">
          <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
            <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
              <Link href={{pathname: `/${router.query.degreeID}/`, query: {userID: `${router.query.userID}`}}}>
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Overview</a>  
              </Link>
              <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Links</a>
              <Link href={{pathname: `/${router.query.degreeID}/reviews`, query: {userID: `${router.query.userID}`}}}>
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Reviews</a>
              </Link>
              { <FavoritesDialog favoriteHandler={handleFavorites} initFavState={initFavState}/>}
            </div>
          </div>
        </nav>
        <div className="text-center">Hello, this is an overview of what the Overview page should look like.</div>
      </div>
    </ProtectedRoute>
  )
}

export async function getServerSideProps(context) {

  const favRef = doc(db,`Users/${context.query.userID}/Favorites`,`${context.params.degreeID}`)
  const favSnap = await getDoc(favRef)

  const docRef = doc(db, "Degrees", `${context.params.degreeID}`); // Create doc reference
  const docSnap = await getDoc(docRef); // Get document snapshot from firestore

  // Get both degree name and description from the document.
  const initFavState = favSnap.exists();
  const degreeName = docSnap.data().degreeName; 
  const degreeDescription = docSnap.data().description;

  // Return server side props
  return {
    props: { 
      initFavState: initFavState,
      name: degreeName,
      description: degreeDescription,
    }
  };
}