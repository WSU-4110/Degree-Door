import { jsonEval } from "@firebase/util";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

import Navbar from '../../components/Navbar'
import { db } from '../../firebase' 
export default function Reviews({reviews}) {
  return (
    <div className="degree-home bg-white font-Karla relative">
      <Navbar links={[{route: "/", name: "Home"},{route: "/post", name: "Post Review"}, {route:"/signOut", name: "Sign Out"}]}/>
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
            <a href="/cs" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Overview</a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Links</a>
            <a href="/cs/reviews" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Reviews</a>
          </div>
        </div>
      </nav>
      <div className="reviews-container flex flex-col mt-4 justify-center items-center">
        {/* Map over every review document and create a review component to display on the review page */}
        {reviews.map((review) => (
           <div key={review.id} className="review-component bg-white flex flex-col justify-start p-6 border-2 border-slate-400 w-5/6 rounded">
            <p className="text-blue-700 font-bold uppercase pb-4">{review.course}</p>
            <div className="flex flex-col p-4 mb-12 border-2 rounded-lg">
              <p className="text-3xl font-bold hover:text-gray-700 pb-4">Pros</p>
              <p className="text-xl">{review.pros}</p>
            </div>
            <div className="flex flex-col p-4 mb-12 border-2 rounded-lg">
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
  const reviewsQuery = query(collection(db, `Degrees/${context.params.degreeID}/Reviews`), orderBy("timeStamp"));
  const reviewsSnapshot = await getDocs(reviewsQuery);

  // Make an array of each review object and its data
  const reviewData = reviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .map((review) => ({
    ...review,
    timeStamp: review.timeStamp.toDate().getTime()
  }))
  return {
    props: {
      reviews: reviewData
    }
  }
}

