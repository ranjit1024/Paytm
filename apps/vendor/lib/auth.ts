import page from "@/app/vendor/transaction/page";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

export const authOptions = ({
    providers:[
        GoogleProvider({
            clientId:process.env.Clinet_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    pages:{
        signIn:"/"
    },
    
    secret:process.env.NEXTAUTH_SECRET
})
