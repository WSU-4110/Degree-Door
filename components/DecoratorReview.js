export default function DecoratorReview({data}) {
  return (
    <div  
      className="review-component bg-[#67A25B] w-4/6 flex flex-col justify-start p-8 m-8
      border-slate-400 rounded shadow-lg">
      <p className="course-name text-white font-bold uppercase text-2xl pb-4">{data.course}</p>
      <div className="pros-wrapper bg-white flex flex-col p-4 mb-12 border-2 rounded-lg">
        <p className="text-3xl font-bold hover:text-gray-700 pb-4">Pros</p>
        <p className="text-xl">{data.pros}</p>
      </div>
      <div className="cons-wrapper bg-white flex flex-col p-4 mb-12 border-2 rounded-lg">
        <p className="text-3xl font-bold hover:text-gray-700 pb-4">Cons</p>
        <p className="text-xl">{data.cons}</p>
      </div>
    </div>
  )
}