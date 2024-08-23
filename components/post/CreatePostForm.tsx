"use client "
import React, { FormEvent, FormEventHandler, useState } from 'react'
import ResizableTextarea from '../inputs/TextArea'
import { FaRegImage } from "react-icons/fa6";
import { CgClose } from 'react-icons/cg'
import LoadingButton from '../LoadingButton'
import Error from '../Error';
import { object, z } from 'zod';
import { CreatePost } from '@/libs/post/actions';
import {PostZod} from '@/libs/validation'
import { useSubmitPostMutation } from './mutation';
const CreatePostForm = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading,setIsloading] = useState(false)
    const [error,setError]= useState<string|null>(null)
   const mutation = useSubmitPostMutation();
    const handleFileChange =async (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxFileSizeMB = 12; // Maximum file size in MB
        const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024; // Convert MB to bytes
        var fileList = Array.from(event.target.files||[]);
       
        if (fileList) {
  
            if( files.length>4) {
                alert("maximum 4 attachments allowed")
                return ;
            }
            if(fileList.length>4 ) alert("maximum 4 attachments allowed")
            setFiles([...files, ...Array.from(fileList).slice(0, 4)]);
        }
      };
      const handleSubmit =async (e:React.FormEvent|  React.MouseEvent<HTMLButtonElement, MouseEvent> )=>{
         e.preventDefault();
         setIsloading(true);
         setError(null);
         const form = e.target as HTMLFormElement;
         const formData = new FormData(form);
         const caption = formData.get('caption') as string;
         
         const post_data:z.infer<typeof PostZod> ={
            caption
         }
         if(!caption) {
            setIsloading(false)
            return;
         }
         if(caption.length <4){
            setIsloading(false)
            setError("Caption is too short")
            return;
         }
         try{
          mutation.mutate(post_data,{
              onError : (e)=>{
                console.log(e)
                setError(e.message)
              },
              onSuccess:()=>{
                setIsloading(false)
             

              }
            })
         }
         catch(e){
          console.log(e,'post')
            setError("Somthing went wrong f")
            setIsloading(false)

         }
      }
  return (
     <div>
      <form onSubmit={handleSubmit} className='flex flex-col overflow-auto gap-2'>
        <ResizableTextarea   name='caption' placeholder='What&apos;s in your mind?'/>
      {error &&        <Error msg={error}/>      }
        <div className='flex justify-between w-full'>
        <label htmlFor="media">
            <div className='text-xl text-zinc-700 p-2 w-fit rounded-xl hover:bg-zinc-800'>
            <FaRegImage />
  
            </div>
            <input
              multiple
              accept="image/png, image/jpeg, video/mp4, video/avi"
              type="file"
              hidden
              name="media"
              id="media"
              onChange={handleFileChange}
            />
          </label>
            <LoadingButton disabled={mutation.isPending}  text='Post' ispending={mutation.isPending}  className='w-full flex items-center justify-center px-6 sm:w-fit bg-purple-500 py-2 rounded-lg'>Post</LoadingButton>
        </div>
          <div className="footer">
        <div className="preview-images gap-2 flex overflow-auto">
            {files.map((file, index) => (
            <>
            {file.type.startsWith("image") && 
                <div key={index} className='relative flex-shrink-0'>
                  <button type='button' onClick={()=>{
               setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  
                  }} className='absolute top-1 shadow-md bg-red-600 rounded-full p-1 text-white right-1'><CgClose/></button>
                <img className='max-h-[200px] rounded-xl object-contain' src={URL.createObjectURL(file)} alt="" />
                           </div>
            }
            {file.type.startsWith("video") && 
                <div key={index} className='relative flex-shrink-0'>
                  <button type='button' onClick={()=>{
               setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  
                  }} className='absolute z-10 top-1 bg-red-600 rounded-full p-1 text-white right-1'><CgClose/></button>
                <video className='max-h-[200px] rounded-xl object-contain' controls src={URL.createObjectURL(file)} />
                           </div>
            }
            </>
            ))}
          </div>
        </div>
        </form>
    </div>
  )
}

export default CreatePostForm