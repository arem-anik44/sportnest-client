"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { GiSoccerBall } from "react-icons/gi";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Facilities", href: "/facilities" },
];

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <GiSoccerBall className="text-2xl text-emerald-500" />
            <span className="text-xl font-bold tracking-wide text-zinc-900 dark:text-white">
              Sport<span className="text-emerald-500">Nest</span>
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "text-emerald-500"
                    : "text-zinc-600 hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {!isPending && (
              <>
                {session ? (
                  <Dropdown>
                    <DropdownTrigger>
                      <button className="rounded-full ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 focus:outline-none">
                        <AvatarRoot className="h-9 w-9">
                          <AvatarImage
                            src={session.user.image || ""}
                            alt={session.user.name}
                          />
                          <AvatarFallback className="bg-emerald-500 text-white text-sm font-semibold">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </AvatarRoot>
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User menu">
                      <DropdownItem key="info" isReadOnly className="opacity-70">
                        <p className="font-semibold text-sm">{session.user.name}</p>
                        <p className="text-xs text-zinc-400">{session.user.email}</p>
                      </DropdownItem>
                      <DropdownItem key="add-facility">
                        <Link href="/add-facility" className="block w-full">
                          Add Facility
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="my-facilities">
                        <Link href="/my-facilities" className="block w-full">
                          My Facilities
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="my-bookings">
                        <Link href="/my-bookings" className="block w-full">
                          My Bookings
                        </Link>
                      </DropdownItem>
                      <DropdownItem
                        key="logout"
                        className="text-red-500"
                        onPress={handleLogout}
                      >
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <Button
                    as={Link}
                    href="/login"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 rounded-lg"
                  >
                    Login
                  </Button>
                )}
              </>
            )}

            <button
              className="sm:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <RxCross1 className="text-xl" />
              ) : (
                <RxHamburgerMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-base font-medium py-1 transition-colors ${
                pathname === link.href
                  ? "text-emerald-500"
                  : "text-zinc-700 dark:text-zinc-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <>
              <Link
                href="/add-facility"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium py-1 text-zinc-700 dark:text-zinc-200"
              >
                Add Facility
              </Link>
              <Link
                href="/my-facilities"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium py-1 text-zinc-700 dark:text-zinc-200"
              >
                My Facilities
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium py-1 text-zinc-700 dark:text-zinc-200"
              >
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="text-base font-medium py-1 text-red-500 text-left"
              >
                Log Out
              </button>
            </>
          )}
          {!session && !isPending && (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium py-1 text-emerald-500"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
