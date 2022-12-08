import Dropdown from "../components/Dropdown"
import Link from 'next/link'
import { useRouter } from "next/router"
import { useState } from 'react'
import React, {Component} from "react"
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher"
import { View, Stylesheet } from 'react-native'

export default function about()
{
    const router = useRouter()
    return (
        <div>
            {/* begin nav bar */}
            <nav className = "bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
            <div className = "container flex flex-wwrap justify-between items-center mx-auto">
                <Link href = {{pathname: "/", query: {userID: router.query.userID}}}>
                <div className = "navbar-brand cursor-pointer flex">
                    <img className = "w-6 h-6 ml-2" scr = "https://i.imgur.com/jooFjXL.png"></img><b>DegreeDoor</b>
                </div>
                </Link>
                <div className = "flex ml-[225px] text-green-700">
                    <b>About Us</b>
                </div>
                <div className = "flex md:order-2">
                <Dropdown color = "#292c2c"/>
                </div>
                <div className = "md:flex md:w-auto">
                <ul className = "mt-4 items-center bg-gray-50 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0 md:bg-white"></ul>
                </div>
            </div>
            </nav>
            {/* end nav bar */}
            <div>
            
            </div>
        </div>
    )

}

const flex = () => {
    return (
        <View style = {Stylesheet.container}>
            <View style = {Stylesheet.textBox} />
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '500'
    },
    textBox: {
        width: '100',
        height: '100',
        backgroundColor: 'white'
    }
})