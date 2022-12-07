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
        <Link href={{pathname: `/${currentDegree.link}`, query: {userID: router.query.userID}}}>
          <div className="rounded-md carousel-item active relative w-10/12 h-[19rem] bg-no-repeat bg-cover
            bg-[url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')] flex justify-center flex-col items-center cursor-pointer"
          >
            <p className="m-auto text-white text-8xl text-center">{currentDegree.name}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}