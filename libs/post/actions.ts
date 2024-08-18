"use server"

import { auth } from "@/auth"
import prisma from "@/prisma";
import { z } from "zod";
import { PollSchema, PostZod } from "../validation";
import { PostFeedType } from "@/type";

type CreatePostProps = z.infer<typeof PostZod>;

export const CreatePost = async (data: CreatePostProps) => {
  // Authenticate user
  const session = await auth();

  // Validate data
  try {
    PostZod.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid data: ' + error.errors.map(e => e.message).join(', ') };
    }
    return { error: 'Unexpected validation error' };
  }

  // Check session
  if (!session?.user?.id) {
    return { error: 'Access denied' };
  }

  try {
    // Create a new post in the database
    const post =  await prisma.post.create({
      data: {
        caption: data.caption,
        userId: session.user.id,
        type: 'post',
      },
      include: {
        poll:true,
        user: {
          select: {
            id:true,
            name: true,
            image: true
          }
        }
      }
    });
    return { success:post};
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Error posting' };
  }
};
export const CreatePoll = async(data:z.infer<typeof PollSchema>)=>{
  const session = await auth();
if(!session?.user?.id) throw new Error("Access denied");
try{
  const {title, options}= PollSchema.parse(data)
  if(!title || !options) throw new Error("Invalid Data");
const score_board = options.map((e)=>{
return {
  option: e,
  vote: 0
}
})
try{
  const post = await prisma.post.create({
    data:{
      userId: session.user.id,
      type : "poll",
      caption:  title,

    }
  })
   await prisma.poll.create({
    data:{
      userId: session.user.id,
      options: options,
     score_board: JSON.stringify(score_board),
      postId: post.id
    }
  });
  const poll = await prisma.post.findFirst({where:{id: post.id},
      include: {
    
        poll:true,
    user: {
      select: {
        id:true,
        name: true,
        image: true
      }
    },
    
  }})
  return {success: poll}
}
catch{
  return {error: 'somthing went wrong'}
}
}
catch{
  return {'error': 'invalid entry'}
}

}
export const DeletePost = async(Post:PostFeedType)=>{
  const session = await auth();
  if(!session?.user) throw new Error("Access denied")
  if(Post.user.id!==session.user.id) throw new Error("Access denied")
try{
  const deleted_post = await prisma.post.delete({where: {id:Post.id,userId: session.user.id }});
  
  return {"success": deleted_post||Post};
}
catch{
  return {error:"error deleting post"}
}

}