"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { GiSoccerBall } from "react-icons/gi";
import { LuEye, LuEyeOff, LuMail, LuLock } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    setGoogleLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Login failed");
    } else {
      toast.success("Welcome back!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <GiSoccerBall className="text-3xl text-emerald-500" />
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
              Sport<span className="text-emerald-500">Nest</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Welcome back</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Sign in to continue booking your favourite venues
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <div className="relative">
                <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-zinc-400 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <div className="relative">
                <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-zinc-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  {showPassword ? <LuEyeOff className="text-sm" /> : <LuEye className="text-sm" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="mt-4 w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-700 dark:text-zinc-200 font-semibold text-sm transition-colors"
          >
            <FcGoogle className="text-xl" />
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-emerald-500 hover:text-emerald-600 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
