import Link from "next/link";
import { GiSoccerBall } from "react-icons/gi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Sports",
    links: [
      { label: "Football", href: "/facilities?type=football" },
      { label: "Badminton", href: "/facilities?type=badminton" },
      { label: "Swimming", href: "/facilities?type=swimming" },
      { label: "Tennis", href: "/facilities?type=tennis" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Sign Up", href: "/signup" },
      { label: "My Bookings", href: "/my-bookings" },
      { label: "My Facilities", href: "/my-facilities" },
    ],
  },
];

const socials = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <GiSoccerBall className="text-2xl text-emerald-500" />
              <span className="text-xl font-bold tracking-wide text-white">
                Sport<span className="text-emerald-500">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Book premium sports facilities near you — football turfs, badminton courts, swimming lanes, tennis courts and more.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-emerald-500 text-zinc-400 hover:text-white transition-colors"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} SportNest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
