import Link from 'next/link'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'

import Dropdown from '../../components/Dropdown'
import FavoritesDialog from '../../components/FavoritesDialog'
import ProtectedRoute from '../../components/HOC/ProtectedRoute'
import { db } from '../../firebase'

export default function DegreeHome({info, initFavState}) {
  const router = useRouter()

  return (
    <ProtectedRoute>
      <div className="degree-home font-Inter">
        {/* begin nav bar for degree name */}
        <nav className="bg-[#292c2c] px-2 sm:px-4 py-30 pt-0.5 pb-0.5 m-auto items-center">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <ul className="m-auto md:text-sm md:bg-[#292c2c]">
              <li>
                <p className="text-white md:p-0 uppercase">
                <b>{info.degreeName}</b>
                </p>
              </li>
            </ul>
          </div>
         </nav>
         {/* end nav bar for degree name */}

        {/* begin nav bar */}
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-[#292c2c]">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link href={{pathname: "/", query: {userID: router.query.userID}}}>
              <div className="navbar-brand cursor-pointer flex">
                <img className="w-6 h-6 ml-2" src="https://i.imgur.com/jooFjXL.png"></img><b>egreeDoor</b>
              </div>
            </Link>
            <div className="flex md:order-2">
                <Dropdown />
            </div>
            <div className="md:flex md:w-auto">
              <ul className="flex flex-col p-2 mt-4 items-center bg-gray-50 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0 md:bg-white">
                <li>
                  <p className="block py-2 pr-4 pl-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white" aria-current="page">
                    <b>OVERVIEW</b>
                  </p>
                </li>
                <li>
                  <Link href={{pathname: `/${router.query.degreeID}/reviews`, query: {userID: `${router.query.userID}`, degreeName: `${info.degreeName}`}}}>
                    <p className="cursor-pointer block py-2 pr-4 pl-3 text-[#292c2c] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400">
                      <b>REVIEWS</b>
                    </p>
                  </Link>
                </li>
                <li>
                <Link href={{pathname: `/${router.query.degreeID}/post`, query: {userID: `${router.query.userID}`, degreeName: `${info.degreeName}`}}}>
                  <p className="cursor-pointer block py-2 pr-4 pl-3 text-[#292c2c] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400">
                    <b>POST A REVIEW</b>
                  </p>
                </Link>
                </li>
                <li>
                  <FavoritesDialog degree={router.query.degreeID} initFavState={initFavState}/>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* end nav bar */}

        {/* begin component that dislays degree name/description */}
        <div className="p-8 h-[400px] bg-[url('https://www.csustan.edu/sites/default/files/styles/media_1440x352/public/2022-08/cs_grant.png?itok=ufO-IZWB')] bg-no-repeat bg-cover">
          <div>
            <div className="display-degree-name font-bold text-white uppercase text-5xl text-center mt-[120px]">
              {info.degreeName}
            </div>
            <p className="text-lg text-white uppercase text-center mb-20">
              {info.description}
            </p>
          </div>
          {/* end degree name/description component */}

          {/* begin grid to display degree info */}
          <div className="grid grid-cols-3 gap-8 m-auto w-[1150px]">
            <div className="cursor-pointer flex items-center justify-center rounded-md p-4 mb-4 shadow-md border-t-4 border-[#de9b61] bg-[#f9f9f9] transition hover:scale-90 duration-200 ease-in-out">
              <a target="_blank" href="https://engineering.wayne.edu/computer-science" rel="noreferrer"> 
                <div className="ml-3 text-sm font-medium text-[#292c2c]">
                  Artificial intelligence, wireless sensors, bioinformatics, video game design — these are just a few of the exciting fields computer science graduates can enter. The Department of Computer Science in Wayne State's College of Engineering offers an innovative education focused on the fundamentals of computer science while emphasizing new technologies, so our graduates are ready to step right into careers. The department is closely aligned with other academic areas, including business and medicine, to give students interdisciplinary options. Our students get jobs immediately in this promising field - a field that continues to grow and evolve.
                </div>
              </a>
            </div>
            <div className="cursor-pointer flex items-center justify-center rounded-md p-4 mb-4 shadow-md border-t-4 border-[#de9b61] bg-[#f9f9f9] transition hover:scale-90 duration-200 ease-in-out">
              <a target="_blank" href="https://engineering.wayne.edu/computer-science" rel="noreferrer"> 
                <div className="ml-3 text-sm font-medium text-[#292c2c]">
                  At Wayne State's College of Engineering, you'll learn from nationally renowned faculty experts and benefit from our High Impact Practices of Student Success: team-based learning, global perspective, undergraduate research, internships and co-ops, and community service.
                </div>
              </a>
            </div>
            <div className="cursor-pointer flex items-center justify-center rounded-md p-4 mb-4 shadow-md border-t-4 border-[#de9b61] bg-[#f9f9f9] transition hover:scale-90 duration-200 ease-in-out">
              <a target="_blank" href="https://engineering.wayne.edu/computer-science" rel="noreferrer"> 
                <div className="ml-3 text-sm font-medium text-[#292c2c]">
                  Click here for more information about Wayne State's {info.degreeName} Program!
                </div>
              </a>
            </div>
          </div>
          {/* end grid */}
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
  const degreeInfo = docSnap.data();

  // Return server side props
  return {
    props: { 
      initFavState: initFavState,
      info: degreeInfo,
    }
  };
}