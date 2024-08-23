import React from 'react';
import { CiHeart, CiShare1 } from 'react-icons/ci';
import { BsBookmark } from 'react-icons/bs';
import { PostFeedType } from '@/type';

interface PostFooterProps {
    post: PostFeedType;
}

const PostFooter = ({ post }:PostFooterProps) => {
    return (
        <div className="footer flex items-center justify-between w-full py-2">
            <div className="left flex items-center gap-2">
                <div className="replies flex items-center">
                    {post.comment_count > 4 && 
                    <>
                        <div className="users flex items-center">
                            {/* Add src attribute to the images as needed */}
                            <img src="" className="bg-red-500 rounded-full w-[25px] border-2 border-zinc-800 h-[25px]" alt="User replies" />
                            <img src="" className="bg-red-500 rounded-full w-[25px] border-2 z-0 border-zinc-800 h-[25px] -translate-x-2" alt="User replies" />
                        </div>
                        <p className="font-semibold text-sm text-purple-500">{post.comment_count} replies</p>
                    </>
                    }
                </div>
                <p className="text-sm text-zinc-400">{post.like_count} likes</p>
            </div>
            <div className="right flex items-center">
                <button className="p-2 rounded-lg hover:bg-zinc-800 text-purple-400">
                    <CiHeart size={26} />
                </button>
                <button className="p-2 rounded-lg hover:bg-zinc-800 text-purple-400">
                    <BsBookmark size={20} />
                </button>
                <button className="p-2 rounded-lg hover:bg-zinc-800 text-purple-400">
                    <CiShare1 size={20} />
                </button>
            </div>
        </div>
    );
};

export default PostFooter;
