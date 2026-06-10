"use client";

import Image from "next/image";

import type { GalleryItem } from "@/types/gallery";

interface GalleryGridProps {
  items: GalleryItem[];
  limit?: number;
  groupByCategory?: boolean;
  horizontal?: boolean;
}

const bookingCategories = [
  "Nail Extensions",
  "Add Ons",
  "Manicure",
  "Pedicure",
  "Combo Services",
  "Kids 12 And Under",
  "Waxing",
  "Take Off",
] as const;

function GalleryCards({
  items,
  horizontal = false,
}: {
  items: GalleryItem[];
  horizontal?: boolean;
}) {
  return (
    <div
      className={
        horizontal
          ? "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-4 scroll-smooth touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      }
    >
      {items.map((item) => (
        <article
          key={item.id}
          className={`glass-panel overflow-hidden bg-[#120d0a]/92 ${horizontal ? "w-[280px] shrink-0 snap-start sm:w-[320px]" : ""}`}
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              className="object-cover"
              sizes={horizontal ? "320px" : "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,4,0.05)_0%,rgba(7,5,4,0.2)_45%,rgba(7,5,4,0.86)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
                <span>{item.style}</span>
                <span>{item.color}</span>
              </div>
              <h3 className="mt-3 text-2xl text-[#f6e5c9]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#f4e1c6]/72">{item.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function GalleryGrid({ items, limit, groupByCategory = false }: GalleryGridProps) {
  const renderedItems = typeof limit === "number" ? items.slice(0, limit) : items;

  if (groupByCategory) {
    return (
      <div className="space-y-8">
        {bookingCategories.map((category) => {
          const categoryItems = renderedItems.filter((item) => item.category === category);

          return (
            <section key={category} className="glass-panel space-y-6 p-6 sm:p-8">
              <div className="border-b border-primary/10 pb-4">
                <h2 className="text-2xl text-[#f6e5c9]">{category}</h2>
              </div>

              {categoryItems.length > 0 ? (
                <GalleryCards items={categoryItems} horizontal />
              ) : (
                <p className="text-sm leading-7 text-[#f4e1c6]/60">Gallery items for this category are coming soon.</p>
              )}
            </section>
          );
        })}
      </div>
    );
  }

  return <GalleryCards items={renderedItems} horizontal />;
}
