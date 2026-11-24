"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Loader2, LogOut } from "lucide-react";

interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  full_name?: string | null;
}

function validateJwtToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== "string") return false;
  const trimmed = token.trim();
  if (
    trimmed === "" ||
    trimmed === "undefined" ||
    trimmed === "null" ||
    trimmed === "false"
  ) {
    return false;
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) return false;

  try {
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonPayload);

    if (parsed.exp && typeof parsed.exp === "number") {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (parsed.exp < nowInSeconds) {
        return false; // Token is expired
      }
    }
    return true;
  } catch {
    return false;
  }
}

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : null;
    };

    const tokenFromCookie = getCookie("auth_token");
    const tokenFromStorage =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

    const candidateToken = tokenFromCookie || tokenFromStorage;
    const isValid = validateJwtToken(candidateToken);

    if (!isValid) {
      // Clear all expired or invalid credentials completely
      if (typeof document !== "undefined") {
        document.cookie =
          "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        sessionStorage.clear();
      }

      setIsAuthorized(false);
      setUser(null);
      router.replace("/login");
    } else {
      // Keep cookie synchronized if user was only stored in localStorage
      if (!tokenFromCookie && tokenFromStorage) {
        document.cookie = `auth_token=${tokenFromStorage}; path=/; max-age=604800; SameSite=Lax`;
      }

      // Load user profile
      if (typeof window !== "undefined") {
        try {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            setUser({ username: "Candidate" });
          }
        } catch {
          setUser({ username: "Candidate" });
        }
      }

      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof document !== "undefined") {
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      sessionStorage.clear();
    }
    setUser(null);
    setIsAuthorized(false);
    router.replace("/login");
  };

  // While verifying authorization status
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span>Verifying access permissions...</span>
        </div>
      </div>
    );
  }

  // If unauthorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 text-blue-600 shadow-sm">
          <Lock size={26} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Login Required</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm text-center">
          You must be logged in to enter the interview upload section. Redirecting to login...
        </p>
      </div>
    );
  }

  const displayName = user?.full_name || user?.username || "Professional Candidate";
  const userEmail = user?.email || "";
  const userInitial = (displayName[0] || "P").toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Professional Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                  AI
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 tracking-tight text-sm leading-tight">
                    InterviewAI
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                    Workspace
                  </span>
                </div>
              </Link>

              {/* Breadcrumb / Session Indicator */}
              <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-4 py-1 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>AI Interview Session</span>
              </div>
            </div>

            {/* Right: User Profile Card & Professional Logout */}
            <div className="flex items-center gap-3">
              {/* Profile Card */}
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {userInitial}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 leading-tight capitalize">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium leading-tight truncate max-w-[150px]">
                    {userEmail || "Verified User"}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 shadow-2xs transition-all cursor-pointer"
                title="Log out of your account"
              >
                <LogOut size={14} className="text-slate-500 hover:text-red-600 transition-colors" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
