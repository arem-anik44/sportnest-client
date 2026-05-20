import Link from "next/link";
import { GiSoccerBall } from "react-icons/gi";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <GiSoccerBall className="text-8xl text-emerald-500 animate-bounce" />
        </div>

        <h1 className="text-8xl font-bold text-zinc-900 dark:text-white mb-2">
          4<span className="text-emerald-500">0</span>4
        </h1>

        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
          Page Not Found
        </h2>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto mb-8">
          Looks like this page went out of bounds. Let&apos;s get you back on the field.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors">
              Back to Home
            </button>
          </Link>
          <Link href="/facilities">
            <button className="px-6 py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-500 font-semibold text-sm rounded-xl transition-colors">
              Browse Facilities
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
