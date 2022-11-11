import Link from 'next/link'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'

import Dropdown from '../../components/Dropdown'
import Navbar from '../../components/Navbar'
import { db } from '../../firebase'
import DecoratorDegreeHeader from '../../components/DecoratorDegreeHeader'



export default function DegreeHome({name, description}) {
  const router = useRouter()

  return (
    <div className="degree-home bg-white font-Inter relative">
      <Navbar links={[{route: "/", name: "Home"},{route: "/post", name: "Post Review"}]}>
        <Dropdown />
      </Navbar>
      <DecoratorDegreeHeader name={name} description={description} />
      <nav className="degree-page-nav w-full py-2 border-t border-b bg-gray-100">
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
      <body>
        <div className='float-left pr-5 pt-5 pl-5'>
          <img className='' src="https://upload.wikimedia.org/wikipedia/commons/3/38/MacabeesBuilding2010.jpg" alt="Wayne State Building" width="400"></img>
          </div>
          <div className='p-3 font-Inter'>
            <p> Artificial intelligence, wireless sensors, bioinformatics, video game design — these are just a few of the exciting fields computer science graduates can enter. The Department of Computer Science in Wayne State's College of Engineering offers an innovative education focused on the fundamentals of computer science while emphasizing new technologies, so our graduates are ready to step right into careers. The department is closely aligned with other academic areas, including business and medicine, to give students interdisciplinary options. Our students get jobs immediately in this promising field - a field that continues to grow and evolve. </p>
            <p> At Wayne State's College of Engineering, you'll learn from nationally renowned faculty experts and benefit from our High Impact Practices of Student Success: team-based learning, global perspective, undergraduate research, internships and co-ops, and community service. </p>
            <p> Click <a href="https://engineering.wayne.edu/computer-science">here</a> for more information about Wayne State's Computer Science Program!</p>
        </div>
      </body>
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