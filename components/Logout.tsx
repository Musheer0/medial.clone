"use client"
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = ({children}:{children:React.Component|any}) => {
  const query = useQueryClient();

  return (
<>
<div className='w-full h-full' onClick={async()=>{
  query.clear();
    await signOut().then(()=>{
        window.location.reload()
    })
}}>
{children}
</div>
</>
  )
}

export default Logout