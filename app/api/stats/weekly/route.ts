import { getSession } from "@/app/lib/session";
import { getWeeklyStats } from "@/app/server/stats.service";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const session = await getSession();
        if(!session){
            return NextResponse.json("Unauthorized", {status : 401})
        }
        
        const data = await getWeeklyStats(session.user.id);
        return NextResponse.json(data)
    } catch(error){
        return NextResponse.json("Failed to fetch weekly stats", {status : 500})
    }
}