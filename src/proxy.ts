import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "ACCESS_TOKEN";

const AUTH_ROUTES = ["/signin", "/signup"];
const PROTECTED_PREFIXES = ["/dashboard"];

const isAuthRoute = (pathname: string) => AUTH_ROUTES.includes(pathname);
const isHomeRoute = (pathname: string) => pathname === "/";
const isProtectedRoute = (pathname: string) =>
  PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const isLoggedIn = Boolean(token);

  if (isLoggedIn && (isAuthRoute(pathname) || isHomeRoute(pathname))) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (!isLoggedIn && isProtectedRoute(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard/:path*"],
};
