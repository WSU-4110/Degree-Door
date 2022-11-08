import Link from 'next/link'
import { useRouter } from 'next/router'
import { collection, query, getDocs, orderBy } from "firebase/firestore";

import Dropdown from '../../components/Dropdown'
import Navbar from '../../components/Navbar'
import { db } from '../../firebase' 

export default function Reviews({reviews}) {
  const router = useRouter()
  
  return (
    <div className="degree-home bg-white font-Inter relative">
      <Navbar links={[{route: "/", name: "Home"},{route: "/post", name: "Post Review"}]}>
        <Dropdown />
      </Navbar>
      <header className="header-wrapper w-full container mx-auto pt-12">
        <div className="name-description-wrapper flex flex-col items-center py-12">
          <div className="display-degree-name font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
            Reviews Page
          </div>
          <p className="text-lg text-gray-600 text-center">
            Here you can check out all of the reviews!
          </p>
        </div>
      </header>
      <nav className="degree-page-nav w-full py-4 border-t border-b bg-gray-100">
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
      <div className="reviews-container flex flex-col mt-4 justify-center items-center">
        {/* Map over every review document and create a review component to display on the review page */}
        {reviews.map((review) => (
          <div key={review.id} className="review-component bg-[#67A25B] w-5/6 flex flex-col justify-start p-6 m-8 border-slate-400 rounded">
            <p className="course-name text-white font-bold uppercase pb-4">{review.course}</p>
            <div className="pros-wrapper bg-white flex flex-col p-4 mb-12 border-2 rounded-lg">
              <p className="text-3xl font-bold hover:text-gray-700 pb-4">Pros</p>
              <p className="text-xl">{review.pros}</p>
            </div>
            <div className="cons-wrapper bg-white flex flex-col p-4 mb-12 border-2 rounded-lg">
              <p className="text-3xl font-bold hover:text-gray-700 pb-4">Cons</p>
              <p className="text-xl">{review.cons}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">Hello, this is an overview of what the Review page should look like.</div>
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

