"use client" 
import useFollow from '@/hooks/useFollow'
import { kytance } from '@/libs/ky_/kystance'
import { FollowerInfo } from '@/type'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { SlUserFollow } from 'react-icons/sl'
import { SlUserUnfollow } from "react-icons/sl";

interface FollowButtonProps{
    id:string,
    initialState :FollowerInfo
}
const FollowButton:React.FC<FollowButtonProps> = ({id, initialState}) => {
    if(!id) return;
    const query = useFollow(id,initialState);
    const queryKey:QueryKey= ['follow-info', id]

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
       mutationFn:()=> 
        query.data.isFollowing ? kytance.delete('/api/user/'+id+'/follow')
       : kytance.post('/api/user/'+id+'/follow'),
       onMutate:async()=>{
            await queryClient.cancelQueries({queryKey});
            const prev = queryClient.getQueryData<FollowerInfo>(queryKey);
            queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
              count :prev?.isFollowing ?  (prev?.count||0)-1: (prev?.count||0)+1,
              isFollowing: !prev?.isFollowing
            }));
            return {prev}
       },
       onError(error, variable,context){
        queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
          count :context?.prev?.count|| 0,
          isFollowing: context?.prev?.isFollowing
        }));
       }
    })
    
    if(query.isPending) return   <button disabled className='px-2 py-1 rounded-xl bg-zinc-700 flex items-center gap-1'>
    <LoaderCircle className='animate-spin'/>
      Follow</button>;
    if(query.data.isFollowing) return  <button  onClick={()=>{
      mutate()
    }} className='px-2 py-1 rounded-xl bg-zinc-100 text-zinc-950 flex items-center gap-1'>
<SlUserUnfollow />

      Unfollow</button>
  return (
    <button onClick={()=>{
      mutate()
    }} className='px-2 py-1 rounded-xl bg-purple-700 flex items-center gap-1'>
    <SlUserFollow/>
      Follow</button>
  )
}

export default FollowButton