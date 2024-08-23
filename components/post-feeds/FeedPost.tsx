import { PostFeedType } from '@/type'
import React from 'react'
import Post from './Post'

interface postprops {
    post:PostFeedType
  }
  const FeedPost:React.FC<postprops> = ({post}) => {
  return (
    <div className='flex flex-col lg:border  border-b py-4 px-1 gap-2 border-zinc-800 lg:p-3 lg:rounded-xl'>
        <Post post={post}/>
    </div>
  )
}

export default FeedPost