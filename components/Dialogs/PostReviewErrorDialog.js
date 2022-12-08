export default function PostReviewErrorDialog({ setOpenError }) {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 items-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl w-full max-w-sm">
              <div className="bg-gray-50 p-4 pb-4 flex">
                <div className="mt-0 ml-10 text-center">
                  <svg aria-hidden="true" class="mx-auto mb-2 w-8 h-8 text-[#de9b61]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 className="mt-2 font-semibold text-gray-800">WARNING</h3>
                  <div>
                      <p className="mt-2 text-sm text-gray-500">Please fill out all fields before submitting!</p>
                    </div>
                  </div>
                </div>
              <div className="bg-white py-3 flex flex-row-reverse px-6">
                <button 
                  type="button"
                  className="flex-1 px-4 py-2 bg-[#de9b61] hover:bg-[#e6a771] text-white text-sm font-medium rounded-md"
                  onClick={() => setOpenError(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}