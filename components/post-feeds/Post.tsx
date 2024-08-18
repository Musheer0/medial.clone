"use client"
import React, { useState } from 'react';
import formatTimeDifference from '@/libs/formate/FormateDate';
import { PostFeedType } from '@/type';
import Link from 'next/link';
import { CiHeart } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { motion } from 'framer-motion';
import PostDropDown from './PostDropDown';
import { LoaderCircle } from 'lucide-react';

const Post = ({ post }: { post: PostFeedType }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDeleting,setIsDeleting] = useState(false)
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
if(!post) return <></>
  if(post) return (
    <div className="lg:border animate-in relative border-zinc-800 p-5 border-b overflow-hidden lg:rounded-2xl">

      <motion.div key={post?.id|| 'r'}       transition={{ duration: 0.5 }}  // Duration of the fade-in effect
 className='absolute w-full h-full bg-zinc-50/50 top-0 left-0' initial={{opacity: 1, display: 'block'}} animate={{opacity:0, display: 'none'}}></motion.div>
      <div className="header flex items-center justify-between">
        <div className="user flex items-center gap-1">
          <img src={post?.user?.image as string} className="bg-red-500 rounded-full w-[30px] h-[30px]" alt="User avatar" />
          <div className="text flex flex-col">
            <p className="font-semibold leading-none">{post?.user?.name}</p>
            <p className="leading-none text-xs text-zinc-500">{post?.createdAt ? formatTimeDifference(post?.createdAt) : 'Just now'}</p>
          </div>
        </div>
        <PostDropDown post={post} deleting={setIsDeleting}/>
      </div>
      <div className="body pt-3 border-l-[2px] border-zinc-600 mx-auto w-[calc(100%-20px)] p-2">
        <p className='whitespace-pre-wrap line-clamp-4'>{post?.caption}</p>
        {post.type === 'poll' && (
          <div className="poll flex flex-col gap-1">
            {post.poll?.options.map((option, i) => (
              <label
                key={i}
                htmlFor={`${post.id}-${option}`}
                className={`text-start text-purple-50 ${selectedOption === option ? 'bg-purple-600/15 text-purple-600 border border-purple-600' : 'bg-purple-200/15'} w-full py-2 rounded-lg px-2 cursor-pointer`}
              >
                {option}
                <input
                  type="radio"
                  name={post.id}
                  id={`${post.id}-${option}`}
                  hidden
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleRadioChange}
                  aria-label={`Select ${option}`}
                />
              </label>
            ))}
            <p className='text-xs text-zinc-500 w-full text-end'> {post.poll?.vote_count===0 ? 'be the first one to vote' : <>
             {
              Intl.NumberFormat("en-US",{
                notation: 'compact',
                maximumFractionDigits: 1
              }).format(post.poll?.vote_count as number)
             } votes
            </>}</p>
          </div>
        )}
        <Link href={'/post/'+post.id} className="font-semibold text-sm text-purple-500 hover:underline">see more</Link>
      </div>
      <div className="footer flex items-center justify-between w-full">
        <div className="left flex items-center gap-2">
          <div className="replies flex items-center">
            {post.comment_count>4 && 
            <>
            <div className="users flex items-center">
              <img src="" className="bg-red-500 rounded-full w-[25px] border-2 border-zinc-800 h-[25px]" alt="User replies" />
              <img src="" className="bg-red-500 rounded-full w-[25px] border-2 z-0 border-zinc-800 h-[25px] -translate-x-2" alt="User replies" />
            </div>
            <p className="font-semibold text-sm text-purple-500"> {post.comment_count} replies</p>
            </>
            }
          </div>
          <p className="text-sm text-zinc-400">{post.like_count} likes</p>
        </div>
        <div className="right flex items-center ">
          <button className="p-2 rounded-lg hover:bg-zinc-800 text-purple-400"><CiHeart  size={26}/></button>
          <button className="p-2 rounded-lg hover:bg-zinc-800 text-purple-400"><BsBookmark  size={20}/></button>
          <button className="p-2 rounded-lg hover:bg-zinc-800 text-purple-400"><CiShare1  size={20} /> </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
