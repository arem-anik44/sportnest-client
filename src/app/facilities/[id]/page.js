import Image from "next/image";
import Link from "next/link";
import { LuMapPin, LuClock, LuArrowLeft } from "react-icons/lu";
import { GiSoccerBall, GiShuttlecock, GiTennisBall } from "react-icons/gi";
import { MdPool, MdSportsBasketball } from "react-icons/md";
import BookingForm from "@/components/facility/BookingForm";

const typeIcons = {
  football: GiSoccerBall,
  badminton: GiShuttlecock,
  tennis: GiTennisBall,
  swimming: MdPool,
  basketball: MdSportsBasketball,
};

async function getFacility(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function FacilityDetailsPage({ params }) {
  const { id } = await params;
  const facility = await getFacility(id);

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <p className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Facility not found</p>
          <Link href="/facilities" className="text-emerald-500 hover:underline text-sm">
            Back to Facilities
          </Link>
        </div>
      </div>
    );
  }

  const { name, type, image, price_per_hour, location, availability, description } = facility;
  const TypeIcon = typeIcons[type?.toLowerCase()] || GiSoccerBall;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/facilities"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-500 transition-colors mb-6"
        >
          <LuArrowLeft />
          Back to Facilities
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full mb-2">
                <TypeIcon className="text-base" />
                <span className="capitalize">{type}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{name}</h1>
            </div>
            <div className="absolute top-6 right-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-lg font-bold px-4 py-2 rounded-xl shadow">
              ${price_per_hour}<span className="text-sm font-normal text-zinc-500">/hr</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {location && (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                  <LuMapPin className="text-emerald-500 shrink-0" />
                  <span>{location}</span>
                </div>
              )}
              {availability && (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                  <LuClock className="text-emerald-500 shrink-0" />
                  <span>{availability}</span>
                </div>
              )}
            </div>

            {description && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  About this facility
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                  {description}
                </p>
              </div>
            )}

            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
                Book this Facility
              </h2>
              <BookingForm facility={facility} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
