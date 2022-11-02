import { collection, query, where, getDocs } from "firebase/firestore";

import Dropdown from '../components/Dropdown'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import ProtectedRoute from '../components/HOC/ProtectedRoute'
import { db } from '../firebase'

export default function Home({degreeDocs}) {

  return(
    <ProtectedRoute>
      <Navbar links={[{route: "/cs", name: "Computer Science"}, {route: "/post", name: "Post Review"}]}>
        <Dropdown />
      </Navbar>
      <div className="relative">
        <img src='homepage2.png' alt='waynestate-banner'/>
        <h1 className="absolute text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold">Degree Door</h1>
      </div>
      <Searchbar degrees={degreeDocs}/>
      <div className='font-mono mt-80 ml-10'>
        <h1>Degrees</h1>
      </div>
      <div className='after:: content-none clear-both table mx-auto w-full h-full'>
        <div className='float-left w-1/5 h-20 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
        <div className='float-left w-1/5 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
        <div className='float-left w-1/5 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
        <div className='float-left w-1/5 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
        <div className='float-left w-1/5 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export async function getServerSideProps() {
  const collectionRef = query(collection(db, "Degrees")); // Create collection reference
  const degreesSnapshot = await getDocs(collectionRef); // Get document snapshots from firestore

  // Get both degree name and description from the document.
  const degreesData = degreesSnapshot.docs.map((doc) => ({
    link: doc.id,
    name: doc.data().degreeName
  }))
  // Return server side props
  return {
    props: { 
      degreeDocs: degreesData,
    }
  };
}