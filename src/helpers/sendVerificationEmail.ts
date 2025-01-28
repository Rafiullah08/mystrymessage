import {resend} from "@/lib/resend"
import {EmailTemplate} from '../../emails/verificationEmail'
import {ApiResponse} from '@/types/apiResponse'


export async function sendVerificationEmail(success :string, message:string):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Hello world',
            react: EmailTemplate({ userName:'John', message: "Your Otp email verification", otp: "verifyCode" }),
          });
          
          return {success : false , message: "send email faild"}
        
    } catch (error) {
        console.log(error);
        return {success : false , message: "send email faild"}
        
    }
}