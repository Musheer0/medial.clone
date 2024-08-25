"use client"
import { kytance } from '@/libs/ky_/kystance';
import { useMutation } from '@tanstack/react-query';
import { motion, useAnimationControls } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

interface LikeButtonProps {
    isLiked?:boolean,
    postId?:string
}
const CommentLikeButton:React.FC<LikeButtonProps> = ({isLiked, postId}) => {
  const control = useAnimationControls()
    const [isLikedByUser,setIslikedByUser] = useState<boolean|undefined>(isLiked);
    const user = useSession()
    const mutation = useMutation({
        mutationFn : async () => {
            if (!postId) return;
            return !isLikedByUser
              ?await kytance.delete(`/api/post/comment/like/${postId}`)
              : await kytance.post(`/api/post/comment/like/${postId}`);
          },
        onMutate: async () => {
            // Update state optimistically
            setIslikedByUser(prev => !prev);
            // Return the previous state to revert if there's an error
            return { prev: isLikedByUser };
          },
          onError: (error, variable, context) => {
            // Revert state on error
            setIslikedByUser(!isLikedByUser);
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
 {isLikedByUser ? <IoMdHeart size={26} />:   <IoMdHeartEmpty size={26} />}
</motion.button>
  )
}

export default CommentLikeButton