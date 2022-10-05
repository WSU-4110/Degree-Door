import Link from 'next/link'

export default function Navbar({ links }) {
  return(
    <nav className="flex justify-between h-16 items-center bg-[#67A25B] text-white" bg="light" variant="light">
      <div className="navbar-brand flex ml-4">
        <Link href="/">Degree Door</Link>
        <img src="https://i.imgur.com/wvQkgzH.png"></img>
      </div>
      <div className="navbar-links flex gap-4 mr-4">
        {/* We will map each link in the links array and map a
          different link to the Link component's href attribute */}
        {links.map((link, index) => (
          <button key={index} className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            <Link href={link.route}>{link.name}</Link>
          </button>
        ))}
      </div>
    </nav>
  )
}
