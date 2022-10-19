import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../firebase'

export default function Navbar({ links }) {
  const buttonStyle = "bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded "
  + "hover:scale-90 ease-in-out duration-300 cursor:pointer"

  const router = useRouter()

  async function handleClick() {
    await auth.signOut()
    router.push("/login")
  }

  return(
    <nav className="fixed z-50 w-full top-0 flex justify-between h-16 items-center bg-[#67A25B] text-white shadow" bg="light" variant="light">
      <div className="navbar-brand flex ml-4">
        <Link href="/">Degree Door</Link>
        <img src="https://i.imgur.com/wvQkgzH.png"></img>
      </div>
      <div className="navbar-links flex gap-4 mr-4">
        {/* We will map each link in the links array and map a
          different link to the Link component's href attribute */}
        {links.map((link, index) => (link.route === "/signOut" ?
          <button 
            key={index} 
            className={buttonStyle}
            onClick={handleClick}
          >
            {link.name}
          </button>
          :
          <button 
            key={index} 
            className={buttonStyle}
          >
            <Link href={link.route}>{link.name}</Link>
          </button>
        ))}
      </div>
    </nav>
  )
}
