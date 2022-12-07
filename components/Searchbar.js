import Link from 'next/link';
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
export default function Searchbar({degrees, user}) {
  const [filteredData, setFilteredData] = useState([])
  const [inputData, setInputData] = useState("")

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setInputData(searchWord)
    const newFilter = degrees.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    })

    if (searchWord === "") {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  };
  
  return (
    <div className="searchbar-wrapper flex flex-col min-w-full">
      <div className="search-inputs flex items-center justify-center z-[2] text-gray-600">
        <input 
          type="search" 
          name="search" 
          placeholder="Search" 
          value={inputData}
          className="bg-white w-[20rem]
          h-8 px-5 pr-10 rounded-full text-sm focus:outline-none font-Inter" 
          onChange={handleFilter}
        />
        <BsSearch className="text-black relative left-[-2rem]"/>
      </div>
      {filteredData.length != 0 && (
        <div className="degree-result flex flex-col items-center mt-9 h-2/5 overflow-x-hidden overflow-y-auto
          left-0 right-0 &::-webkit-scrollbar absolute ml-8"
        >
          {filteredData.slice(0,10).map((degree, index) => {
            return (
              <Link href={{pathname: `/${degree.link}`, query: {userID: user}}} key={index}>
                <a className="degree-item bg-white z-50 w-[20rem] h-[30px] flex items-center p-4 text-black border-b-2
                border-gray-600">
                  <p>{degree.name}</p>
                </a>
              </Link>
            )
          })
          }
        </div>
      )}
    </div>
  )
}