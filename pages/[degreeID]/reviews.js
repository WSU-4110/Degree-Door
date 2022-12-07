import { useRouter } from 'next/router'
import { useState } from 'react'
import { collection, query, getDocs, getDoc, orderBy, deleteDoc, doc } from "firebase/firestore"

import DegreeNavbar from '../../components/DegreeNavBar'
import ReviewComponent from '../../components/ReviewComponent'
import { db } from '../../firebase' 

export default function Reviews({reviews, initFavState}) {
  const router = useRouter()
  const [reviewData, setReviewData] = useState(reviews)
  const [toBeDeleted, setToBeDeleted] = useState("")
  const [openDeletion, setOpenDeletion] = useState(false)

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `Degrees/${router.query.degreeID}/Reviews`, id))
    setReviewData((oldReviews) => oldReviews.filter((review) => review.id !== id))
    setOpenDeletion(false)
  }
  
  const confirmDelete = (id) => {
    setToBeDeleted(id)
    setOpenDeletion(true)
  }

  return (
    <div className="degree-home bg-white font-Inter relative">
      <DegreeNavbar degreeName={router.query.degreeName} degreeID={router.query.degreeID} userID={router.query.userID} initFavState={initFavState} active="reviews" />

    {/* begin delete button dialog box */}
    {openDeletion && 
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 items-center m-auto">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl w-full max-w-sm">
              <div className="bg-gray-50 p-4 pb-4 flex">
                <div className="m-auto text-center">
                  <svg aria-hidden="true" className="mx-auto mb-2 w-8 h-8 text-[#de9b61]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 className="mt-2 font-semibold text-gray-800">WARNING</h3>
                  <div>
                    <p className="mt-2 text-sm text-gray-500">Do you want to delete this review?</p>
                  </div>
                </div>
              </div>
            <div className="bg-white py-3 flex flex-row-reverse px-6">
              <button 
                type="button" 
                className="flex-1 px-4 py-2 ml-2 bg-[#de9b61] hover:bg-[#e6a771] text-white text-sm font-medium rounded-md"
                onClick={() => handleDelete(toBeDeleted)}
              >
                YES
              </button>
              <button 
                type="button" 
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                onClick={() => setOpenDeletion(false)}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>}
    {/* end delete button dialog box */}
      
    <div className="reviews-container flex flex-col mt-4 justify-center items-center">
      {/* Map over every review document and create a review component to display on the review page */}
      {reviewData.map((review, index) => (
        <ReviewComponent key={index} review={review} currentUserID={router.query.userID} handleClick={confirmDelete} />
      ))}
    </div>
  </div>
)}

export async function getServerSideProps(context) {

  // Check if the user is following the degree
  const favRef = doc(db,`Users/${context.query.userID}/Favorites`,`${context.params.degreeID}`)
  const favSnap = await getDoc(favRef)

  // Get a query on the sub collection for degree page reviews, sorting each review by timestamp
  const reviewsQuery = query(collection(db, `Degrees/${context.params.degreeID}/Reviews`), orderBy("timeStamp", "desc"));
  const reviewsSnapshot = await getDocs(reviewsQuery);

  // Make an array of each review object and its data
  const reviewData = reviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timeStamp: doc.data().timeStamp.toDate().getTime()
  }))

  // True if user has the degree favorited
  const initFavState = favSnap.exists()

  return {
    props: {
      initFavState: initFavState,
      reviews: reviewData
    }
  }
}