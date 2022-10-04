import React from 'react'

export default function Post() {
  return (
    <div className="form-wrapper min-h-screen bg-white rounded shadow-md px-6 py-8 flex items-center justify-center">
      <form className="flex flex-col w-full">
        <div className="flex flex-col">
            <label>Course Name:</label>
            <textarea
              className="overflow-auto border border-slate-400 border-solid rounded"
              placeholder="Your review"
              name="review"
            />
        </div>
            
        <div className="flex flex-col">
            <label>Pros:</label>
            <textarea
              className="overflow-auto border border-slate-400 border-solid rounded"
              placeholder="Your review"
              name="review"
            />
        </div>


        <div className="flex flex-col">
          <label>Cons:</label>
          <textarea
            className="overflow-auto border border-slate-400 border-solid rounded"
            placeholder="Your review"
            name="review"
          />
        </div>

        <button className="submit-button bg-green-900 hover:scale-90 duration-300
          text-white rounded-full h-10 w-20 mt-6 p-2 cursor-pointer justify-between items-center"
            type="submit">
            SUBMIT
        </button>
      </form>
    </div>
  )
}
