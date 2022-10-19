import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'

import Navbar from '../../components/Navbar'
import { db } from '../../firebase'
export default function DegreeHome({name, description}) {
  return (
    <div className="degree-home bg-white font-Karla">
      <Navbar links={[{route: "/post", name: "Post Review"}, {route:"/signOut", name: "Sign Out"}]}/>
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