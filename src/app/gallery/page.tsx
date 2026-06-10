import Link from "next/link";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { appConfig } from "@/config";
import { mockGallery } from "@/data/mockData";

export default function GalleryPage() {
  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-4">
          <p className="section-eyebrow">Gallery</p>
          <h1 className="section-title max-w-3xl">Explore nail gallery looks for inspiration before your next appointment.</h1>
          <p className="max-w-2xl text-base leading-8 text-foreground/75">
            Browse glossy neutrals, French details, chrome finishes, and art-forward sets to help guide your booking
            notes.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8">
          <p className="text-sm leading-7 text-foreground/75">
            Found a style you like? Add it to your booking notes and our team can help tailor the look during your
            appointment request.
          </p>
          <Link href={appConfig.bookingUrl} className="button-primary mt-5">
            Book From Gallery
          </Link>
        </div>
      </div>

      <GalleryGrid items={mockGallery} groupByCategory />
    </section>
  );
}
