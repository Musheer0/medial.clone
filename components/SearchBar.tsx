import React from 'react'
import { RiSearch2Line } from "react-icons/ri";

const SearchBar = () => {
  return (
    <div className=' flex-1 px-5'>
        <div className="input relative">
        <RiSearch2Line  className='absolute top-1/2 -translate-y-1/2 left-2  text-zinc-400' size={20}/>
            <input type="search" name="search" id="search" placeholder='Search Anyone' className='bg-zinc-900 text-zinc-50 pl-8 px-5 py-2  w-full  rounded-full border border-zinc-800' />
        </div>
    </div>
  )
}

export default SearchBar