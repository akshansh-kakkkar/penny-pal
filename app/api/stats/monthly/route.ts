import { getSession } from "@/app/lib/session";
import { getMonthlyStats } from "@/app/server/stats.service";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const session=await getSession();
        if(!session){
            return NextResponse.json({message : "Unauthorized"}, {status : 401})
        }
        const data = await getMonthlyStats(session.user.id);
        return NextResponse.json(data)
    }catch(error){
        return NextResponse.json({message : "Failed to fetch Monthly Stats"}, {status : 500})
    }
}