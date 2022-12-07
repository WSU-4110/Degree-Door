import Link from "next/link"
export default function FavoriteDegree({ degree, user }) {
  return (
    <div className="mt-4 w-1/3 flex flex-col gap-4 items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>
      <div className="w-full h-full">
        <p className="text-align: right-5 text-center">{degree.name}</p>
        Info: 
        <p className="mt-2 text-sm text-gray-500">{degree.description}</p>
      </div>
      <Link href={{pathname: `/${degree.link}`, query: {userID: user}}}>
        <button type="button" className="inline-grid px-6 py-2.5 bg-lime-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Visit</button>
      </Link>
    </div>
  )
}