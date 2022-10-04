//import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Link from 'next/link'

export default function Navbar() {
  return(
    <nav className="flex justify-between h-16 items-center bg-[#67A25B] text-white" bg="light" variant="light">
      <div className="navbar-brand flex ml-4">
        <Link href="/">Degree Door </Link>
        <img src="https://i.imgur.com/wvQkgzH.png"></img>
      </div>
      <div className="navbar-links flex gap-4 mr-4">
      <button className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
        <a>
          <Link href="/home">Home</Link>
        </a>
      </button>
      <button className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
        <a>
          <Link href="/register">Register</Link>
        </a>
      </button>
      <button className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
        <a>
          <Link href="/login">Login</Link>
        </a>
      </button>
      </div>
    </nav>
  )
}
