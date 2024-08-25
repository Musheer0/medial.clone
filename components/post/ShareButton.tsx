"use client"
import useOrigin from '@/hooks/useOrigin'
import React from 'react'
import { CiShare1 } from 'react-icons/ci'

const ShareButton = ({title, caption, url, origin}:{title:string, caption:string, url:string, origin:boolean}) => {
   const useorigin = useOrigin()
    return (
    <button
    onClick={()=>{
        navigator.share({
            title,
            text:caption,
            url: origin? `${useorigin}${url}`:url
        })
    }}
    className="p-2 rounded-lg hover:bg-zinc-800 text-purple-400">
    <CiShare1 size={26} />
</button>
  )
}

export default ShareButton