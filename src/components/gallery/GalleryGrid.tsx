"use client";

import { useState } from "react";

import type { GalleryItem } from "@/types/gallery";

interface GalleryGridProps {
  items: GalleryItem[];
  limit?: number;
}

const paletteStyles = [
  "from-[#f1d7cb] via-[#fff4ee] to-[#efd9d0]",
  "from-[#f7efe7] via-[#ffffff] to-[#f0dfd5]",
  "from-[#dcc2b4] via-[#f7ede6] to-[#fbf5f1]",
  "from-[#e6d3cb] via-[#fff6f0] to-[#d8b7a5]",
  "from-[#f5dedd] via-[#fff9f7] to-[#efd5cc]",
  "from-[#cfb4ae] via-[#f9efeb] to-[#e8d2c9]",
];

export function GalleryGrid({ items, limit }: GalleryGridProps) {
  const [activeStyle, setActiveStyle] = useState("All");
  const styles = Array.from(new Set(items.map((item) => item.style)));
  const visibleItems =
    activeStyle === "All" ? items : items.filter((item) => item.style === activeStyle);
  const renderedItems = typeof limit === "number" ? visibleItems.slice(0, limit) : visibleItems;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {["All", ...styles].map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setActiveStyle(style)}
            className={activeStyle === style ? "button-primary px-5 py-2.5" : "button-secondary px-5 py-2.5"}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {renderedItems.map((item, index) => (
          <article key={item.id} className="glass-panel overflow-hidden">
            <div className={`h-64 bg-gradient-to-br ${paletteStyles[index % paletteStyles.length]} p-5`}>
              <div className="flex h-full flex-col justify-between rounded-[1.6rem] border border-white/70 bg-white/30 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                  <span>{item.style}</span>
                  <span>{item.color}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }, (_, nailIndex) => (
                    <div
                      key={`${item.id}-${nailIndex}`}
                      className="h-12 rounded-full border border-white/70 bg-white/65 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground/75">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
