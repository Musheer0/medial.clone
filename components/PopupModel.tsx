import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import React, { PropsWithChildren } from 'react'
import Login from "./Login"
interface Prop extends PropsWithChildren {
 title?:string,
 titleClassName?:string
}
const PopupModel = ({title,titleClassName}:Prop) => {
  return (
<Dialog >
  <DialogTrigger className={titleClassName|| ''}>{title|| 'Open'}</DialogTrigger>
  <DialogContent className="bg-zinc-950 text-zinc-50 border-zinc-900">
    <DialogHeader>
      <DialogTitle>Your Not Logged in</DialogTitle>
      <Login/>
      <DialogDescription>
       Login with an account to continue
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default PopupModel  