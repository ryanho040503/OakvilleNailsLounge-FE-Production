import Link from "next/link";

import { appConfig } from "@/config";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-[#090705]">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-display text-2xl text-[#f6e5c9]">{appConfig.appName}</p>
          <p className="max-w-md text-sm leading-7 text-[#f3e1c5]/68">{appConfig.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-[#f3e1c5]/68">
          <p className="font-semibold uppercase tracking-[0.2em] text-primary">Visit</p>
          <p>{appConfig.address}</p>
          <p>{appConfig.phone}</p>
          <p>{appConfig.email}</p>
        </div>

        <div className="space-y-3 text-sm text-[#f3e1c5]/68">
          <p className="font-semibold uppercase tracking-[0.2em] text-primary">Explore</p>
          <Link href="/services" className="block hover:text-primary">
            Services
          </Link>
          <Link href={appConfig.bookingUrl} className="block hover:text-primary">
            Booking
          </Link>
          <Link href="/contact" className="block hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
