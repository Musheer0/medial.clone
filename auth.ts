import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./prisma";

export const {auth , signIn, signOut, handlers} = NextAuth({
    providers: [],
    adapter: PrismaAdapter(prisma)
})