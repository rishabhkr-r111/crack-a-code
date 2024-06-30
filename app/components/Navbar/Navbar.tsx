"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, User } from "lucide-react"
import { getUser } from '@/utils/user';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";


export default function Navbar() {
  const [state, setState] = React.useState(false)
  const [data, setData] = React.useState(null);
  useEffect(() => {
    getUser().then((data) => {
      setData(data)
    })
  }, [])

  const menus = [
    { title: "Home", path: "/" },
    { title: "Contests", path: "/contests" },
    { title: "About Us", path: "/about-us" },
    { title: "Contact Us", path: "/contact-us" },
  ]

  return (
    <nav className="w-full border-b md:border-0">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-xl font-bold text-green-800">Crack A Code_</h1>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 mr-10 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-gray-600 mr-1 hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        {data && data.user ? (<div><Link href={"/dashboard"}><Button>Dashboard</Button></Link></div>):
        (<Link href={"/login"}><User className="flex-none text-gray-300 flex-end" /></Link>)}
        
      </div>
    </nav>
  )
}