import Link from "next/link";

export function CallToAction() {
  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="overflow-hidden rounded-[2rem] bg-foreground px-6 py-10 text-white shadow-glow sm:px-10 sm:py-14">
        <p className="section-eyebrow text-white/70">Book Your Visit</p>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl sm:text-5xl">Ready for your next set, refresh, or relaxing self-care appointment?</h2>
            <p className="max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Choose your service, pick a time that works, and send a booking request in just a few minutes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="button-primary bg-white text-foreground hover:bg-secondary">
              Book Now
            </Link>
            <Link href="/contact" className="button-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
