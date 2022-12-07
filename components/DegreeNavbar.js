import FavoritesDialog from "./Dialogs/FavoritesDialog"
import Dropdown from "./Dropdown"
import Link from "next/link"

export default function DegreeNavbar({ degreeName, degreeID, userID, initFavState, active }) {
  console.log(active)
  const defaultStyle = "cursor-pointer block py-2 pr-4 pl-3 text-[#292c2c] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400"
  const activeStyle = "cursor-pointer block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white"
  return (
    <>
      {/* begin nav bar for degree name */}
      <nav className="bg-[#292c2c] px-2 sm:px-4 py-30 pt-0.5 pb-0.5 m-auto items-center">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <ul className="m-auto md:text-sm md:bg-[#292c2c]">
          <li>
            <p className="text-white md:p-0 uppercase">
            <b>{degreeName}</b>
            </p>
          </li>
        </ul>
      </div>
      </nav>
      {/* end nav bar for degree name */}

      {/* begin nav bar */}
      <nav className="bg-white border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 dark:bg-[#292c2c]">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href={{pathname: "/", query: {userID: userID}}}>
          <div className="navbar-brand cursor-pointer flex">
            <img className="w-6 h-6 ml-2" src="https://i.imgur.com/jooFjXL.png"></img><b>egreeDoor</b>
          </div>
        </Link>
        <div className="flex md:order-2">
          <Dropdown color="#292c2c"/>
        </div>
        <div className="md:flex md:w-auto">
          <ul className="flex flex-col p-2 mt-4 items-center bg-gray-50 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0 md:bg-white">
            <li>
              <Link href={{pathname: `/${degreeID}`, query: {userID: `${userID}`, degreeName: `${degreeName}`}}}>
                <p className={active === "overview" ? `${activeStyle}` : `${defaultStyle}`} aria-current="page">
                  <b>OVERVIEW</b>
                </p>
              </Link>
            </li>
            <li>
              <Link href={{pathname: `/${degreeID}/reviews`, query: {userID: `${userID}`, degreeName: `${degreeName}`}}}>
                <p className={active === "reviews" ? `${activeStyle}` : `${defaultStyle}`}>
                  <b>REVIEWS</b>
                </p>
              </Link>
            </li>
            <li>
            <Link href={{pathname: `/${degreeID}/post`, query: {userID: `${userID}`, degreeName: `${degreeName}`}}}>
              <p className={active === "post" ? `${activeStyle}` : `${defaultStyle}`}>
                <b>POST A REVIEW</b>
              </p>
            </Link>
            </li>
            <li>
              <FavoritesDialog degree={degreeID} initFavState={initFavState}/>
            </li>
          </ul>
        </div>
      </div>
      </nav>
      {/* end nav bar */}
    </>
  )
}