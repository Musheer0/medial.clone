import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import UserProfileHeader from './UserProfileHeader';
import UserPost from './UserPost';
interface ProfileProps{
  user : User,

}
const Profile:React.FC<ProfileProps> = ({user}) => {
  // const current_user = useSession();
  return (
    <section className='w-full px-1 '>
<UserProfileHeader user={user}/>
<UserPost user={user}/>
    </section>
  )
}

export default Profile