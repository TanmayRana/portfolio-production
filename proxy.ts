import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/admin/login");

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/admin/home", req.url));
    }
    
    // Optional: redirect /admin to /admin/home if you want
    if (req.nextUrl.pathname === "/admin" && isAuth) {
      return NextResponse.redirect(new URL("/admin/home", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Protect all /admin routes except /admin/login
        if (
          req.nextUrl.pathname.startsWith("/admin") &&
          !req.nextUrl.pathname.startsWith("/admin/login")
        ) {
          return token?.email === process.env.ADMIN_EMAIL;
        }
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
