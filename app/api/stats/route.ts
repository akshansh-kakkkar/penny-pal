import { getSession } from "@/app/lib/session";
import { getDashboardStats } from "@/app/server/stats.service";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const session = await getSession();
        if(!session){
            return NextResponse.json({message : "Unauthorized"}, {status : 401})
        }
        const stats = await getDashboardStats(session.user.id)
        return NextResponse.json(stats)
    }catch(error){
        return NextResponse.json({error : "Failed fetch stats."}, {status : 500})
    }
}