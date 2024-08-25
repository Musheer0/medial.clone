import { CommentWithLikesAndSaves, SmallUserDataSelect } from '@/type'
import React from 'react'
import Header from '../post-feeds/PostUserInfo'
import CommentPostFooter from './CommentFooter'

interface CommentProps{
    comment:CommentWithLikesAndSaves
}

const Comment:React.FC<CommentProps> = ({comment}) => {
  return (
    <div className=' border-b border-zinc-900 py-2'>
           <Header user={comment.user as SmallUserDataSelect} createdAt={comment.createdAt}/>
           <div className='p-1 whitespace-pre-line'>
            {comment.comment}
           </div>
           <CommentPostFooter comment={comment}/>
     </div>
  )
}

export default Comment