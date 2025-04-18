"use server"
import db from '@repo/prisma/clinet'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { stringify } from 'querystring';
import { send } from 'process';

export async function  createOnRampTransaction(amount:number, provider:string){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const token = String(Math.random())
    if(!userId){
        return {
            message:"User not logged in"
        }
    }

    try{

        await db.onRampTransaction.create({
            data:{
                status:'Pending',
                amount:amount * 100,
                provider:provider,
                userId:userId,
                startTime:new Date(),
                token:token,
                transfer:"deposite"
            }
        })
        return token;
    }
    catch(e){
        return "Failed"
    }

}