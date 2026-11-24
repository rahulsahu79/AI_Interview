"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Check,
  Loader2,
} from "lucide-react";
import { registerUser, saveAuthSession } from "@/lib/api";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  getPasswordChecks,
} from "@/lib/validation";
import { useRateLimit } from "@/lib/useRateLimit";

function SignupForm() {
  const router = useRouter();
  const { isLimited, retryAfterSeconds, recordAttempt } = useRateLimit("signup");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Track which fields have been touched (blurred) so we only show inline
  // errors after the user has interacted with a field.
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const markTouched = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  // ── Derived validation state (no duplicated logic!) ──────────────────────
  const usernameError = useMemo(() => validateUsername(username), [username]);
  const emailError = useMemo(() => validateEmail(email), [email]);
  const passwordError = useMemo(() => validatePassword(password), [password]);
  const passwordChecks = useMemo(() => getPasswordChecks(password), [password]);

  const formIsValid =
    !usernameError && !emailError && !passwordError && agreeTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Mark all fields as touched so any remaining errors show
    setTouched({ username: true, email: true, password: true });

    if (usernameError) {
      setErrorMessage(usernameError);
      return;
    }
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }
    if (!agreeTerms) {
      setErrorMessage(
        "Please accept the Terms of Service and Privacy Policy to continue."
      );
      return;
    }
    if (isLimited || !recordAttempt()) {
      setErrorMessage(
        `Too many signup attempts. Please try again in ${retryAfterSeconds || 60}s.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({ username, email, password });
      saveAuthSession(response.data);
      setSuccessMessage(
        "Account created successfully! Redirecting to upload..."
      );
      setTimeout(() => {
        router.push("/interview/upload");
      }, 700);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to create account. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
      {/* Header Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
          Create Account
        </h1>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Username Input */}
        <div>
          <input
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => markTouched("username")}
            className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all bg-slate-50/20 ${
              touched.username && usernameError
                ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-600"
            }`}
          />
          {touched.username && usernameError && (
            <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
              <XCircle size={12} className="flex-shrink-0" />
              {usernameError}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => markTouched("email")}
            className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all bg-slate-50/20 ${
              touched.email && emailError
                ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-600"
            }`}
          />
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
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => markTouched("password")}
              className={`w-full pl-4 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all bg-slate-50/20 ${
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

          {/* Password strength checklist – shown once user starts typing */}
          {password.length > 0 && (
            <ul className="mt-2 space-y-0.5">
              {passwordChecks.map((check) => (
                <li
                  key={check.label}
                  className={`flex items-center gap-1.5 text-[11px] ${
                    check.passed ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {check.passed ? (
                    <Check size={12} className="flex-shrink-0" />
                  ) : (
                    <XCircle size={12} className="flex-shrink-0" />
                  )}
                  {check.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-3.5 h-3.5 mt-0.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-[11px] leading-relaxed text-slate-500">
              By creating an account, you agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service and Conditions
              </a>
              , and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !formIsValid || isLimited}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Creating account...
            </span>
          ) : isLimited ? (
            `Try again in ${retryAfterSeconds}s`
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-slate-200 w-full"></div>
        <span className="bg-white px-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          Or
        </span>
      </div>

      {/* Social Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 py-2 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Sign up with Google
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 py-2 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Sign up with Facebook
        </button>
      </div>

      {/* Already have an account link */}
      <div className="text-center pt-6 text-xs text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

export default function SignupPage() {
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
        {/* Left Side: Security & Verification Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#F5F8FF] to-[#EAF2FE] p-8 lg:p-12 flex-col items-center justify-center relative overflow-hidden select-none">
          <div className="absolute w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
            <div className="absolute bottom-4 w-52 h-6 bg-blue-200/50 rounded-full blur-sm"></div>

            {/* Floating Biometric Badge 1: Concentric Fingerprint Scan */}
            <div className="absolute left-1 bottom-16 w-12 h-12 rounded-full bg-white/90 shadow-md border border-blue-100 flex items-center justify-center animate-pulse">
              <svg
                className="w-7 h-7 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                <path d="M2 16h.01" />
                <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" />
                <path d="M5.07 19.46a8 8 0 0 1-.07-9.46 8 8 0 0 1 14 0" />
              </svg>
            </div>

            {/* Floating Security Badge 2: Key Icon */}
            <div className="absolute left-8 top-12 w-9 h-9 rounded-full bg-blue-50 shadow-sm border border-blue-200 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 2-2 2m-1.5 1.5L16 7l-1.5-1.5L13 7l-2-2-4.5 4.5a5 5 0 1 0 7 7L21 9v-3l-2-2Z" />
                <circle cx="7.5" cy="15.5" r=".5" fill="currentColor" />
              </svg>
            </div>

            {/* Floating Security Badge 3: Password Asterisks */}
            <div className="absolute top-6 left-1/3 -translate-x-1/2 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center gap-1.5">
              <span className="text-xs font-mono font-black text-blue-600 tracking-wider">
                * * * *
              </span>
            </div>

            {/* Floating Security Badge 4: Biometric Eye */}
            <div className="absolute top-4 right-16 w-11 h-11 rounded-2xl bg-white shadow-sm border border-blue-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>

            {/* Floating Security Badge 5: Face ID */}
            <div className="absolute right-3 top-24 w-10 h-10 rounded-lg border border-dashed border-blue-400/80 bg-blue-50/50 flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-r-2 border-b-2 border-l-2 border-blue-500 rounded-sm"></div>
            </div>

            {/* Main Character Illustration */}
            <svg
              className="w-56 h-64 z-10"
              viewBox="0 0 200 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 60 C70 50, 65 35, 78 30 C86 28, 92 35, 90 52 Z"
                fill="#1E293B"
              />
              <path
                d="M72 45 C60 48, 55 60, 60 75 C62 65, 70 52, 75 48 Z"
                fill="#1E293B"
              />
              <path d="M96 66 L96 78 L104 78 L104 66 Z" fill="#FCD3B0" />
              <circle cx="100" cy="56" r="14" fill="#FCD3B0" />
              <path
                d="M86 52 C90 40, 110 40, 114 50 C114 50, 108 45, 96 48 C90 49, 88 51, 86 52 Z"
                fill="#1E293B"
              />
              <circle cx="106" cy="56" r="1.5" fill="#1E293B" />
              <path
                d="M106 61 C104 63, 102 63, 100 61"
                stroke="#1E293B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M88 78 C82 82, 76 96, 76 112 L120 112 C120 96, 114 82, 108 78 Z"
                fill="#1E293B"
              />
              <path d="M94 78 L100 88 L104 78 Z" fill="#FCD3B0" />
              <path
                d="M116 85 L132 94 L142 85"
                stroke="#FCD3B0"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="138"
                y="74"
                width="12"
                height="22"
                rx="2.5"
                fill="#1E6CEB"
              />
              <rect
                x="140"
                y="76"
                width="8"
                height="16"
                rx="1"
                fill="#FFFFFF"
              />
              <path
                d="M80 88 L65 95 L55 90"
                stroke="#FCD3B0"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M76 112 L120 112 L124 165 C124 185, 114 195, 106 205 L100 205 C96 185, 94 150, 92 135 C90 150, 86 185, 78 185 L72 185 C66 175, 62 145, 76 112 Z"
                fill="#2563EB"
              />
              <path
                d="M98 128 L98 200"
                stroke="#1D4ED8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M68 185 C70 182, 80 182, 82 185 L84 190 L66 190 Z"
                fill="#1E293B"
              />
              <path
                d="M102 205 C104 202, 116 202, 118 205 L120 210 L100 210 Z"
                fill="#1E293B"
              />
            </svg>
          </div>
        </div>

        {/* Right Form Section with Suspense */}
        <Suspense
          fallback={
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center text-sm text-slate-400">
              Loading signup form...
            </div>
          }
        >
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
