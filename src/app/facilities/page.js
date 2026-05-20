"use client";

import { useState, useEffect } from "react";
import FacilityCard from "@/components/home/FacilityCard";
import { LuSearch, LuSlidersHorizontal } from "react-icons/lu";

const sportTypes = ["Football", "Badminton", "Tennis", "Swimming", "Basketball"];

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const fetchFacilities = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedTypes.length > 0) params.set("types", selectedTypes.join(","));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities?${params.toString()}`
    );
    const data = await res.json();
    setFacilities(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFacilities();
  }, [selectedTypes]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFacilities();
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedTypes([]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
            All Facilities
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Browse and book from our full list of sports venues
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search facilities..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-zinc-400 transition"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <LuSlidersHorizontal className="text-emerald-500" />
            Filter:
          </span>
          {sportTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selectedTypes.includes(type.toLowerCase())
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-500"
              }`}
            >
              {type}
            </button>
          ))}
          {(selectedTypes.length > 0 || search) && (
            <button
              onClick={clearFilters}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : facilities.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-400 text-lg">No facilities found.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-emerald-500 hover:underline text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-zinc-400 mb-4">
              {facilities.length} {facilities.length === 1 ? "facility" : "facilities"} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility) => (
                <FacilityCard key={facility._id} facility={facility} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
