import Link from "next/link";
import { Clock3, Mail, MapPin, PhoneCall } from "lucide-react";

import { appConfig } from "@/config";

export function ContactSection() {
  return (
    <section className="container-shell pt-32 pb-12 lg:pt-36 lg:pb-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <p className="section-eyebrow">Contact</p>
          <h1 className="section-title max-w-2xl text-[#f6e5c9]">Find us, call us, or book online when you are ready.</h1>
          <p className="max-w-xl text-base leading-8 text-[#f4e1c6]/68">
            We keep the contact experience simple so guests can get the details they need fast and move straight into
            booking.
          </p>
        </div>

        <div className="glass-panel grid gap-5 bg-[linear-gradient(180deg,rgba(20,14,11,0.94),rgba(11,8,6,0.96))] p-6 sm:grid-cols-2 sm:p-8">
          <div className="rounded-[1.5rem] border border-primary/12 bg-[#1c140f] p-5">
            <MapPin className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">Address</p>
            <p className="mt-2 text-sm leading-7 text-[#f4e1c6]/68">{appConfig.address}</p>
          </div>
          <div className="rounded-[1.5rem] border border-primary/12 bg-[#16110d] p-5">
            <PhoneCall className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">Phone</p>
            <p className="mt-2 text-sm leading-7 text-[#f4e1c6]/68">{appConfig.phone}</p>
          </div>
          <div className="rounded-[1.5rem] border border-primary/12 bg-[#16110d] p-5">
            <Mail className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">Email</p>
            <p className="mt-2 text-sm leading-7 text-[#f4e1c6]/68">{appConfig.email}</p>
          </div>
          <div className="rounded-[1.5rem] border border-primary/12 bg-[#1c140f] p-5">
            <Clock3 className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">Hours</p>
            <div className="mt-2 space-y-2 text-sm leading-7 text-[#f4e1c6]/68">
              {appConfig.hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex">
        <Link href={appConfig.bookingUrl} className="button-primary">
          Book Now
        </Link>
      </div>
    </section>
  );
}
