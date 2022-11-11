export default function DecoratorDegreeTab({degree}){
  return (
    <nav className="degree-page-nav w-full py-2 border-t border-b bg-gray-100">
      <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
          <Link href={`/${degree}/`}>
            <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Overview</a>  
          </Link>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Links</a>
          <Link href={`/${degree}/reviews`}>
            <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Reviews</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
