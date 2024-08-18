"use client"
import { PollSchema } from '@/libs/validation';
import React, { InputHTMLAttributes, useState } from 'react';
import { set, z } from 'zod';
import Error from '../Error';
import LoadingButton from '../LoadingButton';
import { useTopLoaderStore } from '@/libs/global_states';
import ResizableTextarea from '../inputs/TextArea';
import { useSubmitPollMutation } from './mutation';
interface AddOptionProps extends InputHTMLAttributes<HTMLInputElement> {
    index: number; // Correct type for index
  }
const CreatePollForm = () => {
    const{inc}= useTopLoaderStore()
    const[options,setOptions] = useState<string[]>(["option-1","option-2"])
    const [error,setError]= useState<string|null>(null)
    const [isLoading, setIsloading]= useState(false)
    const [title,setTittle]= useState("")
    const mutation = useSubmitPollMutation()
    const handleSubmit = async()=>{
        inc(20)
        setError(null)
        setIsloading(true)
      const data:z.infer<typeof PollSchema> = {
        title,
        options
      }
      if(!title || title.length<4) {
        setError("caption is too short");
        setIsloading(false)

        return;
      }
      if(options.length<2) {
        setError("atleast two options required");
        setIsloading(false)
       
        return;
      }

      mutation.mutate(data,{

      })
      setIsloading(false)
      setError(null)

    }
    const AddOption = ({ index, ...props }: AddOptionProps) => {
        const [optionval,setOptionval]= useState(`option-${index+1}`)
        
        return     <form onSubmit={(e)=>{e.preventDefault()}} action="" className="otpion w-full bg-purple-600/15 text-purple-400 py-2 px-3 rounded-lg">
        <input  onChange={(e)=>{
            
            setOptionval(e.currentTarget.value)
            options[index] = e.currentTarget.value|| `option-${index+1}`
            setOptions(options)
        }}  {...props} type="text" className='bg-transparent flex-1 w-full text-purple-400 focus:outline-none' placeholder={ `option-${index+1}`} />
        </form>
      };
    const [optionElement,setOptionElements] = useState([AddOption, AddOption])
 

  return (
 <>
       <div className="inputs flex items-center flex-col sm:flex-row">
       <ResizableTextarea name='title'  onChange={setTittle}  placeholder='Poll Caption' />
       </div>
         <div className="otptions py-2 flex flex-col gap-2">
         {optionElement.map((Element,i)=>{
                return <Element key={i} index={i}  name={`option-${i}`}/>
               })}
               {error && <Error msg={error as string}/>}
 <div className="bottom flex-col sm:flex-row gap-2 flex justify-between">
 {optionElement.length<5 && 
            <button onClick={()=>{
                if(optionElement.length<5)  setOptionElements([...optionElement,AddOption])
             }} type='button' disabled={optionElement.length>4} className=' flex-1 bg-zinc-800 px-4 py-2 rounded-lg w-full text-sm sm:w-fit'>Add Option</button>
           }
               <LoadingButton disabled={mutation.isPending}  text='Post' ispending={mutation.isPending} onClick={handleSubmit} className='w-full flex items-center justify-center flex-1 sm:w-fit bg-purple-500 py-2 rounded-lg'>Post</LoadingButton>
 </div>

         </div>
 </>
  )
}

export default CreatePollForm