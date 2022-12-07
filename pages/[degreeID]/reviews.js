import { useRouter } from 'next/router'
import { useState } from 'react'
import { collection, query, getDocs, getDoc, orderBy, deleteDoc, doc } from "firebase/firestore"

import DegreeNavbar from '../../components/DegreeNavbar'
import ReviewComponent from '../../components/ReviewComponent'
import DeleteReviewConfirmation from '../../components/Dialogs/DeleteReviewConfirmation'
import { db } from '../../firebase' 
import ProtectedRoute from '../../components/HOC/ProtectedRoute'
import Footer from '../../components/Footer'

export default function Reviews({reviews, initFavState}) {
  const router = useRouter()
  const { degreeName, degreeID, userID } = router.query
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
    <ProtectedRoute>
      <div className="degree-home bg-white font-Inter relative">
        <DegreeNavbar degreeName={degreeName} degreeID={degreeID} userID={userID} initFavState={initFavState} active="reviews" />
        {/* begin delete button dialog box */}
        {openDeletion && <DeleteReviewConfirmation toBeDeleted={toBeDeleted} handleDelete={handleDelete} setOpenDeletion={setOpenDeletion} />}
        {/* end delete button dialog box */}
        <div className="reviews-container flex flex-col mt-4 justify-center items-center">
          {/* Map over every review document and create a review component to display on the review page */}
          {reviewData.map((review, index) => (
          <ReviewComponent key={index} review={review} currentUserID={userID} handleClick={confirmDelete} />
          ))}
        </div>
        <Footer userID={userID}/>
      </div>
    </ProtectedRoute>
  )
}

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