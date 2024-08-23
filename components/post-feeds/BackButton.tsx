"use client"
import { useRouter } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
interface BackButonProp extends PropsWithChildren{
    className?: string
}
const BackButton = ({className, children}:BackButonProp) => {
    const router = useRouter()
  return (
    <div className={className} onClick={(()=>{ router.back()})}>
        {children}</div>
  )
}

export default BackButton