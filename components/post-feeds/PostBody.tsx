import { PostFeedType } from '@/type'
import React from 'react'
import Poll from './Poll'
import { Poll  as PollType} from '@prisma/client'
import Link from 'next/link'
interface Postprops {
    post:PostFeedType,
    isSinglePost? :boolean
  }
  const  PostBody = ({post, isSinglePost}:Postprops) => {
  return (
   <>
{isSinglePost ? 
   <p className='whitespace-pre-line'>
   {post.caption}
  </p>
:    <p className='whitespace-pre-line line-clamp-4'>
    {post.caption}
   </p>}

    {post.type==='poll' && <Poll poll={post.poll as  PollType}/>}
    {!isSinglePost &&    <Link href={`/post/${post.id}`} className='font-semibold text-purple-400 hover:underline'>View  more</Link>
}
   </>
  )
}

export default PostBody