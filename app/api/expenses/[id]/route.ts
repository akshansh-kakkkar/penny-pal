import { getSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export default function GET(req : NextRequest, {params} : {params : Promise<{id : string}>}){
    const session = getSession();
    if(!session){
        return NextResponse.json({message : "Unauthorized"}, {status : 401})
    }
}