"use server"

import { auth } from "@/auth";
import prisma from "@/prisma";

export const GetUserById = async(id:string)=>{
    if(!id) return;
    const user = await prisma.user.findFirst({where: {id:id}});
    return user;
}
export const GetCurrentUser = async()=>{
    const session = await auth();
    if(!session?.user) return;
    const user = await prisma.user.findFirst({where: {id:session.user.id}});
    return user;
}