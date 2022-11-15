import Navbar from "../Navbar"
import Dropdown from "../Dropdown"

// The Navbar HOC will take 3 arguments:
// 1. Routes will be an array of objects that contain a route name and a link to the route
// 2. Authenticated will be a boolean value that indicates whether the user is 
// in a page that is protected through authentication.
// 3. The children prop is a special property of React that indicates
// any component that is wrapped by the HOC.
export default function NavbarHOC({routes, authenticated, children}) {
  return (
    <div>
      <Navbar links={routes}>
        {authenticated && <Dropdown />}
      </Navbar>
      {children}
    </div>
  )
}