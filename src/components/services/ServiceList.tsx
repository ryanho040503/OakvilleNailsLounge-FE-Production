"use client";

import { useState } from "react";

import type { Service } from "@/types/service";

import { ServiceCard } from "./ServiceCard";

interface ServiceListProps {
  services: Service[];
  categories: string[];
}

export function ServiceList({ services, categories }: ServiceListProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All" ? services : services.filter((service) => service.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={
              activeCategory === category
                ? "button-primary px-5 py-2.5"
                : "button-secondary px-5 py-2.5"
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
