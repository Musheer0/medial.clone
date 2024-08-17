"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = ({children}:{children:React.Component|any}) => {
  return (
<>
<div className='w-full h-full' onClick={async()=>{
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