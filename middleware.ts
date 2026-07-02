import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("better-auth.session_token");
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/" || pathname.startsWith("/auth");
  const isProtectedPage = pathname.startsWith("/dashboard");

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
