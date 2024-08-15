import React from 'react'
import UserIcon from './UserIcon'
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";
import { PiImagesSquareBold } from "react-icons/pi";
import { FaPoll } from "react-icons/fa";

const AddPost = () => {
  return (
    <div className='w-full flex flex-col gap-4 bg-zinc-900 p-5 rounded-2xl'>
      <div className="top flex items-center gap-2">
      <UserIcon/>
      <div className='px-4 py-1 flex-1 border border-zinc-800 rounded-full'>
          Begin Posting...
      </div>

      </div>
      <div className="bottom flex justify-between items-center w-full">
        <div className="left">
      <div className="actions flex items-center gap-2 text-zinc-500 text-lg">
      <BsEmojiSmile />
        <PiImagesSquareBold />
        <IoMdLink />
        <FaPoll />

      </div>
        </div>
        <button disabled className='bg-purple-500 px-6 py-2 rounded-full'>Post</button>
      </div>
    </div>
  )
}

export default AddPost