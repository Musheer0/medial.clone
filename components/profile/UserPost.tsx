"use client"
import { kytance } from '@/libs/ky_/kystance'
import { PostsPage } from '@/type'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import PostLoader from '../post-feeds/PostLoader'
import InfiniteScroll from '../InfiniteScroll'
import FeedPost from '../post-feeds/FeedPost'
import { User } from '@prisma/client'
interface UserPostprop{
  user:User
}
const UserPost:React.FC<UserPostprop> = ({user}) => {
  const query = useInfiniteQuery<PostsPage>({
    queryKey: [`${user.id}-posts`],
    queryFn: ({pageParam}) => kytance.get('/api/post/user-posts/'+user.id, pageParam? {searchParams: {cursor:pageParam as string}}:{}).json<PostsPage>(),
    initialPageParam: null as string|null,
    getNextPageParam: (lastpage)=> lastpage.nextCursor || null
  })
  const posts = query.data?.pages.flatMap(page => page.posts)
  if(query.status ==='error') return <p>error</p>
  if((query.data?.pages.flatMap(page=> page.posts)||[])?.length===0 && !query.isFetching) return <p className='w-full text-center text-zinc-500'>No posts yet.</p>
  return (
  <div className='flex flex-col lg:gap-2 pt-10'>
            <InfiniteScroll onBottomReached={()=> query.hasNextPage && !query.isFetching && query.fetchNextPage()}>
     {(posts||[]).map((e,i)=>{
      const postwithuser = e;
      postwithuser['user'] = {name: user.name, id: user.id, image: user.image}
        return <FeedPost key={i} post={e}/>
       })}
     </InfiniteScroll>
     {(query.status==='pending' || query.isFetchingNextPage) && 
       <>
       {[1,2,3,4,5,6,7].map((e)=>{
        return <PostLoader key={e}/>
       })}
       </>
    }
  </div>
  )
}

export default UserPost