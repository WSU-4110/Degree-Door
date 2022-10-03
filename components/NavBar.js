//import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";

import Link from "next/link"

// import "./stylesheets/NavBar.css";

export default function NavBar() {
  return(
    <Navbar className="flex justify-between h-12 items-center" bg="light" variant="light">
      <Navbar.Brand>
        <Link href="/">Degree Door</Link>
      </Navbar.Brand>
      <Nav>
        <Nav.Link>
          <Link href="/">Home</Link>
        </Nav.Link>
        <Nav.Link>
          <Link href="/register">Register</Link>
        </Nav.Link>
        <Nav.Link>
          <Link href="/login">Login</Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}