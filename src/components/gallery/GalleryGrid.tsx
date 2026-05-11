"use client";

import { useState } from "react";

import type { GalleryItem } from "@/types/gallery";

interface GalleryGridProps {
  items: GalleryItem[];
  limit?: number;
}

const paletteStyles = [
  "from-[#1b130e] via-[#2c1c12] to-[#0c0907]",
  "from-[#23170f] via-[#322012] to-[#110c08]",
  "from-[#16110d] via-[#3c2716] to-[#120d09]",
  "from-[#22160f] via-[#342116] to-[#100b08]",
  "from-[#1d140e] via-[#2f1d12] to-[#0e0907]",
  "from-[#20150e] via-[#3a2413] to-[#100b07]",
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
          <article key={item.id} className="glass-panel overflow-hidden bg-[#120d0a]/92">
            <div className={`h-64 bg-gradient-to-br ${paletteStyles[index % paletteStyles.length]} p-5`}>
              <div className="flex h-full flex-col justify-between rounded-[1.6rem] border border-primary/20 bg-black/20 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
                  <span>{item.style}</span>
                  <span>{item.color}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }, (_, nailIndex) => (
                    <div
                      key={`${item.id}-${nailIndex}`}
                      className="h-12 rounded-full border border-primary/20 bg-[linear-gradient(180deg,rgba(255,227,178,0.95),rgba(212,160,79,0.7))] shadow-[0_8px_20px_rgba(212,160,79,0.15)]"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl text-[#f6e5c9]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#f4e1c6]/68">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
