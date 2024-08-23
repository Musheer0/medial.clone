"use server"

import { auth } from "@/auth";
import prisma from "@/prisma";

export const GetUserById = async(id:string)=>{
    const session = await auth()
    if(!id) return;
    const user = await prisma.user.findFirst({where: {id:id},include:{
        follwer:{
            where:{
                followerId: id,
                followingId: session?.user?.id
            }
        }
    }});
    return user;
}
export const GetCurrentUser = async()=>{
    const session = await auth();
    if(!session?.user) return {error: 'Unauthorized'}
    const user = await prisma.user.findFirst({where: {id:session.user.id}});
    return user
}
export const GetTopUsers = async()=>{
    const session = await auth()
    if(session){
        const user = await prisma.user.findMany({
            take: 20,
            orderBy: {follower_count:"asc"},
            select: {
                name:true,
                image:true,
                id:true
            },
        });
         return user
    }
    else{
        const user = await prisma.user.findMany({
            take: 20,
            orderBy: {follower_count:"asc"},
            select: {
                name:true,
                image:true,
                id:true
            }
        });
         return user
    }
}