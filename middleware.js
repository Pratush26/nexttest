import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    console.log("Token:", token);
  // If the user is not authenticated, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated, allow the request to proceed
  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard'],
};