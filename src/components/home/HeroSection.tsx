import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin, PhoneCall, Sparkles } from "lucide-react";

import { appConfig } from "@/config";
import { salonInfo } from "@/data/mockData";

export function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden border-b border-[#7c593f]/15 bg-[#120d0a]">
      <div className="absolute inset-0">
        <Image
          src="/images/Nails.jpeg"
          alt="Oakville Nails Lounge hero nails background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(210,155,80,0.2),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(255,221,157,0.16),transparent_14%),linear-gradient(90deg,rgba(9,6,4,0.72)_0%,rgba(18,12,8,0.56)_38%,rgba(13,9,6,0.34)_72%,rgba(8,6,4,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,196,98,0.06)_0%,transparent_18%,transparent_80%,rgba(255,196,98,0.07)_100%)]" />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#c28747]/15 blur-3xl" />
      <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,224,179,0.1),transparent_18%)]" />

      <div className="container-shell relative flex h-full items-center pt-32 pb-10 sm:pt-36 sm:pb-12 lg:pt-28 lg:pb-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8 text-white lg:pr-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#d1a35f]">
                Oakville Nail Lounge
              </p>
              <h1 className="max-w-4xl text-5xl leading-[0.92] text-[#f5e7d8] sm:text-6xl lg:text-7xl">
                14-day warranty on workmanship defects only. Complimentary repairs for service-related issues caused by our technicians.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#f3e6da]/78 sm:text-lg">
                {salonInfo.tagline} Discover refined manicures, restorative pedicures, and a boutique atmosphere
                designed for guests who want polished results without the friction.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={appConfig.bookingUrl}
                className="inline-flex items-center justify-center rounded-full bg-[#d4a04f] px-7 py-3 text-sm font-semibold text-[#2d1a0f] transition hover:bg-[#e0b166]"
              >
                Book Now
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-[#f2d8b7]/35 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16"
              >
                View Services
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#f6ebdf]/78">
                <div className="flex items-center gap-2 text-[#d4a04f]">
                  <Sparkles className="h-4 w-4" />
                  Premium finishes
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#f6ebdf]/78">
                <div className="flex items-center gap-2 text-[#d4a04f]">
                  <Clock3 className="h-4 w-4" />
                  Easy online booking
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#f6ebdf]/78">
                <div className="flex items-center gap-2 text-[#d4a04f]">
                  <PhoneCall className="h-4 w-4" />
                  Friendly service
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-[#f6ebdf]/72">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d4a04f]" />
                Boutique salon atmosphere
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d4a04f]" />
                Skilled artists
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d4a04f]" />
                Open daily
              </div>
            </div>
          </div>

          <div className="flex items-center lg:-translate-y-8">
            <div className="w-full rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 backdrop-blur-md sm:p-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(33,24,18,0.92),rgba(17,12,9,0.92))] p-6 text-white/92 shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-[#d1a35f]">Our Location</p>
                <h2 className="mt-4 text-3xl text-[#f8ebde]">{salonInfo.name}</h2>
                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#d4a04f]" />
                    <p className="text-base leading-8 text-white/74">{salonInfo.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 shrink-0 text-[#d4a04f]" />
                    <p className="text-base font-medium text-[#f2dfc8]">{salonInfo.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 shrink-0 text-[#d4a04f]" />
                    <p className="text-sm uppercase tracking-[0.2em] text-[#d1a35f]">
                      {salonInfo.hours[0]}
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/services" className="button-primary">
                    View Services
                  </Link>
                  <Link
                    href={appConfig.bookingUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-3 text-sm font-semibold text-white transition hover:border-primary/35 hover:bg-white/10"
                  >
                    Reserve Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
