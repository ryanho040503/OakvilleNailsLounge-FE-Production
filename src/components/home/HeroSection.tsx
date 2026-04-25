import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { salonInfo } from "@/data/mockData";

export function HeroSection() {
  return (
    <section className="container-shell py-10 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="section-eyebrow">Oakville Nail Lounge</p>
            <h1 className="max-w-3xl text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">
              Elevated nail care with a calm, polished booking experience.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/75 sm:text-lg">
              {salonInfo.tagline} Discover signature manicures, restorative pedicures, and detail-led nail art in a
              warm boutique setting.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/book" className="button-primary">
              Book Now
            </Link>
            <Link href="/services" className="button-secondary">
              View Services
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-foreground/70">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Premium finishes
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Friendly service
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Easy online booking
            </div>
          </div>
        </div>

        <div className="glass-panel overflow-hidden p-5 sm:p-7">
          <div className="rounded-[1.75rem] bg-[linear-gradient(145deg,#f0d8cc_0%,#fff5ee_45%,#f6e4d8_100%)] p-6 sm:p-8">
            <div className="rounded-[1.5rem] border border-white/70 bg-white/75 p-6 shadow-2xl">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-primary/70">Featured Experience</p>
                  <h2 className="mt-3 text-3xl">Signature Gel Session</h2>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-primary" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] bg-[#f7efe9] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/70">Time</p>
                  <p className="mt-2 text-2xl font-semibold">60 min</p>
                </div>
                <div className="rounded-[1.4rem] bg-[#fdf8f3] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/70">Starting At</p>
                  <p className="mt-2 text-2xl font-semibold">$45</p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.4rem] bg-foreground p-5 text-white">
                <p className="text-sm leading-7 text-white/80">
                  Thoughtful prep, glossy finish, and careful shaping designed to feel polished long after your visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
