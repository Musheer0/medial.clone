import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import useUserStore from "@/libs/user/useUserStore";
import { PostFeedType } from "@/type";
import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import DeletePostButton from "../post/DeletePostButton";

const PostDropDown = ({post, deleting}:{post:PostFeedType,deleting:any}) => {
  
  const {user}= useUserStore()
  if(!user) return <></>
  return (
<DropdownMenu>
  <DropdownMenuTrigger><BsThreeDotsVertical/></DropdownMenuTrigger>
  <DropdownMenuContent>

    <DropdownMenuItem>Author info</DropdownMenuItem>
    <DropdownMenuItem>Report</DropdownMenuItem>
    <DropdownMenuItem>Block User</DropdownMenuItem>
    {post.userId===user.id&& 
    <DeletePostButton post={post} className="" deleteState={deleting} >
            <DropdownMenuItem>Delete</DropdownMenuItem>

    </DeletePostButton>
    }
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default PostDropDown 