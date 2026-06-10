import Link from "next/link";

import { appConfig } from "@/config";

import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-[#0b0806]/88 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-[#1f130b]">
            ON
          </div>
          <div>
            <p className="font-display text-lg text-[#f6e4cb]">{appConfig.appName}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/75">Beauty Lounge</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#f4e7d5]/78 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href={appConfig.bookingUrl} className="button-primary">
            Book Now
          </Link>
        </div>

        <MobileNav navLinks={navLinks} />
      </div>
    </header>
  );
}
