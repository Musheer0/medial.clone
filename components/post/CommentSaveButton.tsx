"use client"
import { kytance } from '@/libs/ky_/kystance';
import { useMutation } from '@tanstack/react-query';
import { motion, useAnimationControls } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

interface LikeButtonProps {
    isSaved?:boolean,
    postId?:string
}
const CommentSaveButton:React.FC<LikeButtonProps> = ({isSaved, postId}) => {
  const control = useAnimationControls()
    const [isSavedByUser,setIsSavedByUser] = useState<boolean|undefined>(isSaved);
    const user = useSession()
    const mutation = useMutation({
        mutationFn : async () => {
            if (!postId) return;
            return !isSavedByUser
              ?await kytance.delete(`/api/post/comment/save/${postId}`)
              : await kytance.post(`/api/post/comment/save/${postId}`);
          },
        onMutate: async () => {
            // Update state optimistically
            setIsSavedByUser(prev => !prev);
            // Return the previous state to revert if there's an error
            return { prev: isSavedByUser };
          },
          onError: (error, variable, context) => {
            // Revert state on error
            setIsSavedByUser(!isSavedByUser);
          },
      
    })
    if(!postId || !user.data?.user?.id) return ;

  return (
    <motion.button
    initial={{
      scale: 1
    }}
    transition={{
      duration: .4,
    ease: 'backInOut'
    }}
    variants={{
      ani:{
        scale:[1, 1.2 ,1]
      }
    }}
    animate={control}
    onClick={async()=>{
      control.start("ani");
      await mutation.mutate()
    }} className="p-2 rounded-lg hover:bg-zinc-800 text-purple-400">
 {isSavedByUser ?<BsBookmarkFill  size={23} /> :    <BsBookmark  size={23} />}
</motion.button>
  )
}

export default CommentSaveButton