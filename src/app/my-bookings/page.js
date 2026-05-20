"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { LuCalendar, LuClock, LuTrash2 } from "react-icons/lu";

export default function MyBookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) fetchBookings();
  }, [session]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data: token } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  if (isPending || !session) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">My Bookings</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            All your upcoming and past facility bookings
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-400 text-lg mb-4">You have no bookings yet.</p>
            <Link href="/facilities">
              <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors">
                Browse Facilities
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm flex flex-col sm:flex-row"
              >
                {booking.facility_image && (
                  <div className="relative h-40 sm:h-auto sm:w-48 shrink-0">
                    <Image
                      src={booking.facility_image}
                      alt={booking.facility_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col justify-between p-5 flex-1 gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">
                      {booking.facility_name}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <LuCalendar className="text-emerald-500 shrink-0" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <LuClock className="text-emerald-500 shrink-0" />
                        <span>{booking.start_time} — {booking.end_time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-emerald-500 font-bold text-base">
                      ${booking.total_price}
                    </span>
                    <Link href={`/my-bookings/${booking._id}/cancel`}>
                      <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-red-500 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-xs font-semibold transition-colors">
                        <LuTrash2 className="text-sm" />
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
