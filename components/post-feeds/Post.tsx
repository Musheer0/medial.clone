import { PostFeedType, SmallUserDataSelect } from '@/type'
import React from 'react'
import Header from './PostUserInfo'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
interface Postprops {
  post:PostFeedType,
  isSinglePost? :boolean

}
const Post = ({post,isSinglePost}:Postprops) => {
  return (
    <>
    <Header user={post.user as SmallUserDataSelect} createdAt={post.createdAt}/>
    <div className='w-full py-3'>
    <PostBody post={post} isSinglePost={isSinglePost}/>
    </div>
    <PostFooter post={post}/>
    </>
  )
}

export default Post