import React from 'react'
interface PostPageProps {
    params: {
      id: string; // Type of the URL parameter
    };
  }
  
  const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  return (
    <div>
        
    </div>
  )
}

export default PostPage