import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { title } from "process";

export async function GET() {
    try{
        const users = await prisma.User.findMany({
            id : true, 
            name : true
        })
        return NextResponse.json(users)
    }catch(error){
        return NextResponse.json({error : "Something went wrong while fetching the users"}, {status : 500})
    }
}