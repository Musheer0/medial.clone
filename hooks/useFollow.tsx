" use client"
import { kytance } from '@/libs/ky_/kystance'
import { FollowerInfo } from '@/type'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useFollow = (id:string , initialState:FollowerInfo) => {
const query = useQuery({
       queryKey: ['follow-info', id],
       queryFn:()=> kytance.get('/api/user/'+id+'/follow').json<FollowerInfo>(),
       initialData:initialState,
       staleTime:Infinity
});
return query
}
export default useFollow