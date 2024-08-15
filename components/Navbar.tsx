import React from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import PopupModel from './PopupModel'
import UserIcon from './UserIcon'

const Navbar = () => {
  return (
  <nav className='px-10 py-4 w-full flex justify-between items-center border-b border-zinc-700'>
    <Logo />
    <SearchBar/>
    <div className="right hidden sm:flex items-center gap-2">
      <button className='bg-purple-600 px-5 py-2 rounded-full'>Download App</button>
      {/* <UserIcon/> */}
     <PopupModel title='Login' titleClassName='px-6 py-2 border border-zinc-800 rounded-full'></PopupModel>
    </div>
  </nav>
  )
}

export default Navbar