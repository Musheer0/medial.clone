import { GetTopUsers } from '@/libs/user/actions'
import { SmallUserDataSelect } from '@/type';
import Link from 'next/link';
import React, { use } from 'react'

const TopUsers = async() => {
  
  const users:SmallUserDataSelect[]  = await GetTopUsers() as SmallUserDataSelect[];
  return (
    <div className='min-w-[300px]  bg-zinc-900 rounded-2xl p-5'>
        <h1 className='whitespace-nowrap  font-semibold'>Top Users</h1>
        <div className="users flex flex-wrap items-center gap-2 p-2">
       {users && 
       <>
       {Array.from(users).map((e)=>{
        return (
          <Link href={'/user/profile/'+e?.id} className='group '>
          <div className="user relative">
            <div className="username scale-0 origin-bottom group-hover:scale-100 transition-all duration-300 ease-in-out text-xs absolute -top-full left-1/2 -translate-x-1/2 bg-zinc-800 p-2 rounded-full">
            {e.name}
            </div>
            <img src={e.image} alt={'profile-picture'}  className='w-[40px] rounded-full hover:scale-[1.4] transition-all duration-300 ease-in-out'/>
          </div>
          </Link>
        )
       })}
       </>
       }
        </div>
    </div>
  )
}

export default TopUsers