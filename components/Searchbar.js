export default function Searchbar() {
  return (
    <form className="flex items-center justify-center relative z-[2] text-gray-600 mt-[-20px]">
      <input 
        type="search" 
        name="search" 
        placeholder="Search" 
        className="bg-white border-2 border-neutral-600 w-6/12
        max-w-xl h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" 
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4"></button>
    </form>
  )
}