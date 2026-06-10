import Image from "next/image";

export function AboutSection() {
  const highlights = [
    {
      title: "Clean, elevated environment",
      copy: "Soft finishes, calm tones, and a customer-first pace create a more relaxing appointment.",
    },
    {
      title: "Detail-led artists",
      copy: "Our team focuses on thoughtful prep, strong shaping, and looks that feel intentional.",
    },
    {
      title: "Simple booking flow",
      copy: "Browse services, pick a time, and submit a request without wading through clutter.",
    },
    {
      title: "Made for repeat visits",
      copy: "Service options stay clear and flexible so guests can come back with confidence.",
    },
  ];

  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel overflow-hidden p-0">
          <div className="relative">
            <Image
              src="/images/nails/nails1.jpg"
              alt="Nail design close-up"
              width={896}
              height={1195}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.22)_0%,rgba(10,8,6,0.48)_100%)]" />
          </div>
        </div>

        <div className="glass-panel bg-[linear-gradient(180deg,rgba(30,21,15,0.94),rgba(17,12,9,0.94))] p-8 sm:p-10">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="mt-4 text-4xl text-[#f6e5c9]">
            A boutique atmosphere built around comfort, care, and polished results.
          </h2>

          <div className="mt-8 space-y-6">
            {highlights.map((item) => (
              <div key={item.title} className="border-b border-primary/10 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-2xl text-[#f4e1c6]">{item.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#f4e1c6]/68">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
