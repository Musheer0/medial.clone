"use client"
import React from 'react'
import { HiHome } from "react-icons/hi";
import { FaRegNewspaper } from "react-icons/fa6";
import { CiBoxes } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import Link from 'next/link';
import UserIcon from './UserIcon';
interface Link {
 path: string,
 name:string,
 icon:any
}
export const links:Link[]  = [
  {
    path: '/',
    name: 'home',
    icon: <HiHome  size={20}/>

  },
  {
    path: '/news',
    name: 'news',
    icon:<FaRegNewspaper />


  },
  {
    path: '/pods',
    name: 'pods',
    icon:<CiBoxes />


  },
  {
    path: '/startup-showcase',
    name: 'startup showcase',
    icon: '🚀'

  },
  {
    path: '/profile',
    name: 'profile',
    icon:       <UserIcon/>


  },
]
export const mobileLinks:Link[]=[
  {
    path: '/',
    name: 'home',
    icon: <HiHome  />

  },
  {
    path: '/news',
    name: 'news',
    icon:<FaRegNewspaper />


  },
  {
    path: '/pods',
    name: 'pods',
    icon:<CiBoxes />


  },

  {
    path: '/profile',
    name: 'profile',
    icon:       <UserIcon />


  },
]
const NavLinks = () => {
  return (
   <>
   <DesktopNav/>
   </>
  )
}

export default NavLinks

function DesktopNav(){
  return <div className='hidden flex-col lg:flex gap-4 bg-zinc-900 p-4 rounded-2xl'>
    {links.map((e)=>{
      if(window.location.pathname===e.path)       return <Link key={e.path} className='flex whitespace-nowrap items-center gap-2 bg-purple-600/15 text-purple-400 px-4 py-3 rounded-full' href={e.path}>{e.icon} {e.name}</Link>

      return <Link key={e.path} className='flex whitespace-nowrap items-center gap-2 hover:bg-zinc-800 hover:text-purple-400 px-4 py-3 rounded-full' href={e.path}>{e.icon} {e.name}</Link>
    })}
  </div>
}

