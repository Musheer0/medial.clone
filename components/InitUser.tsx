"use client"
import { GetCurrentUser } from '@/libs/user/actions';
import useUserStore from '@/libs/user/useUserStore'
import { User } from '@prisma/client';
import React, { useEffect } from 'react'

const InitUser = () => {
    const {user, setUser} = useUserStore();
    useEffect(()=>{
        const unsub = async()=>{
         if(user) return ;
         const current_user = await GetCurrentUser()
         setUser(current_user as User);
        }
        unsub();
    },[user])
  return (
    <></>
  )
}

export default InitUser