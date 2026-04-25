import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-shell flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="section-eyebrow">Page Not Found</p>
      <h1 className="mt-4 max-w-2xl text-5xl">The page you were looking for is not available.</h1>
      <p className="mt-5 max-w-xl text-base leading-8 text-foreground/75">
        You can head back to the homepage, browse services, or jump straight into booking.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="button-secondary">
          Back to Home
        </Link>
        <Link href="/book" className="button-primary">
          Book Now
        </Link>
      </div>
    </section>
  );
}
