import React from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import PopupModel from './PopupModel'
import UserIcon from './UserIcon'
import Notificatons from './Notificatons'

const Navbar = () => {
  return (
  <nav className='px-10  bg-zinc-950 z-10 h-[70px] w-full flex justify-between items-center border-b border-zinc-700'>
    <Logo />
    <div className="right  flex items-center gap-2">
    <SearchBar/>
      <Notificatons/>
     <div className='lg:flex hidden'> <UserIcon showdropdown /></div>
      {/* <button className='bg-purple-600 px-5 py-2 rounded-full'>Download App</button> */}
     
    </div>
  </nav>
  )
}

export default Navbar