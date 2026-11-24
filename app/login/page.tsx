"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { loginUser, saveAuthSession } from "@/lib/api";
import { validateEmail, validatePassword } from "@/lib/validation";
import { useRateLimit } from "@/lib/useRateLimit";

function LoginForm() {
  const router = useRouter();
  const { isLimited, retryAfterSeconds, recordAttempt } = useRateLimit("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Track which fields have been touched (blurred)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const markTouched = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  // Reuse the same shared validators from lib/validation.ts — zero duplication
  const emailError = useMemo(() => validateEmail(email), [email]);
  const passwordError = useMemo(() => validatePassword(password), [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Mark all fields touched so inline errors appear
    setTouched({ email: true, password: true });

    if (emailError) {
      setErrorMessage(emailError);
      return;
    }
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }
    if (isLimited || !recordAttempt()) {
      setErrorMessage(
        `Too many login attempts. Please try again in ${retryAfterSeconds || 60}s.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      saveAuthSession(response.data);
      setSuccessMessage("Logged in successfully! Redirecting to upload...");
      setTimeout(() => {
        router.push("/interview/upload");
      }, 700);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to log in. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
      <div>
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:bg-blue-700 transition-colors">
            <div className="w-3.5 h-3.5 rounded-sm border-2 border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">
            dotwork
          </span>
        </Link>

        {/* Header Titles */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
            Log in to your Account
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-normal">
            Welcome back! Select method to log in:
          </p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] text-slate-400 font-medium whitespace-nowrap">
            or continue with email
          </span>
        </div>

        {/* Error & Success Feedback */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-500" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={16} />
              </div>
              <input
                type="text"
                required
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => markTouched("email")}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all bg-slate-50/30 ${
                  touched.email && emailError
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-600"
                }`}
              />
            </div>
            {touched.email && emailError && (
              <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                <XCircle size={12} className="flex-shrink-0" />
                {emailError}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => markTouched("password")}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all bg-slate-50/30 ${
                  touched.password && passwordError
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-600"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {touched.password && passwordError && (
              <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                <XCircle size={12} className="flex-shrink-0" />
                {passwordError}
              </p>
            )}
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-500">Remember me</span>
            </label>
            <a
              href="#"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isLimited}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Logging in...
              </span>
            ) : isLimited ? (
              `Try again in ${retryAfterSeconds}s`
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>

      {/* Create Account footer link */}
      <div className="text-center pt-8 text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-[#EEF2F6] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="fixed top-6 left-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-600 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-200 shadow-sm transition-all z-20"
      >
        <ArrowLeft size={14} />
        Back to Home
      </Link>

      {/* Main Auth Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(30,58,138,0.12)] border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[620px]">
        {/* Left Form Section with Suspense */}
        <Suspense fallback={<div className="w-full md:w-1/2 p-8 flex items-center justify-center text-sm text-slate-400">Loading login form...</div>}>
          <LoginForm />
        </Suspense>

        {/* Right Blue Presentation Panel */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#1E6CEB] via-[#1A62E8] to-[#0E4CBF] p-8 lg:p-12 flex-col justify-between items-center text-white relative overflow-hidden">
          {/* Subtle Radar & Glow circles in background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[450px] h-[450px] rounded-full border border-white/30 absolute"></div>
            <div className="w-[320px] h-[320px] rounded-full border border-white/40 absolute"></div>
            <div className="w-[200px] h-[200px] rounded-full border border-white/50 absolute"></div>
            <div className="w-[550px] h-[550px] rounded-full bg-blue-400/20 blur-3xl absolute"></div>
          </div>

          <div className="h-2"></div>

          {/* Central App Integration Hub Visual */}
          <div className="relative z-10 w-full max-w-[340px] flex items-center justify-center">
            <div className="relative flex items-center w-full justify-between">
              {/* Left Column: 3 Connected App Badges */}
              <div className="flex flex-col gap-4 z-10">
                <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center p-2 transform hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
                    <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
                    <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
                    <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                  </svg>
                </div>

                <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center p-2 transform hover:scale-110 transition-transform">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
                    <div className="w-3.5 h-3.5 border-2 border-white rounded-[4px] flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center p-2 transform hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                </div>
              </div>

              {/* Connecting Lines SVG */}
              <div className="flex-1 mx-2 relative h-36">
                <svg className="w-full h-full" viewBox="0 0 80 140" fill="none" preserveAspectRatio="none">
                  <path d="M 5 20 C 40 20, 45 70, 75 70" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 5 70 L 75 70" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 5 120 C 40 120, 45 70, 75 70" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Right Side: Dashboard Window Card */}
              <div className="w-[170px] bg-white rounded-xl shadow-2xl p-3 text-slate-800 z-10 border border-white/20">
                <div className="flex items-center gap-1 mb-2.5 pb-1.5 border-b border-slate-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <div className="h-1.5 w-12 bg-slate-100 rounded ml-1"></div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-[10px] text-blue-600 font-bold">A</div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-slate-200 rounded w-16 mb-1"></div>
                      <div className="h-1 bg-slate-100 rounded w-10"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-[10px] text-purple-600 font-bold">J</div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-slate-200 rounded w-14 mb-1"></div>
                      <div className="h-1 bg-slate-100 rounded w-8"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-[10px] text-emerald-600 font-bold">R</div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-slate-200 rounded w-12 mb-1"></div>
                      <div className="h-1 bg-slate-100 rounded w-6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Content & Carousel Indicator */}
          <div className="relative z-10 text-center">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Connect with every application.
            </h3>
            <p className="text-xs text-blue-100/90 mt-1 max-w-[260px] mx-auto leading-relaxed">
              Everything you need in an easily customizable dashboard.
            </p>

            <div className="flex items-center justify-center gap-1.5 mt-5">
              <div className="w-5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
