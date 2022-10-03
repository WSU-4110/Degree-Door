//import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Link from 'next/link'

export default function Navbar() {
  return(
    <nav className="flex justify-between h-12 items-center" bg="light" variant="light">
      <div className="navbar-brand ml-4">
        <Link href="/">Degree Door</Link>
      </div>
      <div className="navbar-links flex gap-4 mr-4">
        <a>
          <Link href="/">Home</Link>
        </a>
        <a>
          <Link href="/register">Register</Link>
        </a>
        <a>
          <Link href="/login">Login</Link>
        </a>
      </div>
    </nav>
  )
}
