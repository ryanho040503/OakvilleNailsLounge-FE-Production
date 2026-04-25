import Link from "next/link";

import type { Service } from "@/types/service";

import { ServiceCard } from "../services/ServiceCard";

interface ServicesPreviewProps {
  services: Service[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const featuredServices = Array.from(
    new Map(services.map((service) => [service.category, service])).values(),
  ).slice(0, 3);

  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="section-eyebrow">Services</p>
          <h2 className="section-title max-w-2xl">Choose your next manicure, pedicure, or custom detail session.</h2>
        </div>
        <Link href="/services" className="button-secondary">
          Browse All Services
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {featuredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
