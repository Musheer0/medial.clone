import { Comment, Post } from '@prisma/client';
import React, { useState } from 'react';
import ResizableTextarea from '../inputs/TextArea';
import { z, ZodError } from 'zod';
import { CreateComment } from '@/libs/post/actions';


interface CommentFormProps {
  post?: Post;
  comment?: Comment;
}

const CommentForm = ({ post, comment }:CommentFormProps) => {
  if (!post && !comment) return null; // Render nothing if neither post nor comment is provided

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const commentText = formData.get('comment')?.toString().trim();

    if (!commentText) {
      setError('Comment cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await CreateComment(post?.id as string, commentText, comment?.id);
      // Optionally clear the textarea or handle success
    } catch (err) {
      if (err instanceof ZodError) {
        setError('Validation failed.');
      } else {
        setError('An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className='flex items-center gap-2 py-3' onSubmit={handleSubmit}>
        <ResizableTextarea height={40} placeholder='Enter Comment' name='comment' bg='900' />
        <button
          type='submit'
          className='bg-purple-500 rounded-xl px-4 h-[40px]'
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
    </>
  );
};

export default CommentForm;
