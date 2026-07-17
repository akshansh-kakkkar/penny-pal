import { getCategories } from "@/app/server/category.service";
import { NextResponse } from "next/server";

export async function GET() {
    const categories =await getCategories();
    return NextResponse.json(categories);
}