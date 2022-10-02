import bg from '../public/oldMain.jpg'
export default function Login() {
  return (
    <div className="min-w-screen min-h-screen bg-no-repeat bg-cover bg-center relative" style={{backgroundImage: `url(${bg.src})`}}>
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0">
      </div>
    </div>
  )
}