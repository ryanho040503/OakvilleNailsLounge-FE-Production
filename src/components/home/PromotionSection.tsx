import Image from "next/image";
import Link from "next/link";

import { appConfig } from "@/config";

export function PromotionSection() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background/chatGPT.png')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,153,0.12),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(212,160,79,0.16),transparent_22%),linear-gradient(180deg,rgba(8,6,4,0.92)_0%,rgba(12,9,7,0.9)_36%,rgba(17,12,9,0.94)_100%)]" />
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(212,160,79,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(212,160,79,0.18)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="container-shell relative">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-primary/18 bg-[linear-gradient(180deg,rgba(24,16,11,0.82),rgba(11,8,6,0.94))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:grid-cols-[0.82fr_1.18fr_0.82fr] lg:p-8">
          <div className="flex flex-col justify-between gap-6">
            <div className="w-fit rounded-[1.75rem] border border-primary/18 bg-[linear-gradient(180deg,rgba(34,24,18,0.98),rgba(18,13,10,0.98))] px-6 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.26)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/78">Seasonal Offer</p>
              <div className="mt-3 flex items-end gap-3">
                <p className="font-display text-6xl leading-none text-[#f6e5c9] sm:text-7xl">10%</p>
                <p className="pb-2 text-lg font-semibold uppercase tracking-[0.22em] text-primary">Off</p>
              </div>
              <p className="mt-3 max-w-[16rem] text-sm leading-7 text-[#f4e1c6]/70">
                Enjoy a limited Mother&apos;s Day promotion on your next visit.
              </p>
            </div>

            <div className="space-y-4">
              <p className="inline-flex rounded-full border border-primary/15 bg-primary px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#24160b] shadow-[0_10px_28px_rgba(212,160,79,0.16)]">
                From May 1 To May 18
              </p>
              <div className="space-y-3 text-sm text-[#f4e1c6]/74">
                <p>{appConfig.phone}</p>
                <p>{appConfig.address}</p>
              </div>
              <Link href={appConfig.bookingUrl} className="inline-flex w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#24160b] transition hover:bg-[#e0b166]">
                Book Now
              </Link>
            </div>
          </div>

          <div className="space-y-6 text-center lg:text-left">
            <div className="flex justify-center lg:justify-end">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[#f6d385]/70 bg-black/80 shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                <Image
                  src="/images/logo/logo.png"
                  alt={`${appConfig.appName} logo`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary/80">Limited Promotion</p>
              <h2 className="font-display text-5xl leading-[0.92] text-[#f8ead6] sm:text-6xl">
                Happy
                <br />
                Mother&apos;s Day
              </h2>
              <p className="max-w-xl text-base leading-8 text-[#f4e1c6]/68">
                A warm seasonal thank-you with polished nail looks, a refined salon atmosphere, and a little extra for every order.
              </p>
            </div>

            <div className="mx-auto grid max-w-[520px] gap-4 lg:mx-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border-2 border-primary/35 shadow-[0_26px_80px_rgba(0,0,0,0.28)]">
                <Image
                  src="/images/nails/nails1.jpg"
                  alt="Mother's Day promotion nails"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 28vw, 100vw"
                />
              </div>

              <div className="grid gap-4">
                <div className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-primary/35 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
                  <Image
                    src="/images/nails/EuroSummerPDP_SunsetTide_1.webp"
                    alt="Promotion nail inspiration"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 16vw, 50vw"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-primary/35 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
                  <Image
                    src="/images/nails/gelnailextensions-45a0e3af9df84984bcc5d8b5baa9ed30_e94baae9-9108-4d91-87a8-bd891e6ac451.webp"
                    alt="Promotion nail details"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 16vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-[2rem] border border-primary/20 bg-[linear-gradient(180deg,rgba(37,24,16,0.98),rgba(18,12,9,0.98))] p-6 text-center text-[#f6e5c9] shadow-[0_22px_65px_rgba(0,0,0,0.32)]">
              <p className="text-2xl font-semibold uppercase tracking-[0.12em] text-primary">Plus!</p>
              <p className="mt-4 text-3xl font-semibold leading-tight">A Small Gift With Every Order</p>
              <div className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-primary/20 bg-primary/10 text-5xl shadow-inner">
                🎁
              </div>
              <p className="mt-6 text-lg leading-8 text-[#f4e1c6]/78">Our little way to say thank you, Mom.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
