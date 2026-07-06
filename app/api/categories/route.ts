
import { CATEGORIES } from "@/app/lib/Categories";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(CATEGORIES)
}