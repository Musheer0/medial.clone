import { auth } from "@/auth";
import prisma from "@/prisma";
import { PostDataInclue, PostsPage } from "@/type";
import { NextRequest } from "next/server";

export async function GET (req:NextRequest){
    const cursor = req.nextUrl.searchParams.get("cursor")|| undefined;
    const PageSize = 10;
    const session = await auth();
    try{
         const posts = await prisma.post.findMany({
          include:{
            user: true,
            likedBy: session?.user? {
              where:{
                userId: session.user.id
              },
             take:1
            }:false,
            savedBy:session?.user? {
              where:{
                userId: session.user.id
              },
             take:1
            }:false,
            comments:{
              take:2,
              select:{
                user:{
                  select:{
                    image:true
                  }
                },
              createdAt: true
              },
            
            }
          },
            orderBy: {createdAt: 'desc'},
            take:PageSize+1,
            cursor: cursor? {id: cursor} : undefined
         }); 
         const nextCursor = posts.length>PageSize ? posts[PageSize].id : null;
         const data:PostsPage ={
            posts: posts.slice(0,PageSize).map((e)=>{
           const post = {...e}
           for(const key in post) {
            if(key.endsWith('count')){
                (post as any)[key] = Number( (post as any)[key])
            }
            
           }
           for (let i = 0; i < post.comments.length; i++) {
            const comment:any = post.comments[i];
            for (const key in comment) {
              if (key.endsWith('count')) {
                comment[key] = Number(comment[key]);
              }
            }
          }
           return post
            }),
            nextCursor 
         }
         console.log(data)
         return Response.json(data)
    }
    catch(e){
        console.log(e);
        return Response.json({error:"Internal Server error"},{status: 500})
    }
}