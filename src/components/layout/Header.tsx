"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { appConfig } from "@/config";

import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 24) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-[#0b0806]/88 backdrop-blur-xl transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-primary/15 bg-[#140f0c]">
            <Image
              src="/images/logo/logo.png"
              alt={`${appConfig.appName} logo`}
              fill
              className="object-cover"
              sizes="56px"
            />
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
