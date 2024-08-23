import { Prisma, Post, Follow } from "@prisma/client"
export const pagesize = 10
export interface TabTransitonPanelProps{
    Trigger :React.Component|any,
    Component:React.Component|any
}
export const PostDataInclue = {
  user: {
    select:{
        name: true,
        image: true,
        id: true
    }
  },
  poll:true
} satisfies Prisma.PostInclude

export const SinglePostDataInclude = {
  user: {
    select:{
      name: true,
      image:true,
      id:true
      //todo select followerinfo 
    }
  },
  poll:true
} satisfies Prisma.PostInclude

export type SinglePostFeedType = Prisma.PostGetPayload<{
  include : typeof SinglePostDataInclude
}>
export type PostFeedType = Prisma.PostGetPayload<{
    include : typeof PostDataInclue
}>

export interface PostsPage {
  nextCursor : any,
  posts : PostFeedType[],
}
export interface SmallUserDataSelect{
   name: string,
   id:string,
   image:string
} 
export interface FollowerInfo{
  count : number,
  isFollowing?:boolean
}
export type UserWithFollower = Prisma.UserGetPayload<{
  include: {
    follwer: {
      where: {
        followerId: string | undefined;
        followingId: string;
      };
    };
  };
}>;

export type Comment ={
  comment:string,
}