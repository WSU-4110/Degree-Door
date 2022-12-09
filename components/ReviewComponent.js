import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io'

export default function ReviewComponent({review, currentUserID, handleClick}) {
  return (
    <div className="review-component w-2/3 p-5 mb-4 bg-[#f9f9f9] rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between pb-4">
        <p className="course-name text-gray-700 font-bold uppercase">{review.course}</p>
        {/* begin button to delete reviews */}
        {currentUserID === review.userID && 
          <div
            onClick={() => handleClick(review.id)}
            className="cursor-pointer"
          >
            <svg onClick={() => handleClick(review.id)} className="fill-current text-gray-700 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path onClick={() => handleClick(review.id)} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"></path>
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
  )  
}