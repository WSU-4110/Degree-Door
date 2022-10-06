import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Home() {
  return(
    <ProtectedRoute>
      <Navbar links={[{route: "/post", name: "Post Review"}, {route:"/signOut", name: "Sign Out"}]}/>
      <div className="relative">
        <img src='homepage2.png' alt='waynestate-banner'/>
        <h1 className="absolute text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold">Degree Door</h1>
      </div>
      <div className="relative">
        <img src='homepage2.png' alt='waynestate-banner'/>
        <h1 className="absolute text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold">Degree Door</h1>
      </div>
      <div>
        <input className='mx-96 w-1/2 border-2 p-4 text-center' type='text' placeholder='Search...'></input>
        <button className='mx-96 w-1/2 border-2 p-4 text-center'>Search</button>
      </div>
      <div className='font-mono mt-80 ml-10'>
        <h1>Degrees</h1>
      </div>
      <div className='after:: content-none clear-both table mx-auto w-full h-full'>
        <div className='float-left w-1/5 h-20 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
        <div className='float-left w-1/5 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
        <div className='float-left w-1/5 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
        <div className='float-left w-1/5 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
        <div className='float-left w-1/5 p-5px'>
        <img src='https://thumbs.dreamstime.com/b/computer-science-isolated-shiny-blue-square-button-computer-science-shiny-blue-square-button-143199787.jpg' placeholder='computer-science-placeholder-img'></img>
        </div>
      </div>
    </ProtectedRoute>
  )
}