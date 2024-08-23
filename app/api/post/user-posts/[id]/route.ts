import prisma from "@/prisma";
import { error } from "console";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest, {params:{id}}:{params:{id:string}}){
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const PageSize = 10
  if(!id ) {
    console.log('error no id')
    return ;
  }
    try {
        const posts = await prisma.post.findMany({where: {
            userId: id 
        },
       include:{
        poll: true
       },
       take: PageSize+1,
       cursor: cursor? {id:cursor}:undefined
    });
    const nextCursor = posts.length>PageSize? posts[PageSize].id : null
    return Response.json({
        nextCursor,
        posts:posts.slice(0,PageSize).map((e)=>{
            const post =e;
            for(const key in post){
                if(key.endsWith('count'))
                    (post as any)[key] = Number((post as any)[key]) 
            }
            return post;
        })
    })
    } catch (error) {
        console.log(error);
        return Response.json({error:"Internal Server error"},{status: 500})
    }
}