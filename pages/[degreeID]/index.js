import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'

import Navbar from '../../components/Navbar'
import { db } from '../../firebase'
export default function DegreeHome({name, description}) {
  return (
    <div className="degree-home bg-white font-Karla relative">
      <Navbar links={[{route: "/post", name: "Post Review"}, {route:"/signOut", name: "Sign Out"}]}/>
      <header class="header-wrapper w-full container mx-auto pt-12">
        <div class="name-description-wrapper flex flex-col items-center py-12">
            <div class="display-degree-name font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
                {name}
            </div>
            <p class="text-lg text-gray-600">
                {description}
            </p>
        </div>
      </header>
      <div>Hello, check if Karla is working</div>
    </div>

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