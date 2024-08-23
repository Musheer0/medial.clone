import Profile from '@/components/profile/Profile'
import { GetUserById } from '@/libs/user/actions'
import { User } from '@prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
interface ProfilePageProps {
    params:{
        id:string
    }
}
const page:React.FC<ProfilePageProps> = async({params}) => {
 if(!params.id) return notFound()
const user = await GetUserById(params.id) as User;
  return ( 
    <Profile user={user}/>
  )
}

export default page