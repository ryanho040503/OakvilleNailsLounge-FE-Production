export function AboutSection() {
  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel p-8 sm:p-10">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="mt-4 text-4xl">A boutique atmosphere built around comfort, care, and polished results.</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
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
          ].map((item) => (
            <div key={item.title} className="glass-panel p-6">
              <h3 className="text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground/75">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
