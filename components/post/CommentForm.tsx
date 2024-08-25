import { Comment, Post } from '@prisma/client';
import React, { useState } from 'react';
import ResizableTextarea from '../inputs/TextArea';
import { z, ZodError } from 'zod';
import { CreateComment } from '@/libs/post/actions';
import { useCommentSubmitMutation } from './mutation';
import LoadingButton from '../LoadingButton';


interface CommentFormProps {
  post?: Post;
  comment?: Comment;
}

const CommentForm = ({ post, comment }:CommentFormProps) => {
  if (!post && !comment) return null; // Render nothing if neither post nor comment is provided

  const [error, setError] = useState<string | null>(null);
 const mutaition = useCommentSubmitMutation()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const commentText = formData.get('comment')?.toString().trim();

    if (!commentText) {
      setError('Comment cannot be empty.');
      return;
    }

    setError(null);

    try {
      const props = {
        postId: post?.id as string,   // Assigning the post ID to the key `postId`
        comment: commentText as string,     // Assigning the comment text to the key `commentText`
        commentId: comment?.id as string      // Assigning the comment ID to the key `commentId`
      };
      
      await mutaition.mutate(props)
    
      // Optionally clear the textarea or handle success
    } catch (err) {
      if (err instanceof ZodError) {
        setError('Validation failed.');
      } else {
        setError('An error occurred.');
      }
    } finally {
    }
  };

  return (
    <>
      <form className='flex items-center gap-2 py-3' onSubmit={handleSubmit}>
        <ResizableTextarea height={40} placeholder='Enter Comment' name='comment' bg='900' />
        <LoadingButton
             type='submit'
             className='bg-purple-500 rounded-xl px-4 h-[40px]'
             disabled={mutaition.isPending}
             ispending={mutaition.isPending}
             text='Post'
        />
      </form>
      {error && <p className='text-red-500'>{error}</p>}
    </>
  );
};

export default CommentForm;
