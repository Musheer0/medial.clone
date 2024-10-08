import { auth } from "@/auth";
import prisma from "@/prisma";
import { pagesize } from "@/type";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest, {params:{id}}:{params:{id:string}}){
    const cursor = req.nextUrl.searchParams.get("cursor");
  try {
    const session = await auth()
    const comments = await prisma.comment.findMany({
        where: {
            postId: id,
            parentId: null,
            parent: null
        },
        take: pagesize+1,
       include: {
            replies:{take:10, },
            user: {select:{
                username:true,
                image:true,
                id:true,
                name: true
            }},
            likedBy:session?.user ? 
            {
                where:{
                    userId: session.user.id
                },
                take:1
            }
            :false,
            savedBy:session?.user ? 
            {
                where:{
                    userId: session.user.id
                },
                take:1
            }
            :false,
        },
        orderBy:{createdAt:'desc'},
        cursor: cursor? {id:cursor} : undefined
    });
    const nextCursor =  comments.length>pagesize ? comments[pagesize].id: null;
    return Response.json({
        nextCursor,
       comments: comments.slice(0,pagesize).map((e)=>{
        const comment = {...e}
        for(const key in comment) {
         if(key.endsWith('count')){
             (comment as any)[key] = Number( (comment as any)[key])
         }
        }
        return comment
         }),
    })
  } catch (error) {
    console.log(error)
     return Response.json({error: 'Internal Server Error'}, {status:500})
  }
}
