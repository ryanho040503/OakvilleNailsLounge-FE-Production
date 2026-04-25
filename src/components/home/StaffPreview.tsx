import { initialsFromName } from "@/lib/formatters";
import type { Staff } from "@/types/staff";

interface StaffPreviewProps {
  staff: Staff[];
}

export function StaffPreview({ staff }: StaffPreviewProps) {

  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="mb-10 space-y-3">
        <p className="section-eyebrow">Meet The Team</p>
        <h2 className="section-title max-w-3xl">Skilled artists who balance precision, creativity, and a welcoming touch.</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {staff.map((member) => (
          <article key={member.id} className="glass-panel p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
              {initialsFromName(member.name)}
            </div>
            <h3 className="mt-5 text-2xl">{member.name}</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">{member.role}</p>
            <p className="mt-4 text-sm leading-7 text-foreground/75">{member.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
