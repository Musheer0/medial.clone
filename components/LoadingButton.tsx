import { LoaderCircle } from 'lucide-react'
import React from 'react'
interface ButtonProps   extends React.ButtonHTMLAttributes<HTMLButtonElement>{
ispending:boolean,
text:string
}
const LoadingButton = ({ispending, text, ...rest}:ButtonProps) => {
  return (
    <button {...rest} >{ispending ? <LoaderCircle className='animate-spin'/>: text}</button>
  )
}

export default LoadingButton