import { NextRequest, NextResponse } from "next/server";
import app from "./db";

export async function middleware(request: NextRequest) {
  console.log(`[middleware] ${request.method} ${request.url}`);
  const isLoggedIn = await app.usersCollection.isAuthenticated();
  console.log(isLoggedIn);
  if (!request.nextUrl.pathname.startsWith("/admin")) return;
  if (
    request.nextUrl.pathname &&
    request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
