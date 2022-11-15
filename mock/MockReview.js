import { useState } from 'react'

export default function MockReview() {
  const [reviewData, setReviewData] = useState()

  const handleDelete = async () => {return;}

  return (
    <div className="degree-home bg-white font-Inter relative">
      {/* <Navbar user={router.query.userID}>
        <Dropdown />
      </Navbar> */}
      <header className="header-wrapper w-full container mx-auto pt-12">
        <div className="name-description-wrapper flex flex-col items-center py-12">
          <div className="display-degree-name font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
            Mock Degree Reviews
          </div>
          <p className="text-lg text-gray-600 text-center">
            Here you can check out all of the reviews for Mock Degree!
          </p>
        </div>
      </header>
      <nav className="degree-page-nav w-full py-4 border-t border-b bg-gray-100">
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <a href={{pathname: `/mock/`, query: {userID: `user1234`}}}>
              <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Overview</a>  
            </a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Links</a>
            <a href={{pathname: `/mock/reviews`, query: {userID: `user1234`, degreeName: `Mock Degree`}}}>
              <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Reviews</a>
            </a>
            <a href={{pathname: `/mock/post`, query: {userID: `user1234`}}}>
              <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Post a Review</a>
            </a>
          </div>
        </div>
      </nav>
      <div className="reviews-container flex flex-col mt-4 justify-center items-center">
        {/* Map over every review document and create a review component to display on the review page */}
          <div className="review-component w-2/3 p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between pb-4">
              <p className="course-name text-gray-700 font-bold uppercase">{review.course}</p>
              {true === true && 
                <div
                  onClick={() => handleDelete()}
                  className="cursor-pointer"
                >
                  <svg onClick={() => handleDelete()} className="fill-current text-gray-700 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path onClick={() => handleDelete()} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"></path>
                  </svg>
                </div>}
            </div>
            {/* starting pros block */}
            <div>
              <div className="flex">
                <div className="bg-[#3d4e57] w-16 text-center p-2">
                  <div className="flex justify-center fill-current text-white h-full items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                  </div>
                </div>
                <div className="bg-white border-r-4 border-[#3d4e57] w-full p-4">
                  <div>
                    <p className="text-gray-600 font-bold">PROS</p>
                    <p className="text-gray-600 text-sm">Text of Pros</p>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
                  </div>
                </div>
                <div className="bg-white border-r-4 border-[#94a9b4] w-full p-4 mt-3">
                  <div>
                    <p className="text-gray-600 font-bold">CONS</p>
                    <p className="text-gray-600 text-sm">Text of Cons</p>
                  </div>
                </div>
              </div>
            </div>
            {/* ending cons block */}
          </div>
      </div>
    </div>
  )
}