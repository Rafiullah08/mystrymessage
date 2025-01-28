import {z} from "zod"

export const userNameValidation = z
.string()
.min(2, "UserName must be atleast 2 characters")
.max(12, "UserName must be no more than 12 characters")
.regex(/^[a-zA-Z\s]+$/, "UserName must not contain special characters")


export const SignUpSchema = z.object({
userName : userNameValidation,
email : z.string().email({message: 'Invalid email address'}),
password : z.string().min(2, {message: 'password must be at least 6 characters'}).max(10,{message: 'password must not be more than 10 characters'})

})