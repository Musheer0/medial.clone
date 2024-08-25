import { Prisma, Post, Follow } from "@prisma/client"
import { string } from "zod"
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
  poll:true,
  comments:{
    take:2,
    include:{
      user:{
        select:{
          image:true
        }
      }
    }
  }
} satisfies Prisma.PostInclude
export const UserPostDataInclue = {
  poll:true,
  comments:{
    take:2,
    include:{
      user:{
        select:{
          image:true
        }
      }
    }
  }
} satisfies Prisma.PostInclude
export type SinglePostFeedType = Prisma.PostGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        image: true;
      id:true
      };
    };
    poll: true;
    likedBy: {
      where?: {
        userId: string;
        postId: string;
      };
      
    };
    savedBy: {
      where?: {
        userId: string;
        postId: string;
      };
      
    };
    comments:{
      take:2,
      include:{
        user:{
          select:{
            image:true
          }
        }
      }
    }
  };
}>;


export type PostFeedType = Prisma.PostGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        image: true;
        id:true
      };
    };
    poll: true;
    likedBy: {
      where?: {
        userId: string;
        postId: string;
      };
    };
    savedBy: {
      where?: {
        userId: string;
        postId: string;
      };
      
    };
    comments:{
      take:2,
      include:{
        user:{
          select:{
            image:true
          }
        }
      }
    }
  };
}>;


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
export type CommentWithLikesAndSaves = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        image: true;
        id: true;
      };
    };
    likedBy: {
      where: {
        userId: string;
        postId: string;
      };
    };
    savedBy: {
      where: {
        userId: string;
        postId: string;
      };
    };
  };
}>;
export interface CommentPage {
  nextCursor : any,
  comments: CommentWithLikesAndSaves[],
}
export interface CreateCommentArgs {
  postId: string;
  comment: string;
  parent?: string;
}
