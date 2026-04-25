import { BookingForm } from "@/components/booking/BookingForm";
import { DataLoadError } from "@/components/shared/DataLoadError";
import { getFeaturedDates } from "@/controllers/dateController";
import { getServiceById, getServices } from "@/controllers/serviceController";
import { getStaff } from "@/controllers/staffController";

interface BookPageProps {
  searchParams?: Promise<{ serviceId?: string }>;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const params = await searchParams;
  try {
    const [selectedService, services, staff, featuredDates] = await Promise.all([
      getServiceById(params?.serviceId),
      getServices(),
      getStaff(),
      getFeaturedDates(),
    ]);

    return (
      <section className="container-shell py-12 lg:py-20">
        <div className="mb-10 space-y-4">
          <p className="section-eyebrow">Booking</p>
          <h1 className="section-title max-w-3xl">Choose one or more services, select a time, and send us your appointment request.</h1>
          <p className="max-w-2xl text-base leading-8 text-foreground/75">
            {selectedService
              ? `You arrived from ${selectedService.name}. We preloaded it into the form for you, and you can add more services before submitting.`
              : "Pick one or more active services below and we will hold the request as pending until confirmed."}
          </p>
        </div>

        <BookingForm
          featuredDates={featuredDates}
          selectedServiceId={selectedService?.id}
          services={services}
          staff={staff}
        />
      </section>
    );
  } catch (error) {
    return (
      <DataLoadError
        title="Unable to load booking data"
        message={error instanceof Error ? error.message : "The booking page could not load services, staff, or dates."}
      />
    );
  }
}
