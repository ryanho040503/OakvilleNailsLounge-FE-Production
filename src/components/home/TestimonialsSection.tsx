import { mockTestimonials } from "@/data/mockData";

export function TestimonialsSection() {
  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="mb-10 space-y-3">
        <p className="section-eyebrow">Guest Notes</p>
        <h2 className="section-title max-w-3xl">A few of the reasons clients keep returning for their next appointment.</h2>
      </div>

      <div className="scrollbar-hidden -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {mockTestimonials.map((testimonial) => (
          <blockquote
            key={testimonial.name}
            className="glass-panel min-w-[280px] flex-[0_0_280px] snap-start p-6 sm:min-w-[360px] sm:flex-[0_0_360px]"
          >
            <p className="text-lg leading-8 text-foreground/80">“{testimonial.quote}”</p>
            <footer className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
              {testimonial.name}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
