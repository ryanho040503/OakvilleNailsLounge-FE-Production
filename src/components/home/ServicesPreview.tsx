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
    <section className="relative overflow-hidden py-12 lg:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/IndexBackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,4,0.9)_0%,rgba(12,9,7,0.82)_32%,rgba(18,13,10,0.92)_100%)]" />

      <div className="container-shell relative">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="section-eyebrow">Services</p>
            <h2 className="section-title max-w-2xl text-[#f6e5c9]">Choose your next manicure, pedicure, or custom detail session.</h2>
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
      </div>
    </section>
  );
}
