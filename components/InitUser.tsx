"use client"
import { GetCurrentUser } from '@/libs/user/actions';
import useUserStore from '@/libs/user/useUserStore'
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react'

const InitUser = () => {
    const {user, setUser} = useUserStore();
    useEffect(()=>{
        const unsub = async()=>{
         if(user) return ;
         const current_user = await GetCurrentUser() as User
         if(!current_user.id) {
          setUser(null)
         }
         setUser(current_user as User);
        }
        unsub();
    },[user])
  return (
    <></>
  )
}

export default InitUser