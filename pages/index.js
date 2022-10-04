import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Home() {
  return(
    <ProtectedRoute>
      <Navbar/>
      <div>
        <img src='homepage2.png'/>
      </div>
    </ProtectedRoute>
  )
}