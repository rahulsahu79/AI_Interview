import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isTokenValid(token: string | undefined): boolean {
  if (!token || typeof token !== "string") return false;
  const trimmed = token.trim();
  if (trimmed === "" || trimmed === "undefined" || trimmed === "null") return false;

  const parts = trimmed.split(".");
  if (parts.length !== 3) return false;

  try {
    // Decode base64url payload
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);
    const parsed = JSON.parse(jsonPayload);

    if (parsed.exp && typeof parsed.exp === "number") {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (parsed.exp < nowInSeconds) {
        return false; // Token expired
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;
  const tokenValid = isTokenValid(token);

  // Protect all /interview routes (upload, analyze, instructions, session, report)
  if (pathname.startsWith("/interview")) {
    if (!tokenValid) {
      // If token is missing or expired, redirect to login and wipe invalid cookie
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // If already logged in with a valid session, redirect away from auth pages to upload
  if ((pathname === "/login" || pathname === "/signup") && tokenValid) {
    return NextResponse.redirect(new URL("/interview/upload", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/interview/:path*",
    "/login",
    "/signup"
  ],
};
