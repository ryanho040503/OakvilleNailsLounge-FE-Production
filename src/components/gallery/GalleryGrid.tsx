"use client";

import type { GalleryItem } from "@/types/gallery";

interface GalleryGridProps {
  items: GalleryItem[];
  limit?: number;
  groupByCategory?: boolean;
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

const paletteStyles = [
  "from-[#1b130e] via-[#2c1c12] to-[#0c0907]",
  "from-[#23170f] via-[#322012] to-[#110c08]",
  "from-[#16110d] via-[#3c2716] to-[#120d09]",
  "from-[#22160f] via-[#342116] to-[#100b08]",
  "from-[#1d140e] via-[#2f1d12] to-[#0e0907]",
  "from-[#20150e] via-[#3a2413] to-[#100b07]",
];

function GalleryCards({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">{item.category}</p>
            <h3 className="mt-3 text-2xl text-[#f6e5c9]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#f4e1c6]/68">{item.description}</p>
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
                <GalleryCards items={categoryItems} />
              ) : (
                <p className="text-sm leading-7 text-[#f4e1c6]/60">Gallery items for this category are coming soon.</p>
              )}
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <GalleryCards items={renderedItems} />
  );
}
