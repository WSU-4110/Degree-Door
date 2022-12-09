import { useRouter } from "next/router"
import Footer from "../components/Footer"
import NewNavbar from "../components/NewNavbar"

export default function About(){
  const router = useRouter()
  const { userID } = router.query
  return (
    <div className="min-h-screen">
      {/* begin nav bar */}
      <NewNavbar pageTitle="ABOUT US" userID={userID} />
      {/* end nav bar */}
      <div className="w-2/3 h-[600px] mt-[70px] mb-8 m-auto border-[0.5px] bg-[#f9f9f9] rounded shadow-sm py-8 flex justify-between">
        <div>
          <h1 className="absolute text-4xl ml-[180px] mt-[20px] transform text-transparent font-bold bg-clip-text bg-gradient-to-r from-green-700 to-green-900">
            DegreeDoor
          </h1>
          <h1 className="absolute right-2/4 text-md justify-left ml-[315px] mt-[90px] font-light text-justify text-gray-500">
            We are a group of college students looking to innovate the way information flows about universities and the degree pathways they offer. We have developed this website in order to help future students discover the pathway they want to embark on in their university journey. By incorporating a fullstack mentality were able to develop this web application that functions in a forum like setting. These forums will provide basic information on the subject, as well as reviews and answered questions by current students.. Users will be able to register an account to access the main functionalities of the website. From there they are able to access everything DegreeDoor has to offer! We thank you for using our product and hope you find it as useful as we intended it to be! Sincerely - DegreeDoor Team
          </h1>
          <h1 className="absolute mt-[460px] ml-[250px]">
            <img src="https://i.imgur.com/FVOB96X.png" className="w-[50px] h-[50px]" />
          </h1>
        </div>
        <div className="mr-8">
          <img src="https://i.imgur.com/6MeOx1A.jpg" className="w-[400px] h-[530px]" />
        </div>
      </div>
      <Footer userID={userID}/>
    </div>
  )
}