"use client";

import { motion } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ username?: string; email?: string } | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token");
        const storedUser = localStorage.getItem("user");
        if (token && storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            setUser({ username: "User" });
          }
        } else {
          setUser(null);
        }
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setUser(null);
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]">
                <span className="text-lg font-bold text-white">AI</span>
              </div>
              <span className="hidden font-semibold text-[#0F172A] sm:inline">
                InterviewAI
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ color: "#2563EB" }}
                className="text-sm font-medium text-[#64748B] transition-colors hover:text-[#2563EB]"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/interview/upload"
                  className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-[#1d4ed8] transition-all"
                >
                  Start Interview
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs">
                    <User size={15} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                    {user.username || "Account"}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Log out"
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-[#2563EB] hover:bg-[#F8FAFC] transition-colors"
                >
                  Login
                </Link>
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl hover:bg-[#1d4ed8] transition-all cursor-pointer"
                  >
                    Start Interview
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#0F172A]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#E2E8F0] py-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 border-t border-[#E2E8F0] pt-4">
                {user ? (
                  <>
                    <div className="px-4 py-1 text-xs font-semibold text-slate-500">
                      Signed in as {user.username}
                    </div>
                    <Link
                      href="/interview/upload"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg bg-[#2563EB] px-4 py-2 text-center text-sm font-medium text-white"
                    >
                      Start Interview
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="rounded-lg px-4 py-2 text-center text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-4 py-2 text-center text-sm font-medium text-[#2563EB] hover:bg-[#F8FAFC] transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg bg-[#2563EB] px-4 py-2 text-center text-sm font-medium text-white"
                    >
                      Start Interview
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
