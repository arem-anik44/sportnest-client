"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@heroui/react";
import { GiSoccerBall, GiShuttlecock, GiTennisBall } from "react-icons/gi";
import { MdPool } from "react-icons/md";

const floatingIcons = [
  { icon: GiSoccerBall, top: "15%", left: "8%", delay: 0, size: "text-4xl" },
  { icon: GiShuttlecock, top: "20%", right: "10%", delay: 0.4, size: "text-3xl" },
  { icon: GiTennisBall, bottom: "25%", left: "12%", delay: 0.8, size: "text-3xl" },
  { icon: MdPool, bottom: "20%", right: "8%", delay: 1.2, size: "text-4xl" },
];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 min-h-[88vh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />

      {floatingIcons.map(({ icon: Icon, delay, size, ...pos }, i) => (
        <motion.div
          key={i}
          className={`absolute ${size} text-emerald-500/20`}
          style={pos}
          animate={{ y: [0, -18, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
        >
          <GiSoccerBall className="text-base" />
          Premium Sports Facilities Near You
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
        >
          Book Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Perfect
          </span>
          <br />
          Sports Venue
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Discover and reserve top-quality football turfs, badminton courts, swimming lanes, tennis courts and more — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/facilities">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-emerald-500/25">
              Browse Facilities
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="bordered"
              className="border-zinc-600 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 font-semibold px-8 py-6 text-base rounded-xl"
            >
              Get Started Free
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { icon: GiSoccerBall, label: "Football" },
            { icon: GiShuttlecock, label: "Badminton" },
            { icon: GiTennisBall, label: "Tennis" },
            { icon: MdPool, label: "Swimming" },
          ].map(({ icon: Icon, label }) => (
            <Link
              key={label}
              href="/facilities"
              className="flex flex-col items-center gap-2 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 rounded-xl p-4 transition-all group"
            >
              <Icon className="text-3xl text-zinc-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-sm text-zinc-400 group-hover:text-emerald-300 font-medium transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
