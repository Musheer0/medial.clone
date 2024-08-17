import * as z from 'zod'

export const requiredstring = z.string().min(3,{message: 'Field cannot be emply'})
export const PostZod = z.object({
    caption : requiredstring.max(300, {message: '200 words maximum'})
})