"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const notFound = () => {
  const router = useRouter()
  return (
    <div className='w-full h-full flex gap-3 items-center justify-center flex-col'>
       <Image src={'/logo.png'} width={100} height={100} alt='logo'/>
       <h1 className='font-bold text-2xl'>This Page is not available</h1>
       <button className='bg-purple-600/15 text-purple-600 px-4 py-2 rounded-full ' onClick={()=>{
        router.back()
       }}>Go back</button>
    </div>
  )
}

export default notFound