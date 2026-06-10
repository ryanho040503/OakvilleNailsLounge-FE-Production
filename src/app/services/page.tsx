import { DataLoadError } from "@/components/shared/DataLoadError";
import { ServiceList } from "@/components/services/ServiceList";
import { getServiceCategories, getServices } from "@/controllers/serviceController";

export default async function ServicesPage() {
  try {
    const services = await getServices();

    return (
      <section className="container-shell pt-32 pb-12 lg:pt-36 lg:pb-20">
        <div className="mb-10 space-y-4">
          <p className="section-eyebrow">Services</p>
          <h1 className="section-title max-w-3xl">Explore signature treatments designed for everyday polish and special occasions.</h1>
          <p className="max-w-2xl text-base leading-8 text-foreground/75">
            Browse by category, compare timing and price, and jump into booking from any service card.
          </p>
        </div>

        <ServiceList services={services} categories={getServiceCategories(services)} />
      </section>
    );
  } catch (error) {
    return (
      <DataLoadError
        title="Unable to load services"
        message={error instanceof Error ? error.message : "The services page could not load data."}
      />
    );
  }
}
