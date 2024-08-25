import { auth } from "@/auth";
import prisma from "@/prisma";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest, {params:{id}}:{params:{id:string}}){
    const session = await auth();
  if(!session?.user?.id) throw new Error("Unautharized");
  try {
    const isliked =await prisma.postLike.findFirst({
      where:{
        userId: session?.user?.id as string,
        postId: id,

      }
    })
  if(isliked) return
  const like = await prisma.postLike.create({
    data:{
      userId: session?.user?.id as string,
      postId: id,

    }
    })
    if(like){
      await prisma.post.update({
        where:{
          id
        },
        data:{
          like_count:{increment:1}
        }
      })
    }
    return Response.json({
        post:id,
       like
    })
  } catch (error) {
    return Response.json({error: 'Internal server eroor'},{status:500})
  }
}
export async function DELETE(req:NextRequest, {params:{id}}:{params:{id:string}}){
    const session = await auth();
  if(!session?.user?.id) throw new Error("Unautharized");
  try {
    const like = await prisma.postLike.deleteMany({
      where:{
            userId: session?.user?.id as string,
            postId: id,

        }
    });
    await prisma.post.update({
      where:{
        id
      },
      data:{
        like_count:{decrement: like.count}
      }
    })
    return Response.json({
        post:id,
       like
    })
  } catch (error) {
    return Response.json({error: 'Internal server eroor'},{status:500})
  }
}