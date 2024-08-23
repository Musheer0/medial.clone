"use server"
import { auth } from '@/auth'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import PopupModel from './PopupModel'
import Logout from '@/components/Logout'
const UserIcon =async ({showdropdown}: {showdropdown?:boolean}) => {
    const user = await auth()
    if(!user?.user && showdropdown)  return <PopupModel title='Login' titleClassName='px-6 py-2 border border-zinc-800 rounded-full'></PopupModel>
    if(!user?.user) return <div className='w-[30px] h-[30px] rounded-full text-zinc-950 text-xs flex justify-center items-center bg-zinc-50'>N/A</div>
    if(showdropdown) return <DropdownMenu>
    <DropdownMenuTrigger>
    <div className='w-[34px]   overflow-hidden rounded-full bg-zinc-50'>
    <img src={user.user.image|| ''} className='w-[34px] h-[34px]' alt="user profile " title={user.user.name as string} />
    </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem><Logout>Logout</Logout></DropdownMenuItem>
      <DropdownMenuItem>Theme</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  
  return (
    <div className='w-[30px] h-[30px]  overflow-hidden rounded-full bg-zinc-50'>
    <img src={user.user.image|| ''} alt="user profile" />
    </div>
  )
}

export default UserIcon