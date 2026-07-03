
import { CATEGORIES } from "@/app/lib/Categories";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(CATEGORIES)
}