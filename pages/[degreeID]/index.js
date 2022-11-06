import Link from 'next/link'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'

import Dropdown from '../../components/Dropdown'
import NavbarHOC from '../../components/HOC/NavbarHOC'
import { db } from '../../firebase'
export default function DegreeHome({name, description}) {
  const router = useRouter()

  return (
    <NavbarHOC authenticated={true}>
      <div className="degree-home bg-white font-Inter relative">
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
        <nav className="degree-page-nav w-full py-4 border-t border-b bg-gray-100">
          <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
            <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
              <Link href={`/${router.query.degreeID}/`}>
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Overview</a>  
              </Link>
              <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Links</a>
              <Link href={`/${router.query.degreeID}/reviews`}>
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Reviews</a>
              </Link>
            </div>
            </div>
        </nav>
        <div className="text-center">Hello, this is an overview of what the Overview page should look like.</div>
      </div>
    </NavbarHOC>
    
  )
}

export async function getServerSideProps(context) {
  const docRef = doc(db, "Degrees", `${context.params.degreeID}`); // Create doc reference
  const docSnap = await getDoc(docRef); // Get document snapshot from firestore

  // Get both degree name and description from the document.
  const degreeName = docSnap.data().degreeName; 
  const degreeDescription = docSnap.data().description;

  // Return server side props
  return {
    props: { 
      name: degreeName,
      description: degreeDescription,
    }
  };
}