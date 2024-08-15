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
    path: '/notifications',
    name: 'notifications',
    icon:<IoNotifications />


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
    icon:       <UserIcon/>


  },
]
const NavLinks = () => {
  return (
   <>
   <DesktopNav/>
   <MobileNav/>
   </>
  )
}

export default NavLinks

function DesktopNav(){
  return <div className='hidden flex-col sm:flex gap-4 bg-zinc-900 p-4 rounded-2xl'>
    {links.map((e)=>{
      return <Link className='flex whitespace-nowrap items-center gap-2 hover:bg-zinc-800 hover:text-purple-400 px-4 py-3 rounded-full' href={e.path}>{e.icon} {e.name}</Link>
    })}
  </div>
}

function MobileNav(){
  return <div className='flex sm:hidden absolute bottom-0 left-0 item-center gap-4 bg-zinc-900  w-full justify-between py-1'>
    {mobileLinks.map((e)=>{
      return <Link className='flex flex-col   items-center leading-none justify-center text-center hover:bg-zinc-800 hover:text-purple-400 px-4 py-3 rounded-xl' href={e.path}>{e.icon} <span className='text-xs'>{e.name}</span></Link>
    })}
  </div>
}