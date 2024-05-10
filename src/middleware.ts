import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/utils/auth";
import { getRouteInfoByName, isProtectedRoute } from "@/utils/route";

export default async function middleware(req: NextRequest) {
  const isAuth = await isAuthenticated();
  const isProtected = isProtectedRoute(req.nextUrl.pathname);

  const indexRoute = getRouteInfoByName("index");
  const panelRoute = getRouteInfoByName("panel");

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL(indexRoute.href, req.nextUrl));
  }

  if (
    !isProtected &&
    isAuth &&
    !req.nextUrl.pathname.startsWith(panelRoute.href)
  ) {
    return NextResponse.redirect(new URL(panelRoute.href, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
