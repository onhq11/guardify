import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/utils/auth";
import { isProtectedRoute } from "@/utils/route";
import { routes } from "@/config/routes/routes";
import { protectedRoutes } from "@/config/routes/protectedRoutes";

export default async function middleware(req: NextRequest) {
  const isAuth = await isAuthenticated();
  const isProtected = isProtectedRoute(req.nextUrl.pathname);

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL(routes.index?.href, req.nextUrl));
  }

  if (
    !isProtected &&
    isAuth &&
    !req.nextUrl.pathname.startsWith(protectedRoutes.panel?.href)
  ) {
    return NextResponse.redirect(
      new URL(protectedRoutes.panel?.href, req.nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
