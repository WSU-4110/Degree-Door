import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'

import ProtectedRoute from '../../components/HOC/ProtectedRoute'
import DegreeNavbar from '../../components/DegreeNavBar'
import { db } from '../../firebase'

export default function DegreeHome({info, initFavState}) {
  const router = useRouter()

  return (
    <ProtectedRoute>
      <div className="degree-home font-Inter">
        <DegreeNavbar degreeName={info.degreeName} degreeID={router.query.degreeID} userID={router.query.userID} initFavState={initFavState} active="overview"/>
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
            <a target="_blank" href={info.website} rel="noreferrer"> 
              <div className="cursor-pointer min-h-[20rem] flex items-center justify-center rounded-md p-4 mb-4 shadow-md border-t-4 border-[#de9b61] bg-[#f9f9f9] transition hover:scale-90 duration-200 ease-in-out">
                <div className="ml-3 text-sm font-medium text-[#292c2c]">
                  {info.summary}
                </div>
              </div>
            </a>
            <a target="_blank" href={info.website} rel="noreferrer"> 
              <div className="cursor-pointer min-h-[20rem] flex items-center justify-center rounded-md p-4 mb-4 shadow-md border-t-4 border-[#de9b61] bg-[#f9f9f9] transition hover:scale-90 duration-200 ease-in-out">
                <div className="ml-3 text-sm font-medium text-[#292c2c]">
                  {info.summary2}
                </div>
              </div>
            </a>
            <a target="_blank" href={info.website} rel="noreferrer"> 
              <div className="cursor-pointer min-h-[20rem] flex items-center justify-center rounded-md p-4 mb-4 shadow-md border-t-4 border-[#de9b61] bg-[#f9f9f9] transition hover:scale-90 duration-200 ease-in-out">
                <div className="ml-3 text-sm font-medium text-[#292c2c]">
                  Click here for more information about Wayne State's {info.degreeName} Program!
                </div> 
              </div>
            </a>
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
      info: degreeInfo
    }
  };
}