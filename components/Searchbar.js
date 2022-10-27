import { BsSearch } from 'react-icons/bs'
export default function Searchbar() {
  return (
    <form className="flex items-center justify-center relative z-[2] text-gray-600 mt-[-1.5rem]">
      <input 
        type="search" 
        name="search" 
        placeholder="Search" 
        className="bg-white border-2 border-neutral-600 w-6/12
        max-w-xl h-12 px-5 pr-10 rounded-full text-sm focus:outline-none" 
      />
      <BsSearch className="text-black relative left-[-2.5rem]"/>
    </form>
  )
}