import Link from 'next/link'
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { collection, query, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";

import Dropdown from '../../components/Dropdown'
import Navbar from '../../components/Navbar'
import { db } from '../../firebase' 

export default function Reviews({reviews}) {
  const router = useRouter()
  const [reviewData, setReviewData] = useState(reviews)

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `Degrees/${router.query.degreeID}/Reviews`, id))
    setReviewData((oldReviews) => oldReviews.filter((review) => review.id !== id))
  }
  
  return (
    <div className="degree-home bg-white font-Inter relative">
      <Navbar user={router.query.userID}>
        <Dropdown />
      </Navbar>
      <header className="header-wrapper w-full container mx-auto pt-12">
        <div className="name-description-wrapper flex flex-col items-center py-12">
          <div className="display-degree-name font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
            {router.query.degreeName} Reviews
          </div>
          <p className="text-lg text-gray-600 text-center">
            Here you can check out all of the reviews for {router.query.degreeName}!
          </p>
        </div>
      </header>
      <nav className="degree-page-nav w-full py-4 border-t border-b bg-gray-100">
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <Link href={{pathname: `/${router.query.degreeID}/`, query: {userID: `${router.query.userID}`}}}>
              <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Overview</a>  
            </Link>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Links</a>
            <Link href={{pathname: `/${router.query.degreeID}/reviews`, query: {userID: `${router.query.userID}`, degreeName: `${router.query.degreeName}`}}}>
              <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Reviews</a>
            </Link>
            <Link href={{pathname: `/${router.query.degreeID}/post`, query: {userID: `${router.query.userID}`}}}>
              <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Post a Review</a>
            </Link>
          </div>
        </div>
      </nav>
      <div className="reviews-container flex flex-col mt-4 justify-center items-center">
        {/* Map over every review document and create a review component to display on the review page */}
        {reviewData.map((review) => (
          <div className="review-component w-2/3 p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between pb-4">
              <p className="course-name text-gray-700 font-bold uppercase">{review.course}</p>
              {router.query.userID === review.userID && 
                <div
                  onClick={() => handleDelete(review.id)}
                  className="cursor-pointer"
                >
                  <svg onClick={() => handleDelete(review.id)} className="fill-current text-gray-700 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path onClick={() => handleDelete(review.id)} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"></path>
                  </svg>
                </div>}
            </div>
            {/* starting pros block */}
            <div>
              <div className="flex">
                <div className="bg-[#3d4e57] w-16 text-center p-2">
                  <div className="flex justify-center fill-current text-white h-full items-center">
                    {/* Thumbs up icon */}
                    <IoMdThumbsUp className='text-lg'/>
                  </div>
                </div>
                <div className="bg-white border-r-4 border-[#3d4e57] w-full p-4">
                  <div>
                    <p className="text-gray-600 font-bold">PROS</p>
                    <p className="text-gray-600 text-sm"><p>{review.pros}</p></p>
                  </div>
                </div>
              </div>
            </div>
            {/* ending pros block */}  

            {/* starting cons block */}
            <div>
              <div className="flex">
                <div className="bg-[#94a9b4] w-16 text-center p-2 mt-3">
                  <div className="flex justify-center fill-current text-white h-full items-center">
                    <IoMdThumbsDown className="text-lg"/>
                  </div>
                </div>
                <div className="bg-white border-r-4 border-[#94a9b4] w-full p-4 mt-3">
                  <div>
                    <p className="text-gray-600 font-bold">CONS</p>
                    <p className="text-gray-600 text-sm"><p>{review.cons}</p></p>
                  </div>
                </div>
              </div>
            </div>
            {/* ending cons block */}
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Get a query on the sub collection for degree page reviews, sorting each review by timestamp
  const reviewsQuery = query(collection(db, `Degrees/${context.params.degreeID}/Reviews`), orderBy("timeStamp", "desc"));
  const reviewsSnapshot = await getDocs(reviewsQuery);

  // Make an array of each review object and its data
  const reviewData = reviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timeStamp: doc.data().timeStamp.toDate().getTime()
  }))
  return {
    props: {
      reviews: reviewData
    }
  }
}