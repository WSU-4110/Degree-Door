import Link from "next/link"
import { AiFillStar } from "react-icons/ai"

export default function FavoriteDegree({ degree, user }) {
  return (

    <Link href={{pathname: `/${degree.link}`, query: {userID: user}}}>
      <div className="cursor-pointer mt-4 w-[300px] flex flex-col gap-4 items-start rounded-xl p-4 shadow-sm border bg-[#f9f9f9] transition hover:scale-90 duration-200 ease-in-out">
        <div className="w-full h-full">
          <AiFillStar className="text-2xl" color="#de9b61"/>
          <p className="text-align: right-5 text-center">{degree.name}</p>
        </div>
      </div>
    </Link>
  )
}