import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface BookingConfirmationProps {
  headline: string;
  serviceCount: number;
}

export function BookingConfirmation({ headline, serviceCount }: BookingConfirmationProps) {
  return (
    <div className="glass-panel p-6 sm:p-8">
      <CheckCircle2 className="h-10 w-10 text-primary" />
      <h3 className="mt-5 text-3xl">Thank you! Your booking request has been received.</h3>
      <p className="mt-4 text-sm leading-7 text-foreground/75">
        We will contact you to confirm your appointment. Your requested visit is {headline} for{" "}
        {serviceCount} {serviceCount === 1 ? "service" : "services"}.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="button-secondary">
          Back to Home
        </Link>
        <Link href="/services" className="button-primary">
          View Services
        </Link>
      </div>
    </div>
  );
}
