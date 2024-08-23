"use client"
import { User } from 'next-auth'
import { notFound } from 'next/navigation'
import React, { useState } from 'react'
import { SinglePostFeedType } from '@/type'
import Post from './Post'
import BackButton from './BackButton'
import { ArrowBigLeft } from 'lucide-react'
import CommentForm from '../post/CommentForm'
interface SinglePostProps {
    post : SinglePostFeedType | {error:string}|any,
    session :User|null|undefined
}
const SinglePost = ({post,session}:SinglePostProps) => {
  const [isDeleting,setIsDeleting] = useState(false)

    if( post?.error) return notFound();
    if(!post) return  notFound()
    if(!session?.id) return notFound()
  return (
    <div className='flex flex-col w-full h-full gap-1 py-1'>
      <div className="heaader flex flex-col ">
        <BackButton className='flex items-center cursor-pointer  gap-2 pr-3 py-2 w-fit rounded-lg hover:bg-zinc-900'>
          <ArrowBigLeft/>
          <p className='text-sm text-zinc-300'>Go Back</p>
        </BackButton>
      </div>
  <div className='border-t border-b border-zinc-900 py-2'>
  <Post  isSinglePost post={post}/>
  <hr className='border-zinc-800'/>
  <CommentForm post={post} />
  </div>
    </div>
  )
}

export default SinglePost