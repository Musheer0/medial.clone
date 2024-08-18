import { useInView } from 'react-intersection-observer'
import React, { PropsWithChildren } from 'react'
interface InfiniteHookprops extends PropsWithChildren {
    onBottomReached : ()=> void
}
const InfiniteScroll = ({onBottomReached,children}:InfiniteHookprops) => {
    const {ref} = useInView({
        rootMargin: '200px',
        onChange(inView){
            if(inView) onBottomReached();
        }
    })
  return (
    <>
    {children}
    <div className="block" ref={ref}></div>
    </>
  )
}

export default InfiniteScroll