import exp from 'constants'
import { emit } from 'process'
import * as z from 'zod'

export const requiredstring = z.string().min(3,{message: 'Field cannot be emply'})
export const PostZod = z.object({
    caption : requiredstring.max(600, {message: '200 words maximum'})
})
export const PollSchema = z.object({
    title: requiredstring.max(120,{message:'maximum 120 words allowed'}),
    options:z.array(requiredstring).min(2,{message:'minimum 2 options are requires'}).max(5, {'message':'max 5 options allowed'})
})
export enum PostType{
    "post", "poll"
}

