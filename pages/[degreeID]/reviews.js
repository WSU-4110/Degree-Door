import Link from 'next/link'
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { collection, query, getDocs, getDoc, orderBy, deleteDoc, doc } from "firebase/firestore";

import Dropdown from '../../components/Dropdown'
import FavoritesDialog from '../../components/FavoritesDialog'
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
    {/* begin nav bar for degree name */}
    <nav className="bg-[#292c2c] px-2 sm:px-4 py-30 pt-0.5 pb-0.5 m-auto items-center">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <ul className="m-auto md:text-sm md:bg-[#292c2c]">
          <li>
            <p className="text-white md:p-0 uppercase">
              <b>{router.query.degreeName}</b>
            </p>
          </li>
        </ul>
      </div>
    </nav>
    {/* end nav bar for degree name */}

    {/* begin nav bar */}
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href={{pathname: "/", query: {userID: router.query.userID}}}>
          <div className="navbar-brand cursor-pointer flex">
            <img className="w-6 h-6 ml-2" src="https://i.imgur.com/jooFjXL.png"></img><b>egreeDoor</b>
          </div>
        </Link>
        <div className="flex md:order-2">
          <Dropdown color="#292c2c"/>
        </div>
        <div className="md:flex md:w-auto">
          <ul className="flex flex-col p-2 mt-4 items-center bg-gray-50 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0 md:bg-white">
            <li>
              <Link href={{pathname: `/${router.query.degreeID}/`, query: {userID: `${router.query.userID}`}}}>
                <p className="cursor-pointer block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400">
                  <b>OVERVIEW</b>
                </p>
              </Link>
            </li>
            <li>
              <p className="block py-2 pr-4 pl-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white" aria-current="page">
                <b>REVIEWS</b>
              </p>
            </li>
            <li>
            <Link href={{pathname: `/${router.query.degreeID}/post`, query: {userID: `${router.query.userID}`, degreeName: `${router.query.degreeName}`}}}>
              <p className="cursor-pointer block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400">
                <b>POST A REVIEW</b>
              </p>
            </Link>
            </li>
            <li>
              <FavoritesDialog degree={router.query.degreeID} initFavState={initFavState}/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* end nav bar */}

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
        <div key={index} className="review-component w-2/3 p-5 mb-4 bg-[#f9f9f9] rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between pb-4">
            <p className="course-name text-gray-700 font-bold uppercase">{review.course}</p>
            {/* begin button to delete reviews */}
            {router.query.userID === review.userID && 
              <div
                onClick={() => confirmDelete(review.id)}
                className="cursor-pointer"
              >
                <svg onClick={() => confirmDelete(review.id)} className="fill-current text-gray-700 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path onClick={() => confirmDelete(review.id)} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"></path>
                </svg>
              </div>}
            {/* end delete button */}
          </div>

          {/* starting pros block */}
          <div>
            <div className="flex">
              <div className="bg-white border-[2.5px] border-green-700 w-16 text-center p-2">
                <div className="flex justify-center fill-current text-green-700 h-full items-center">
                  {/* Thumbs up icon */}
                  <IoMdThumbsUp className='text-lg'/>
                </div>
              </div>
              <div className="bg-white border-r-4 border-green-700 w-full p-4">
                <div>
                  <p className="text-green-700 font-bold">PROS</p>
                  <p className="text-gray-600 text-sm">{review.pros}</p>
                </div>
              </div>
            </div>
          </div>
          {/* ending pros block */}  

          {/* starting cons block */}
          <div>
            <div className="flex">
              <div className="bg-white border-[2.5px] border-[#de9b61] w-16 text-center p-2 mt-3">
                <div className="flex justify-center fill-current text-[#de9b61] h-full items-center">
                  <IoMdThumbsDown className="text-lg"/>
                </div>
              </div>
              <div className="bg-white border-r-4 border-[#de9b61] w-full p-4 mt-3">
                <div>
                  <p className="text-[#de9b61] font-bold">CONS</p>
                  <p className="text-gray-600 text-sm">{review.cons}</p>
                </div>
              </div>
            </div>
          </div>
          {/* ending cons block */}
        </div>
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