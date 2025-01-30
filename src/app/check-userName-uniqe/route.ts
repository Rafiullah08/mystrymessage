import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from "zod"

import {userNameValidation} from "@/schemas/signUpSchema"


const userNameQuerySchema = z.object({
    userName : userNameValidation
})


export async function GET(request: Request){

    dbconnect()
   try {
        
   const {serachParams} = new URL(request.url)

   const queryParm = {
    username : serachParams.get('username')
   }

   //validate with zod
   const result = userNameQuerySchema.safeParse(queryParm)
   console.log(result,"result");
   
        if(!result.success){
        const userNamesError = result.error.format().userName?._errors || []
        return Response.json({
            success : false,
            message : "Invalid Query Parameters"
        },{status:400})

    const { userName} = result.data
    const response = UserModel.findOne({userName})


}


    } catch (error) {
        console.log("Error checking userName", error);
        return Response.json({
            success : false,
            message : "error checking username"
        },
        {status: 500})
    }
}