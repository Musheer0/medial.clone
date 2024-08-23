import { User } from '@prisma/client'
import React from 'react'
import { IoCalendar } from "react-icons/io5";
import { SlUserFollow } from "react-icons/sl";
import FollowButton from './FollowButton';
import { UserWithFollower } from '@/type';

interface ProfileHeaderProps{
    user : UserWithFollower,
  
  }
const UserProfileHeader:React.FC<ProfileHeaderProps> = ({user}) => {
  console.log(user)
  return (
    <div className='w-full'>
        <div className="basic_info flex flex-col gap-2 p-2">
            <div className="profile flex items-center gap-2">
                <img src={user.image as string} className='w-[60px] rounded-full' alt="user profile picture" />
                <div className="text flex flex-col">
                    <p className='font-bold text-md'>{user.name}</p>
                    <p className='text-sm text-zinc-400'>{user.tagline}</p>
                </div>
            </div>
            <div className="other_info flex items-center gap-2 text-zinc-400">
                <p>{user.location}</p>
                <p className='flex items-center gap-1'><IoCalendar />
                 Joined  {user.createdAt.toLocaleDateString("en-Us",{
                  month:'long',
                  day: '2-digit',
                  year:'numeric'
                  })}</p>
            </div>  
        </div>
        <div className="socials flex p-2 justify-between w-full">
              <div className="social">
                
              </div>
             <FollowButton id={user.id} initialState={{count: Number(user.follower_count), isFollowing: user.follwer.length>0}}/>
            </div>
            <div className="about p-2 border rounded-xl border-zinc-900">
              <div className="header border-b border-zinc-900 py-2">
                <h4 className='font-bold'>About</h4>
              </div>
              <div className="bio pt-1">
                <p className='whitespace-pre-line text-zinc-300 text-sm'>{user.bio}</p>
              </div>
            </div>
    </div>
  )
}

export default UserProfileHeader 