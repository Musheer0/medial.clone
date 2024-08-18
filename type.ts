import { Prisma, Post } from "@prisma/client"

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

export type PostFeedType = Prisma.PostGetPayload<{
    include : typeof PostDataInclue
}>

export interface PostsPage {
  nextCursor : any,
  posts : PostFeedType[],
}