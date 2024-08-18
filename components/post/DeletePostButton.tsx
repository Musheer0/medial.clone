"use client"
import { PostFeedType } from '@/type'
import React, { PropsWithChildren } from 'react'
import { useDeletePostMutation } from './mutation'
import { LoaderCircleIcon } from 'lucide-react'
interface DeletePostButtonProps extends PropsWithChildren{
    post: PostFeedType,
    className:string,
    deleteState? :any
}
const DeletePostButton = ({post,className,children,deleteState}:DeletePostButtonProps) => {
  const mutation = useDeletePostMutation()
  deleteState(mutation.isPending)
  const  DeletePost = ()=>{
    mutation.mutate(post,{
    })
  }
  if(mutation.isPending) return <div className='flex items-center justify-center'>
    <LoaderCircleIcon className='animate-spin'/>
  </div>
    return (
    
    <div className={className} onClick={DeletePost}>{children}</div>
  )
}

export default DeletePostButton