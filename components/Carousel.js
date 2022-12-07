import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Carousel({degrees}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = (index) => {
    setCurrentIndex(index);
  }

  const router = useRouter()
  const currentDegree = degrees[currentIndex]
  return (
    <div className="carousel slide relative">
      <div className="carousel-inner m-auto relative w-4/5 rounded-md overflow-hidden flex justify-center items-center">
        <div className="cursor-pointer hover:opacity-70" onClick={() => handleClick(currentIndex === 0 ? degrees.length - 1 : currentIndex-1)}>
          <HiChevronLeft className="h-12 w-auto"/>
        </div>
        <Link href={{pathname: `/${currentDegree.link}`, query: {userID: router.query.userID}}}>
          <div className="rounded-md carousel-item active relative w-10/12 h-[19rem] bg-no-repeat bg-cover
            bg-[url('https://www.csustan.edu/sites/default/files/styles/media_1440x352/public/2022-08/cs_grant.png?itok=ufO-IZWB')] flex justify-center flex-col items-center cursor-pointer"
          >
            <p className="m-auto text-white font-bold uppercase text-5xl text-center">{currentDegree.name}</p>
          </div>
        </Link>
        <div className="cursor-pointer hover:opacity-70" onClick={() => handleClick(currentIndex === degrees.length - 1 ? 0 : currentIndex+1)}>
          <HiChevronRight className="h-12 w-auto" />
        </div>
      </div>
    </div>
  )
}