import Link from "next/link";

import { appConfig } from "@/config";

import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/book", label: "Book" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#fffaf6]/85 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            ON
          </div>
          <div>
            <p className="font-display text-lg text-foreground">{appConfig.appName}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/75">Beauty Lounge</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/book" className="button-primary">
            Book Now
          </Link>
        </div>

        <MobileNav navLinks={navLinks} />
      </div>
    </header>
  );
}
