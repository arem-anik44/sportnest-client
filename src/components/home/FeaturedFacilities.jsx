import FacilityCard from "./FacilityCard";
import Link from "next/link";
import { Button } from "@heroui/react";

async function getFeaturedFacilities() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/featured`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function FeaturedFacilities() {
  const facilities = await getFeaturedFacilities();

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-emerald-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Top Picks
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Featured Facilities
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Handpicked premium venues ready for you to book today.
          </p>
        </div>

        {facilities.length === 0 ? (
          <p className="text-center text-zinc-400">No facilities found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <FacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/facilities">
            <Button
              variant="bordered"
              className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold px-8 rounded-xl transition-colors"
            >
              View All Facilities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
