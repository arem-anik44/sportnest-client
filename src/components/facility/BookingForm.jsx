"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LuCalendar, LuClock } from "react-icons/lu";
import Link from "next/link";

export default function BookingForm({ facility }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    const { date, start_time, end_time } = Object.fromEntries(new FormData(e.target));

    if (start_time >= end_time) {
      toast.error("End time must be after start time");
      return;
    }

    const startHour = parseInt(start_time.split(":")[0]);
    const endHour = parseInt(end_time.split(":")[0]);
    const hours = endHour - startHour;
    const total_price = hours * facility.price_per_hour;

    const bookingData = {
      facility_id: facility._id,
      facility_name: facility.name,
      facility_image: facility.image,
      date,
      start_time,
      end_time,
      total_price,
      user_name: session.user.name,
      status: "pending",
    };

    setLoading(true);
    const { data: token } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Booking confirmed!");
      router.push("/my-bookings");
    } else {
      toast.error("Booking failed. Please try again.");
    }
  };

  if (isPending) return null;

  if (!session) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 text-center border border-zinc-200 dark:border-zinc-700">
        <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
          You need to be logged in to book this facility.
        </p>
        <Link href="/login">
          <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors">
            Login to Book
          </button>
        </Link>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleBooking} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Date
          </label>
          <div className="relative">
            <LuCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
            <input
              type="date"
              name="date"
              required
              min={today}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Start Time
          </label>
          <div className="relative">
            <LuClock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
            <input
              type="time"
              name="start_time"
              required
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            End Time
          </label>
          <div className="relative">
            <LuClock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
            <input
              type="time"
              name="end_time"
              required
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-sm text-zinc-600 dark:text-zinc-300">
        <span className="font-medium text-emerald-600 dark:text-emerald-400">Rate: </span>
        ${facility.price_per_hour}/hour — total calculated on submission
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
      >
        {loading ? "Confirming Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
