import React from 'react'
import PostForm from './post/PostForm'
import { auth } from '@/auth'

const CreatePost = async() => {
  const session = await auth()
  if(!session?.user)  return ;
  return (
   <div className='bg-zinc-900 p-5 h-fit transition-all duration-300 ease-in-out  lg:rounded-2xl'>
    <PostForm/>
   </div>
  )
}

export default CreatePost