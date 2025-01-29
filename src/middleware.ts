
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"



export  async function middleware(request:NextRequest) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  const token =  await getToken({req: request})
  console.log("JSON Web Token", token)
 
  const url = request.nextUrl

if(token && (
    url.pathname.startsWith('/sign-in') ||
    url.pathname.startsWith('/sign-in') 
    
)
){
    return NextResponse.redirect(new URL('/dashboard', request.url))

}



}
 



 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/sign-in',
   '/sign-up',
   '/',
   '/dashboard/:path*'
   
  ],
}