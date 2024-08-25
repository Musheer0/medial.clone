import React from 'react';
import { CiHeart, CiShare1 } from 'react-icons/ci';
import { BsBookmark } from 'react-icons/bs';
import { CommentWithLikesAndSaves, PostFeedType } from '@/type';
import LikeButton from '../post/LikeButton';
import SaveButton from '../post/SaveButton';
import ShareButton from '../post/ShareButton';
import CommentLikeButton from './CommentLikeButton';
import CommentSaveButton from './CommentSaveButton';

interface CommentFooterProps {
    comment: CommentWithLikesAndSaves;
}

const CommentPostFooter = ({  comment }:CommentFooterProps) => {
    return (
        <div className="footer flex items-center justify-between w-full py-2">
            <div className="left flex items-center gap-2">
                <div className="replies flex items-center">
                    {comment.comment_count > 4 && 
                    <>
                        <div className="users flex items-center">
                            {/* Add src attribute to the images as needed */}
                            <img src="" className="bg-red-500 rounded-full w-[25px] border-2 border-zinc-800 h-[25px]" alt="User replies" />
                            <img src="" className="bg-red-500 rounded-full w-[25px] border-2 z-0 border-zinc-800 h-[25px] -translate-x-2" alt="User replies" />
                        </div>
                    </>
                    }
                    <p className="font-semibold text-sm text-purple-500">{comment.comment_count} replies</p>
                </div>
                <p className="text-sm text-zinc-400">{comment.like_count} likes</p>
            </div>
            <div className="right flex items-center">
            <CommentLikeButton isLiked={comment.likedBy?.length>0} postId={comment.id}/>
                <CommentSaveButton postId={comment.id} isSaved={comment.savedBy?.length>0}/>
            </div>
        </div>
    );
};

export default CommentPostFooter;
