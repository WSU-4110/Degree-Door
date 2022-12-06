import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsFillGearFill } from 'react-icons/bs'

import { auth } from '../firebase'
import Link from 'next/link'
// const MyLink = forwardRef((props, ref) => {
//   let { href, children, ...rest } = props
//   return (
//     <Link href={href}>
//       <a ref={ref} {...rest}>
//         {children}
//       </a>
//     </Link>
//   )
// })

export default function Dropdown({ color }) {
  const router = useRouter()
  async function handleClick() {
    await auth.signOut()
    router.push("/login")
  }

  function handleProfileClick() {
    router.push({pathname: "/profile", query: {userID: router.query.userID}})
  }

  return (
    <div className="top-16 text-right font-Inter">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button 
            className={`text-[${color}] bg-transparent hover:bg-transparent rounded-lg text-sm px-2.5 py-2.5`}
          >
            <BsFillGearFill className="text-lg"/>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
            <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-800 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleProfileClick}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-800 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleClick}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}