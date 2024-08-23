"use server"
import { auth } from "@/auth"
import prisma from "@/prisma";
import { z } from "zod";
import { PollSchema, PostZod } from "../validation";
import { Post } from "@prisma/client";

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
  //@ts-ignore
if(!session?.user?.id) throw new Error("Access denied");
try{
  const {title, options}= PollSchema.parse(data)
  //@ts-ignore
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
export const DeletePost = async(postId:string)=>{
  if(!postId) return;
  const session = await auth();
  if(!session?.user) throw new Error("Access denied")
  const Post = await prisma.post.findFirst({where: {id:postId}}) as Post
  if(Post.userId!==session.user.id) throw new Error("Access denied")
try{
   await prisma.post.delete({where: {id:Post.id,userId: session.user.id }});
  
  return {"success": postId};
}
catch{
  return {error:"error deleting post"}
}

}
export const GetPost = async (postId: string) => {
  if (!postId) {
    return { error: 'Post ID is required' };
  }
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            // Add any other fields or relations as needed
          },
        },
        poll: true,
      },
    });

    if (post) {
      return post;
    } else {
      return { error: 'No post found' };
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    return { error: 'Internal server error' };
  }
};
export const CreateComment = async(postid:string,comment:string, parent?:string)=>{
  if(!comment) return;
  const session = await auth()
  if(!session?.user)   //@ts-ignore
  throw new Error("error adding comment ")
 try{
  const Newcomment = await prisma.comment.create({
    data:{
      comment,
      parentId:parent || null,
      postId: postid,
      userId:session.user.id as string,
    }
  })
  return Newcomment
 }
 catch(e:any){
  //@ts-ignore
 throw new Error("error adding comment ")
 }
}
export const DeleteComment =async (commentid:string)=>{
  if(!commentid) return;
  const session = await auth()
  if(!session?.user)   //@ts-ignore
  throw new Error("error adding comment ")
  try {
     await prisma.comment.delete({
      where:{
        id: commentid,
        userId: session.user.id
      }
     })
     return{id: commentid}
  } catch (error) {
      //@ts-ignore
 throw new Error("error adding comment ")
  }
}