import Link from 'next/link'
import { auth } from '../firebase'
export default function Dropdown() {
  async function handleClick() {
    await auth.signOut()
    router.push("/login")
  }

  return (
    <div>
      <button className="peer px-5 py-2 bg-green-600 hover:bg-green-700 text-white">Dropdown</button>
      <div className="hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
        <Link>
          <a className="px-5 py-3 hover:bg-gray-200">About Us</a>
        </Link>
        <Link>
        <a class="px-5 py-3 hover:bg-gray-200">Contact Us</a>
        </Link>
        <Link>
          <a class="px-5 py-3 hover:bg-gray-200">Privacy Policy</a>
        </Link>
      </div>
    </div>
  )
}