import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../firebase'

export default function Navbar({ links, children }) {

  const router = useRouter()

  async function handleClick() {
    await auth.signOut()
    router.push("/login")
  }

  return(
    <nav className="fixed z-50 w-full top-0 flex justify-between h-16 items-center bg-[#242526] text-white shadow font-Inter" bg="light" variant="light">
      <div className="navbar-brand flex ml-4">
        <Link href="/">Degree Door</Link>
        <img src="https://i.imgur.com/wvQkgzH.png"></img>
      </div>
      <div className="navbar-links flex gap-4 mr-4">
        {/* We will map each link in the links array and map a
          different link to the Link component's href attribute */}
        {links.map((link, index) => (
          <button 
            key={index} 
            className="justify-center rounded-md bg-slate-300 bg-opacity-20 px-4 py-2 text-sm font-medium 
            text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white 
            focus-visible:ring-opacity-75 hover:scale-90 ease-in-out duration-300"
          >
            <Link href={link.route}>{link.name}</Link>
          </button>
        ))}
        {/*We render the dropdown component here*/}
        {children}
      </div>
    </nav>
  )
}
