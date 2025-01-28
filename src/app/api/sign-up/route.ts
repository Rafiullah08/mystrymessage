import dbconnect from "@/lib/dbConnect"
import UserModel from "@/models/User.model"
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"
import { NextRequest } from "next/server"


 export async function POST(request: NextRequest){
dbconnect()
try {
    
   const {userName, email, password} =  await request.json()

 const existingUserWithUserName =  await UserModel.findOne({
            $or: userName || email
      
            })

   // chek existing user with username and email
   if(existingUserWithUserName){
        return Response.json({
            success : false,
            message : "user is already exist with this userName and email"
    },{status:400})
   }
// hashPassword
   const hashPassword = await bcrypt.hash(password,10)

// create otp

const otp = Math.floor(100000 + Math.random() * 900000);

// set otp expiry time
   const otpExpire = new Date()
   otpExpire.setHours(otpExpire.getHours()+ 1)


   const response = await UserModel.create({
    userName,
    email,
    password : hashPassword,
    verifyCode: otp,
    verifyCodeExpiry :otpExpire ,
    isAcceceptingMessage: true,
    message: []
   })

   if(response){
    return Response.json({
        success : true,
        message: "User Signup Successfully",
        data: response
    },{status:200})
   }


} catch (error) {
    console.error("Signup error", error)
     return Response.json({
        success : false,
        message: "User Signup Faild"
    },{status:500})
}


 }