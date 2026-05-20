import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { GiSoccerBall, GiShuttlecock, GiTennisBall } from "react-icons/gi";
import { MdPool } from "react-icons/md";
import { MdSportsBasketball } from "react-icons/md";
import { LuMapPin, LuClock } from "react-icons/lu";

const typeIcons = {
  football: GiSoccerBall,
  badminton: GiShuttlecock,
  tennis: GiTennisBall,
  swimming: MdPool,
  basketball: MdSportsBasketball,
};

export default function FacilityCard({ facility }) {
  const { _id, name, type, image, price_per_hour, location, availability } = facility;
  const TypeIcon = typeIcons[type?.toLowerCase()] || GiSoccerBall;

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          <TypeIcon className="text-emerald-400 text-sm" />
          <span className="capitalize">{type}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
          ${price_per_hour}/hr
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 transition-colors">
          {name}
        </h3>

        <div className="flex flex-col gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          {location && (
            <div className="flex items-center gap-1.5">
              <LuMapPin className="text-emerald-500 shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
          {availability && (
            <div className="flex items-center gap-1.5">
              <LuClock className="text-emerald-500 shrink-0" />
              <span>{availability}</span>
            </div>
          )}
        </div>

        <Link href={`/facilities/${_id}`} className="mt-1 w-full">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
