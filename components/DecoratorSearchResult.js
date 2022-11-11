import React from 'react'

export default function DecoratorSearchResult({degree, userID}) {
  return (
    <Link href={{pathname: `/${degree.link}`, query: {userID: userID}}} key={index}>
			<a className="degree-item w-[36rem] h-[50px] flex items-center p-4 text-black border-2
			border-gray-600">
				<p>{degree.name}</p>
			</a>
    </Link>
  )
}
