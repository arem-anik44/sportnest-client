import { LuSearch, LuCalendarDays, LuCreditCard, LuTrophy } from "react-icons/lu";

const steps = [
  {
    icon: LuSearch,
    step: "01",
    title: "Find a Facility",
    description: "Browse our wide range of sports facilities. Filter by sport type or search by name to find your perfect venue.",
  },
  {
    icon: LuCalendarDays,
    step: "02",
    title: "Pick a Slot",
    description: "Choose your preferred date and time from the available slots shown on the facility detail page.",
  },
  {
    icon: LuCreditCard,
    step: "03",
    title: "Book & Confirm",
    description: "Complete your booking instantly. You'll receive a confirmation right away with all the details.",
  },
  {
    icon: LuTrophy,
    step: "04",
    title: "Play & Enjoy",
    description: "Show up and play! Manage or cancel your bookings anytime from your personal dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-emerald-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Get on the field in just four easy steps — no hassle, no waiting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          {steps.map(({ icon: Icon, step, title, description }, index) => (
            <div key={step} className="relative flex flex-col items-center text-center group">
              <div className="relative z-10 mb-5">
                <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-emerald-500 shadow-md group-hover:shadow-emerald-500/20 transition-all duration-300">
                  <Icon className="text-2xl text-emerald-500" />
                </div>
                <span className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
