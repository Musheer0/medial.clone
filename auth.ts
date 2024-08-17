import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./prisma";
import Google from "next-auth/providers/google";

export const {auth , signIn, signOut, handlers} = NextAuth({
    providers: [
        Google({})
    ],
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    callbacks:{
        session({user,session,token}){
            session.user.id = token.sub as string;
              return session;
        }
    }
})