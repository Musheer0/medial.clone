import React from 'react';
import { CiHeart, CiShare1 } from 'react-icons/ci';
import { BsBookmark } from 'react-icons/bs';
import { PostFeedType } from '@/type';
import LikeButton from '../post/LikeButton';
import SaveButton from '../post/SaveButton';
import ShareButton from '../post/ShareButton';

interface PostFooterProps {
    post: PostFeedType;
}

const PostFooter = ({ post }:PostFooterProps) => {
    console.log(post)
    return (
        <div className="footer flex items-center justify-between w-full py-2">
            <div className="left flex items-center gap-2">
                <div className="replies flex items-center">
                    {post.comment_count > 4 && 
                    <>
                        <div className="users flex items-center">
                            {/* Add src attribute to the images as needed */}
                                {post.comments?.map((e,i)=>{
                                    return        <img key={e.id} src={e.user.image as string} className={`bg-red-500 rounded-full w-[25px] border-2 border-zinc-800 h-[25px] -translate-x-${i*2}`}  alt="User replies" />
                                })}
                        </div>
                    </>
                    }
                    <p className="font-semibold text-sm text-purple-500">{post.comment_count} replies</p>
                </div>
                <p className="text-sm text-zinc-400">{post.like_count} likes</p>
            </div>
            <div className="right flex items-center">
            <LikeButton isLiked={post.likedBy?.length>0} postId={post.id}/>
                <SaveButton postId={post.id} isSaved={post.savedBy?.length>0}/>
                <ShareButton title={`${post.user.name}'s post`} caption={post.caption.slice(0,10)+'...'} url={`/post/${post.id}`} origin/>
            </div>
        </div>
    );
};

export default PostFooter;
