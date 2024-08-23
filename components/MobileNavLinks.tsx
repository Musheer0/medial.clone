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

  // {
  //   path: '/profile',
  //   name: 'profile',
  //   icon:       <UserIcon />


  // },
]
const MobileNavLinks = () => {
  return (
   <>
   <MobileNav/>
   </>
  )
}

export default MobileNavLinks

function MobileNav(){
  return <div className='flex  z-[999999] i lg:hidden border-t border-zinc-900 fixed bottom-0 left-0 item-center gap-4 bg-zinc-950  w-full justify-between py-1 px-2'>
    {mobileLinks.map((e)=>{
            if(window.location.pathname===e.path)      return <Link key={e.path} className='flex flex-col   items-center leading-none justify-between text-center border-t-2 border-purple-400 text-purple-400 px-4 py-3 ' href={e.path}>{e.icon} <span className='text-xs'>{e.name}</span></Link>

      return <Link key={e.path} className='flex flex-col   items-center leading-none justify-between text-center hover:bg-zinc-800 hover:text-purple-400 px-4 py-3 rounded-xl' href={e.path}>{e.icon} <span className='text-xs'>{e.name}</span></Link>
    })}
  </div>
}