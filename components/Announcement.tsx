import Link from 'next/link'
import React from 'react'

const Announcement = () => {
  return (
    <div className='max-w-[300px]'>
        <div className="banner w-full bg-red-500 rounded-2xl h-[200px]"></div>
        <Link href={'/'} className='whitespace-pre-wrap line-clamp-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, quod dolore fuga in vero earum pariatur quasi obcaecati! Doloremque error laudantium fuga commodi?</Link>
    </div>
  )
}

export default Announcement