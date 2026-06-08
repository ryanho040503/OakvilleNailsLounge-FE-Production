"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { appConfig } from "@/config";

interface MobileNavProps {
  navLinks: Array<{ href: string; label: string }>;
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 bg-white text-foreground"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="absolute inset-x-4 top-24 glass-panel p-5">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary/70"
              >
                {link.label}
              </Link>
            ))}
            <Link href={appConfig.bookingUrl} onClick={() => setOpen(false)} className="button-primary mt-2">
              Book Now
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
