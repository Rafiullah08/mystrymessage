import NextAuth from "next-auth";
import { outhOption } from "./option";


const handler = NextAuth(outhOption)


export {handler as GET, handler as POST}