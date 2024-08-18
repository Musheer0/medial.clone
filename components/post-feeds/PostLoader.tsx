import React from 'react'

const PostLoader = () => {
  return (
    <div className="lg:border animate-in relative border-zinc-800 p-5 border-b overflow-hidden lg:rounded-2xl ">
    <div className="header w-full flex items-center justify-between">
       <div className="user w-full flex items-center gap-1">
         <div className="bg-zinc-600 animate-pulse rounded-full w-[30px] h-[30px] "></div>
           <div className="text flex flex-col  flex-1 gap-2">
               <div className="bg-zinc-600 animate-pulse rounded-full w-1/2 h-[6px] "></div>
               <div className="bg-zinc-600 animate-pulse rounded-full w-1/3 h-[5px] "></div>
           </div>
       </div>
    </div>
    <div className="body border-l-[2px] border-zinc-600 mx-auto w-[calc(100%-20px)]  p-2 ">
     <div className="bg-zinc-600 animate-pulse rounded-md w-full  h-[200px] "></div>

    </div>
    <div className="footer flex items-center justify-between w-full">
  <div className="left flex items-center gap-2">
   <div className="replies flex items-center">
       <div className="users flex items-center animate-pulse">
           <div  className="bg-zinc-600  rounded-full w-[25px] border-2 border-zinc-800  h-[25px] " ></div>
           <div  className="bg-zinc-600 rounded-full w-[25px] border-2 border-zinc-800  h-[25px]  -translate-x-2" ></div>
       </div>
     </div>
   </div>

    </div>
 </div>
  )
}

export default PostLoader