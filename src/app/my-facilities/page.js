"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { LuMapPin, LuClock, LuPencil, LuTrash2, LuPlus } from "react-icons/lu";
import { GiSoccerBall, GiShuttlecock, GiTennisBall } from "react-icons/gi";
import { MdPool, MdSportsBasketball } from "react-icons/md";

const typeIcons = {
  football: GiSoccerBall,
  badminton: GiShuttlecock,
  tennis: GiTennisBall,
  swimming: MdPool,
  basketball: MdSportsBasketball,
};

export default function MyFacilitiesPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) fetchMyFacilities();
  }, [session]);

  const fetchMyFacilities = async () => {
    setLoading(true);
    const { data: token } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setFacilities(data);
    setLoading(false);
  };

  if (isPending || !session) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">My Facilities</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Manage the facilities you have listed
            </p>
          </div>
          <Link href="/add-facility">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors">
              <LuPlus />
              Add New
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ))}
          </div>
        ) : facilities.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-400 text-lg mb-4">You have not added any facilities yet.</p>
            <Link href="/add-facility">
              <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors">
                Add Your First Facility
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => {
              const TypeIcon = typeIcons[facility.type?.toLowerCase()] || GiSoccerBall;
              return (
                <div
                  key={facility._id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      <TypeIcon className="text-emerald-400 text-sm" />
                      <span className="capitalize">{facility.type}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      ${facility.price_per_hour}/hr
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-white text-sm line-clamp-1">
                      {facility.name}
                    </h3>
                    {facility.location && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <LuMapPin className="text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{facility.location}</span>
                      </div>
                    )}
                    {facility.availability && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <LuClock className="text-emerald-500 shrink-0" />
                        <span>{facility.availability}</span>
                      </div>
                    )}

                    <div className="flex gap-2 mt-2">
                      <Link href={`/my-facilities/${facility._id}/edit`} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-500 text-xs font-medium transition-colors">
                          <LuPencil className="text-sm" />
                          Edit
                        </button>
                      </Link>
                      <Link href={`/my-facilities/${facility._id}/delete`} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-red-500 hover:text-red-500 text-xs font-medium transition-colors">
                          <LuTrash2 className="text-sm" />
                          Delete
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
