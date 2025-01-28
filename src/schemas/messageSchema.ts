import {z} from 'zod'

export const MessageSchema = z.object({
    content : z
    .string()
    .min(10,{message: 'message must be at least 10 characters'})
    .max(300,{message: 'message must be no longer than 300 characters'})
    
})