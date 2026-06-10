import Link from "next/link";
import { Clock3 } from "lucide-react";

import { appConfig } from "@/config";
import { formatPrice } from "@/lib/formatters";
import type { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="glass-panel flex h-full flex-col bg-[linear-gradient(180deg,rgba(23,17,13,0.95),rgba(12,9,7,0.98))] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">{service.category}</p>
          <h3 className="mt-2 text-2xl text-[#f6e5c9]">{service.name}</h3>
        </div>
        <div className="rounded-full bg-[#221912] px-4 py-2 text-sm font-semibold text-primary">
          {formatPrice(service.price)}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-[#f4e1c6]/68">{service.description}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 text-sm text-[#f3e1c5]/68">
          <Clock3 className="h-4 w-4 text-primary" />
          {service.duration_minutes} min
        </div>
        <Link href={appConfig.bookingUrl} className="button-secondary px-5 py-2.5">
          Book
        </Link>
      </div>
    </article>
  );
}
