import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Home() {
  return(
    <ProtectedRoute>
      <Navbar links={[{route: "/post", name: "Post Review"}, {route:"/signOut", name: "Sign Out"}]}/>
      <div>
        <img src='homepage2.png'/>
      </div>
    </ProtectedRoute>
  )
}