import { kytance } from '@/libs/ky_/kystance'
import { CommentPage } from '@/type'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import InfiniteScroll from '../InfiniteScroll'
import PostLoader from '../post-feeds/PostLoader'
import Comment from './Comment'

const Comments = ({id}:{id:string}) => {
   console.log('comment', `comment-${id}`)
  const query = useInfiniteQuery<CommentPage>({
    queryKey: ['comment', `comment-${id}`],
    queryFn:({pageParam})=> kytance.get(`/api/post/comment/${id}`,pageParam ? {searchParams: {cursor: pageParam as string}}: {}).json<CommentPage>(),
    initialPageParam: null as string|null,
    getNextPageParam:(lastPage)=>  lastPage.nextCursor || null
  })
  if(query.error) return <>Error</>
  return (
    <div className='flex flex-col lg:gap-2 pt-10'>
    <InfiniteScroll onBottomReached={()=> query.hasNextPage && !query.isFetching && query.fetchNextPage()}>
    {(query.data?.pages.flatMap(page=> page.comments)||[]).map((e,i)=>{
       return  <Comment comment={e}/>
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

export default Comments