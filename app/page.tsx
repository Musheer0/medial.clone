import CreatePost from '@/components/CreatePost'
import Popover from '@/components/motion-premitive/Popover'
import LatestPost from '@/components/post-feeds/LatestPost'
import React from 'react'

const page = () => {
  return (
   <section className='w-full h-full flex flex-col  gap-2'>
    <CreatePost/>
    <LatestPost/>
   </section>
  )
}

export default page