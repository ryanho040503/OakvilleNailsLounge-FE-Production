import Link from "next/link";

import { mockGallery } from "@/data/mockData";

import { GalleryGrid } from "../gallery/GalleryGrid";

export function GalleryPreview() {
  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="section-eyebrow">Nail Gallery</p>
          <h2 className="section-title max-w-3xl">A place to browse finish ideas, colors, and styles before you book.</h2>
        </div>
        <Link href="/gallery" className="button-secondary">
          View Full Gallery
        </Link>
      </div>

      <GalleryGrid items={mockGallery} limit={3} />
    </section>
  );
}
