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
            <Link href={{pathname: "/", query: {userID: router.query.userID}}}>
              <div className="navbar-brand cursor-pointer flex">
                <img class="w-6 h-6 ml-2" src="https://i.imgur.com/jooFjXL.png"></img><b>egreeDoor</b>
              </div>
            </Link>
            <div className="flex md:order-2">
                <Dropdown />
            </div>
            <div className="md:flex md:w-auto">
              <ul className="flex flex-col p-2 mt-4 items-center bg-gray-50 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0 md:bg-white">
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

        <div class="p-8 h-[430px] bg-[url('https://www.csustan.edu/sites/default/files/styles/media_1440x352/public/2022-08/cs_grant.png?itok=ufO-IZWB')]">
            <div>
              <div className="display-degree-name font-bold text-white uppercase text-5xl text-center mt-[120px]">
                  {name}
              </div>
              <p className="text-lg text-white uppercase text-center mb-20">
                  {description}
              </p>
            </div>

          <div className="grid grid-cols-3 gap-8 m-auto w-[1150px]">
            
            <div className="flex items-center justify-center rounded-md p-4 mb-4 shadow-md bg-gray-100 border-t-4 border-[#de9b61] dark:bg-gray-200">
                <div className="ml-3 text-sm font-medium text-gray-700">
                  Artificial intelligence, wireless sensors, bioinformatics, video game design — these are just a few of the exciting fields computer science graduates can enter. The Department of Computer Science in Wayne State's College of Engineering offers an innovative education focused on the fundamentals of computer science while emphasizing new technologies, so our graduates are ready to step right into careers. The department is closely aligned with other academic areas, including business and medicine, to give students interdisciplinary options. Our students get jobs immediately in this promising field - a field that continues to grow and evolve.
                </div>
            </div>
            <div className="flex items-center justify-center rounded-md p-4 mb-4 shadow-md bg-gray-100 border-t-4 border-[#de9b61] dark:bg-gray-200">
                <div className="ml-3 text-sm font-medium text-gray-700">
                  <p> At Wayne State's College of Engineering, you'll learn from nationally renowned faculty experts and benefit from our High Impact Practices of Student Success: team-based learning, global perspective, undergraduate research, internships and co-ops, and community service. </p>
                </div>
            </div>
            <div className="flex items-center justify-center rounded-md p-4 mb-4 shadow-md bg-gray-100 border-t-4 border-[#de9b61] dark:bg-gray-200">
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