import { auth } from "@/auth";
import prisma from "@/prisma";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest, {params:{id}}:{params:{id:string}}){
    const session = await auth();
  if(!session?.user?.id) throw new Error("Unautharized");
  try {
    const isSaved =await prisma.postSave.findFirst({
      where:{
        userId: session?.user?.id as string,
        postId: id,

      }
    })
  if(isSaved) return
  const save= await prisma.postSave.create({
    data:{
      userId: session?.user?.id as string,
      postId: id,

    }
    })
    if(save) {
        await prisma.post.update({
            where:{
              id
            },
            data:{
              save_count:{increment:1}
            }
          })
    }
    return Response.json({
        post:id,
       like: save
    })
  } catch (error) {
    return Response.json({error: 'Internal server eroor'},{status:500})
  }
}
export async function DELETE(req:NextRequest, {params:{id}}:{params:{id:string}}){
    const session = await auth();
  if(!session?.user?.id) throw new Error("Unautharized");
  try {
    const save = await prisma.postSave.deleteMany({
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
          save_count:{decrement: save.count}
        }
      })
    return Response.json({
        post:id,
       like: save
    })
  } catch (error) {
    return Response.json({error: 'Internal server eroor'},{status:500})
  }
}