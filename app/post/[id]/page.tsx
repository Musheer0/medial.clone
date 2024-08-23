import { auth } from '@/auth';
import SinglePost from '@/components/post-feeds/SinglePost';
import { GetPost } from '@/libs/post/actions';
import { SinglePostFeedType } from '@/type';
import React, { Suspense } from 'react'
interface PostPageProps {
    params: {
      id: string; // Type of the URL parameter
    };
  }
  
  const PostPage = async ({ params :{id}}:PostPageProps) => {
    const session = await auth();
    const post = await GetPost(id) ;

  return (
    <div className='w-full h-full'>
<Suspense fallback="loading">
<SinglePost post={post} session={session?.user }/>
</Suspense>

    </div>
  )
}

export default PostPage