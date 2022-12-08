import Dropdown from "../components/Dropdown"
import Link from 'next/link'
import { useRouter } from "next/router"
import { useState } from 'react'
import React, {Component} from "react"
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher"
import { View, StyleSheet } from 'react'

export default function about(){
    const router = useRouter()
    return (
        <div>
            {/* begin nav bar */}
            <nav className="bg-[#292828] border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 shadow-md">
                <div className="container text-white flex flex-wrap justify-between items-center mx-auto">
                <Link href={{pathname: "/", query: {userID: router.query.userID}}}>
                    <div className="navbar-brand cursor-pointer flex">
                    <img className="w-6 h-6 ml-2 text-[#ffffff]" src="https://i.imgur.com/PUIKaAn.png"></img><b>egreeDoor</b>
                    </div>
                </Link>
                <div className='text-white mr-[4.5rem]'>
                    <b>ABOUT US</b>
                </div>
                <div className="flex md:order-2">
                    <Dropdown color="#FFFFFF"/>
                </div>
                </div>
            </nav>
            {/* end nav bar */}
            
            <div className="w-2/3 h-[600px] mt-[70px] m-auto border-[0.5px] bg-[#f9f9f9] rounded shadow-sm py-8">
                <h1 className="absolute text-4xl ml-[180px] mt-[20px] transform text-transparent font-bold bg-clip-text bg-gradient-to-r from-green-700 to-green-900">
                    DegreeDoor
                </h1>
                <h1 className="absolute right-2/4 text-md justify-left ml-[315px] mt-[80px] font-light text-justify text-gray-500">
                    Sed ut perspiciatis perspiciatis voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </h1>
                <h1 className="absolute mt-[460px] ml-[250px]">
                    <img src="https://i.imgur.com/FVOB96X.png" className="w-[50px] h-[50px]"></img>
                </h1>
                <img src="https://i.imgur.com/6MeOx1A.jpg" className="w-[400px] h-[530px] ml-[570px]"></img>
            </div>
        </div>
    )
}