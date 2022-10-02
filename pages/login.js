import bg from '../public/oldMain.jpg'
export default function Login() {
  return (
    <>
      <div className="login-page-background min-w-screen min-h-screen bg-no-repeat bg-cover bg-center relative" style={{backgroundImage: `url(${bg.src})`}}>
        <div className="login-page-wrapper flex flex-row justify-center">
          <div className="login-page-welcome flex flex-col self-center p-10 z-10">
            <div class="self-start lg:flex flex-col  text-white">
              <h1 class="mb-3 font-bold text-5xl">Welcome to Degree Door</h1>
              <p class="pr-3">Login to Degree Door and get started on looking at your degree!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-page-gradient absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
    </>
    
  )
}