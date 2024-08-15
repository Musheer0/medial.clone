import React from 'react'
import { FcGoogle } from "react-icons/fc";

const LoginWithGoogle = () => {
  return (
    <button className='flex items-center gap-2 bg-zinc-50 px-4 py-2 rounded-full text-zinc-950'>
     <FcGoogle size={30} />
        <span>Continue with Google</span>
    </button>
  )
}

export default LoginWithGoogle