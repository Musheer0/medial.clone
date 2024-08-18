import prisma from "@/prisma";
import { PostDataInclue, PostsPage } from "@/type";
import { NextRequest } from "next/server";

export async function GET (req:NextRequest){
    const cursor = req.nextUrl.searchParams.get("cursor")|| undefined;
    const PageSize = 10
    try{
         const posts = await prisma.post.findMany({
            include: PostDataInclue,
            orderBy: {createdAt: 'desc'},
            take:PageSize+1,
            cursor: cursor? {id: cursor} : undefined
         }); 
         const nextCursor = posts.length>PageSize ? posts[PageSize].id : null;
         const data:PostsPage ={
            posts: posts.slice(0,PageSize),
            nextCursor 
         }
         return Response.json(data)
    }
    catch(e){
        console.log(e);
        return Response.json({error:"Internal Server error"},{status: 500})
    }
}