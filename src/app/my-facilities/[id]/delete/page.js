"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuTrash2 } from "react-icons/lu";

export default function DeleteFacilityPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: session, isPending } = authClient.useSession();
  const [facility, setFacility] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFacility(data);
          setFetching(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    const { data: token } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Facility deleted successfully!");
      router.push("/my-facilities");
    } else {
      toast.error("Failed to delete facility.");
    }
  };

  if (isPending || !session || fetching) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/my-facilities"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-500 transition-colors mb-6"
        >
          <LuArrowLeft />
          Back to My Facilities
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          {facility?.image && (
            <div className="relative h-52 w-full">
              <Image
                src={facility.image}
                alt={facility.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100 dark:bg-red-500/10 mx-auto mb-4">
              <LuTrash2 className="text-2xl text-red-500" />
            </div>

            <h1 className="text-xl font-bold text-zinc-900 dark:text-white text-center mb-2">
              Delete Facility
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-1">
              Are you sure you want to delete
            </p>
            <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200 text-center mb-6">
              &ldquo;{facility?.name}&rdquo;?
            </p>
            <p className="text-xs text-red-400 text-center mb-8">
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <Link href="/my-facilities" className="flex-1">
                <button
                  type="button"
                  className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
