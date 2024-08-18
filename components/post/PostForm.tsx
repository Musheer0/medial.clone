"use client"
import React, { useState } from 'react'
import { TabsTransitionPanel } from '../motion-premitive/Tabs'
import ResizableTextarea from '../inputs/TextArea'
import { TabTransitonPanelProps } from '@/type'
import { FaRegImage } from "react-icons/fa6";
import { CgClose } from 'react-icons/cg'
import LoadingButton from '../LoadingButton'
import CreatePostForm from './CreatePostForm'
import CreatePollForm from './CreatePollForm'



function CreatePostTrigger(){
  return <div>post</div>
}
function CreatePollTrigger(){
  return <div>poll</div>
}
const pages:TabTransitonPanelProps[] = [
  {
    Trigger: CreatePostTrigger,
    Component: CreatePostForm
  },
  {
    Trigger: CreatePollTrigger,
    Component: CreatePollForm
  },
]
const PostForm = () => {
  return (
     <TabsTransitionPanel pages={pages}/>
  )
}

export default PostForm