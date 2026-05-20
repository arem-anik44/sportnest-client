import { LuShieldCheck, LuCalendarCheck, LuMapPin, LuHeadphones, LuZap, LuStar } from "react-icons/lu";

const reasons = [
  {
    icon: LuShieldCheck,
    title: "Verified Venues",
    description: "Every facility is inspected and verified to meet our quality standards before listing.",
  },
  {
    icon: LuCalendarCheck,
    title: "Instant Booking",
    description: "Book your preferred slot in seconds with real-time availability and instant confirmation.",
  },
  {
    icon: LuMapPin,
    title: "Prime Locations",
    description: "Facilities spread across the city so you always find one close to you.",
  },
  {
    icon: LuHeadphones,
    title: "24/7 Support",
    description: "Our support team is always available to help you with any queries or issues.",
  },
  {
    icon: LuZap,
    title: "Easy Cancellation",
    description: "Plans changed? Cancel or reschedule your booking hassle-free anytime.",
  },
  {
    icon: LuStar,
    title: "Best Price Guarantee",
    description: "We offer competitive pricing with no hidden fees — what you see is what you pay.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-emerald-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Why Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Why Choose SportNest?
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            We make sports facility booking simple, reliable, and affordable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group"
            >
              <div className="shrink-0 h-12 w-12 flex items-center justify-center rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500 transition-colors duration-300">
                <Icon className="text-xl text-emerald-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                  {title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
