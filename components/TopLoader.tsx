"use client"
import { useTopLoaderStore } from '@/libs/global_states'
import React from 'react'

const TopLoader = () => {
    const {percentage}= useTopLoaderStore();
  return (
    <div className={`loader absolute top-0 left-0 w-full scale-x-[${percentage/100}] origin-top-left bg-purple-500 h-1`}>
    </div>

  )
}

export default TopLoader