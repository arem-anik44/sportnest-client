"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuCalendar, LuClock, LuXCircle } from "react-icons/lu";

export default function CancelBookingPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: session, isPending } = authClient.useSession();
  const [booking, setBooking] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) fetchBooking();
  }, [session]);

  const fetchBooking = async () => {
    const { data: token } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    const found = data.find((b) => b._id === id);
    setBooking(found);
    setFetching(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    const { data: token } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Booking cancelled successfully!");
      router.push("/my-bookings");
    } else {
      toast.error("Failed to cancel booking.");
    }
  };

  if (isPending || !session || fetching) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 text-lg mb-4">Booking not found.</p>
          <Link href="/my-bookings" className="text-emerald-500 hover:underline text-sm">
            Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/my-bookings"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-500 transition-colors mb-6"
        >
          <LuArrowLeft />
          Back to My Bookings
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          {booking.facility_image && (
            <div className="relative h-48 w-full">
              <Image
                src={booking.facility_image}
                alt={booking.facility_name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100 dark:bg-red-500/10 mx-auto mb-4">
              <LuXCircle className="text-2xl text-red-500" />
            </div>

            <h1 className="text-xl font-bold text-zinc-900 dark:text-white text-center mb-2">
              Cancel Booking
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-4">
              Are you sure you want to cancel your booking for
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 mb-6 flex flex-col gap-2">
              <p className="font-semibold text-zinc-900 dark:text-white text-sm">
                {booking.facility_name}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <LuCalendar className="text-emerald-500" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuClock className="text-emerald-500" />
                  <span>{booking.start_time} — {booking.end_time}</span>
                </div>
              </div>
              <p className="text-emerald-500 font-bold text-sm">${booking.total_price} total</p>
            </div>

            <p className="text-xs text-red-400 text-center mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <Link href="/my-bookings" className="flex-1">
                <button
                  type="button"
                  className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 font-semibold text-sm transition-colors"
                >
                  Keep Booking
                </button>
              </Link>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
              >
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
