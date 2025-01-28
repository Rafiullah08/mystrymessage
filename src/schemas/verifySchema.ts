import {z} from 'zod'

export const verificationSchema = z.object({
    code : z.string().length(6, 'verification code must be at least 6 digits')
})