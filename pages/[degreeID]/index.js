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
        {/* The following component is a Material UI component that will
        render an animated Dialog message to the screen if the user 
        fails to log in.*/}
        <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
          <div class="container flex flex-wrap justify-between items-center mx-auto">
            <div className="navbar-brand cursor-pointer flex">
              <b>DegreeDoor</b>
              <img class="w-6 h-6 ml-2" src="https://i.imgur.com/ITzOzDt.png"></img>
            </div>
            <div className="flex md:order-2">
                <button type="button" className="text-white bg-green-800 hover:bg-green-700 rounded-lg text-sm px-5 py-2.5">
                  SIGN OUT
                </button>
            </div>
            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
              <ul className="flex flex-col p-4 mt-4 items-center bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                <li>
                  <p className="cursor-pointer block py-2 pr-4 pl-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white" aria-current="page">
                    <b>OVERVIEW</b>
                  </p>
                </li>
                <li>
                  <Link href={{pathname: `/${router.query.degreeID}/reviews`, query: {userID: `${router.query.userID}`, degreeName: name}}}>
                    <p className="cursor-pointer block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400">
                      <b>REVIEWS</b>
                    </p>
                  </Link>
                </li>
                <li>
                <Link href={{pathname: `/${router.query.degreeID}/post`, query: {userID: `${router.query.userID}`}}}>
                  <p className="cursor-pointer block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400">
                    <b>POST A REVIEW</b>
                  </p>
                </Link>
                </li>
                <li>
                  <FavoritesDialog favoriteHandler={handleFavorites} initFavState={initFavState}/>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <nav className="justify-between degree-page-nav w-full py-4 border-t border-b bg-gray-100">
          <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
            <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase px-6 py-2">
              <Link href={{pathname: `/${router.query.degreeID}/reviews`, query: {userID: `${router.query.userID}`, degreeName: name}}}>
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Reviews</a>
              </Link>
              { <FavoritesDialog favoriteHandler={handleFavorites} initFavState={initFavState}/>}
            </div>
          </div>
        </nav> */}

        <div class="p-8 h-[430px] bg-[url('https://www.csustan.edu/sites/default/files/styles/media_1440x352/public/2022-08/cs_grant.png?itok=ufO-IZWB')]">
            <div>
              <div className="display-degree-name font-bold text-white uppercase text-5xl text-center mt-[120px]">
                  {name}
              </div>
              <p className="text-lg text-white uppercase text-center mb-20">
                  {description}
              </p>
            </div>

          <div className="grid grid-cols-3 gap-8 ml-[100px] w-[1150px]">
            <div className="flex items-center justify-center rounded-md p-4 mb-4 shadow-md bg-gray-100 border-t-4 border-gray-900 dark:bg-gray-200">
                <div className="ml-3 text-sm font-medium text-gray-700">
                  Artificial intelligence, wireless sensors, bioinformatics, video game design — these are just a few of the exciting fields computer science graduates can enter. The Department of Computer Science in Wayne State's College of Engineering offers an innovative education focused on the fundamentals of computer science while emphasizing new technologies, so our graduates are ready to step right into careers. The department is closely aligned with other academic areas, including business and medicine, to give students interdisciplinary options. Our students get jobs immediately in this promising field - a field that continues to grow and evolve.
                </div>
            </div>
            <div className="flex items-center justify-center rounded-md p-4 mb-4 shadow-md bg-gray-100 border-t-4 border-gray-900 dark:bg-gray-200">
                <div className="ml-3 text-sm font-medium text-gray-700">
                  <p> At Wayne State's College of Engineering, you'll learn from nationally renowned faculty experts and benefit from our High Impact Practices of Student Success: team-based learning, global perspective, undergraduate research, internships and co-ops, and community service. </p>
                </div>
            </div>
            <div className="flex items-center justify-center rounded-md p-4 mb-4 shadow-md bg-gray-100 border-t-4 border-gray-900 dark:bg-gray-200">
                <div className="ml-3 text-sm font-medium text-gray-700">
                  <p> Click <a href="https://engineering.wayne.edu/computer-science"><span className='text-lime-500'>here</span></a> for more information about Wayne State's Computer Science Program!</p>
                </div>
            </div>
          </div>
        </div>
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