"use client"
import { kytance } from '@/libs/ky_/kystance'
import { PostFeedType, PostsPage } from '@/type'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import Post from './Post'
import PostLoader from './PostLoader'
import InfiniteScroll from '../InfiniteScroll'

const LatestPost = () => {
  const query = useInfiniteQuery<PostsPage>({
    queryKey: ['latest-post', 'post-feed'],
    queryFn: ({ pageParam }) =>
      kytance.get('/api/post/latest-post',pageParam ? {searchParams: {cursor: pageParam as string}}: {}).json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null, // Return the next cursor or null if no more pages
  });

    if(query.status ==='error') return <p>error</p>
    if((query.data?.pages.flatMap(page=> page.posts)||[])?.length===0 && !query.isFetching) return <p className='w-full text-center text-zinc-500'>No posts yet.Be the first to post</p>
  return (
    <div className='flex flex-col gap-2 pt-10'>
     <InfiniteScroll onBottomReached={()=> query.hasNextPage && !query.isFetching && query.fetchNextPage()}>
     {(query.data?.pages.flatMap(page=> page.posts)||[]).map((e,i)=>{
        return <Post key={i} post={e}/>
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

export default LatestPost