"use client"
import React, { FormEvent, FormEventHandler, useState } from 'react'
import ResizableTextarea from '../inputs/TextArea'
import {  z } from 'zod'
import { CreatePost } from '@/libs/post/actions'
import LoadingButton from '../LoadingButton'
import { FaRegImage } from "react-icons/fa6";
import { CgClose } from 'react-icons/cg'
import { PostZod } from '@/libs/post/validation'
import { CiWarning } from 'react-icons/ci'
const PostForm = () => {
   const [ispending, setIspendtion] = useState(false)
   const [caption,setCaption]= useState<boolean|string>(true);
   const [error, setError] = useState<null|string>(null)
   const handlesubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
      const formData = new FormData(e.currentTarget);
      //@ts-ignore
      const entries: z.infer<typeof PostZod> = Object.fromEntries(formData.entries());
      try {
        PostZod.parse(entries);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError('caption cannot be empty')
          return;
        }
        setError('caption cannot be empty')
        return;
      }
    setIspendtion(true);
    
    await CreatePost(entries).then((res)=>{
      alert(res.success|| res.error)
    })
    setIspendtion(false)
    setError(null)
  
   }
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(Array.from(fileList));
    }
  };

    const [files, setFiles] = useState<File[]>([])
  return (
  <form action="" className='w-full' onSubmit={handlesubmit}>
      <ResizableTextarea placeholder='What&apos;s on your mind?' name='caption'/>
     {error && 
      <p className='text-xs text-red-500 bg-red-500/15 my-1 py-1 px-1 rounded-lg flex items-center gap-1'><CiWarning/> {error }</p>
     }

<div className='flex justify-between py-2 border-zinc-800 items-center w-full border-t-2'>
<div className="left flex items-center ">
<label htmlFor="media">
          <div className='text-xl text-zinc-700 p-2 w-fit rounded-xl hover:bg-zinc-800'>
          <FaRegImage />

          </div>
          <input
            multiple
            accept="image/png, image/jpeg"
            type="file"
            hidden
            name="media"
            id="media"
            onChange={handleFileChange}
          />
        </label>
        <div className="poll">
        <div className='text-xl text-zinc-700 p-2 w-fit rounded-xl hover:bg-zinc-800'>


          </div>
        </div>
</div>
<LoadingButton   className='bg-purple-400  px-8 capitalize py-1 rounded-full' text='Post' ispending={ispending} type='submit'/ >
  </div>   
      <div className="footer">
      <div className="preview-images gap-2 flex flex-wrap">
          {files.map((file, index) => (
          <>
          {file.type.startsWith("image") && 
              <div key={index} className='relative'>
                <button type='button' onClick={()=>{
             setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));

                }} className='absolute top-1 shadow-md bg-red-600 rounded-full p-1 text-white right-1'><CgClose/></button>
              <img className='max-h-[200px] rounded-xl object-contain' src={URL.createObjectURL(file)} alt="" />
                         </div>
          }
          {file.type.startsWith("video") && 
              <div key={index} className='relative'>
                <button onClick={()=>{alert(1)}} className='absolute top-1 bg-red-600 rounded-full p-1 text-white right-1'><CgClose/></button>
              <video className='max-h-[200px] rounded-xl object-contain' controls src={URL.createObjectURL(file)} />
                         </div>
          }
          </>
          ))}
        </div>
      </div>
  </form>
  )
}

export default PostForm