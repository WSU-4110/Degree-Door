import Link from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { auth } from '../firebase'
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

export default function Example() {
  const router = useRouter()
  async function handleClick() {
    await auth.signOut()
    router.push("/login")
  }

  return (
    <div className="top-16 text-right font-Inter">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button 
            className="w-full justify-center rounded-md bg-slate-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white 
            hover:bg-opacity-30 hover:scale-90 duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Options
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
                      active ? 'bg-[#67A25B] text-white' : 'text-gray-900'
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