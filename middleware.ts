import { NextRequest, NextResponse } from "next/server";

export async function middleware(request:NextRequest) {
    const session = request.cookies.get("better-auth.session_token");
    const isAuthPage = 
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith('/auth');
    if(session && isAuthPage){
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        )
    }
    return NextResponse.next();
}
export const config = {
    matcher : ['/', '/auth/:path', "/dashboard/:path"],
}