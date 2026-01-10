import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "ACCESS_TOKEN";

const AUTH_ROUTES = ["/signin", "/signup"];
const PROTECTED_PREFIXES = ["/dashboard"];

const isAuthRoute = (pathname: string) => AUTH_ROUTES.includes(pathname);
const isProtectedRoute = (pathname: string) =>
  PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const isLoggedIn = Boolean(token);

  if (isAuthRoute(pathname) && isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/dashboard/:path*"],
};
