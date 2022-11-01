import Link from 'next/link';
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
export default function Searchbar({degrees}) {
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
      <div className="search-inputs flex items-center justify-center z-[2] text-gray-600 mt-[-1.5rem]">
        <input 
          type="search" 
          name="search" 
          placeholder="Search" 
          value={inputData}
          className="bg-white border-2 border-neutral-600 w-[36rem]
          h-12 px-5 pr-10 rounded-full text-sm focus:outline-none font-Inter" 
          onChange={handleFilter}
        />
        <BsSearch className="text-black relative left-[-2.5rem]"/>
      </div>
      {filteredData.length != 0 && (
        <div className="degree-result w-full flex flex-col items-center mt-8 h-2/5
        bg-white overflow-x-hidden overflow-y-auto &::-webkit-scrollbar
        absolute">
          {filteredData.slice(0,10).map((degree, index) => {
            return (
              <Link href={`/${degree.link}`} key={index}>
                <a className="degree-item w-[36rem] h-[50px] flex items-center p-4 text-black border-2
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