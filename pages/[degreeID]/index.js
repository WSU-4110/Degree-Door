import Link from 'next/link'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'

import Dropdown from '../../components/Dropdown'
import Navbar from '../../components/Navbar'
import { db } from '../../firebase'

import DecoratorDegreeTab from '../../components/DecoratorDegreeTab'

export default function DegreeHome({name, description}) {
  const router = useRouter()

  return (
    <div className="degree-home bg-white font-Inter relative">
      <Navbar links={[{route: "/", name: "Home"},{route: "/post", name: "Post Review"}]}>
        <Dropdown />
      </Navbar>
      <header>
        <img className='w-full h-[400px]' src="https://cdn.nbyula.com/public/community/6274d27f54121f0014506fe7/bannerImage/1651823982672-6274d27f54121f0014506fe7.jpeg" alt="Computer Science Banner"></img>
        <div className="name-description-wrapper flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="display-degree-name font-bold text-black uppercase hover:text-gray-700 text-5xl -translate-y-24">
          {name}
        </div>
        <p className="text-xl font-bold text-black text-center -translate-y-20">
          {description}
        </p>
        </div>
      </header>
      <DecoratorDegreeTab degree={router.query.degreeID}/>
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