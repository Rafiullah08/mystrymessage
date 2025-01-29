import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from 'bcryptjs'




export const outhOption: NextAuthOptions = {
providers : [
    CredentialsProvider({
       name: 'Credentials',
       credentials : {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" }
       },
       async authorize(credentials:any): Promise<any>{
            await dbconnect()

            try {

              const user =  await UserModel.find({
                    $or : [
                        {email : credentials?.email}
                    ]
                })

                if(!user){
                    throw new Error("User not Exist Please Signup")
                }

                const isPasswordCorrect = bcrypt.compare(user.password, credentials?.password)

                if(!isPasswordCorrect){
                    throw new Error('password is invalid')
                }

                return user
                
            } catch (err: any) {
                 throw new Error(err) 
            }

       }
    })
],
callbacks : {

    async jwt({token ,user, }) {
        if(user){
            token._id = user._id?.toString()
            token.isVerified = user.isVerified
            token.isAcceptingMessage = user.isAcceptingMessage
            token.email = user.email
        }

   return token
   },
       async session({session, token }) {
        if(token){
            session.user._id = token._id?.toString()
            // session.isVerified = token.isVerified
            // session.isAcceptingMessage = token.isAcceptingMessage
            // session.email = token.email
        }
       return session
       },

      

           },
           
pages: {
    signIn: '/sign-in',
        },

session: {
    strategy : "jwt"
         },
secret : process.env.NEXTAUTH_SECRET

}