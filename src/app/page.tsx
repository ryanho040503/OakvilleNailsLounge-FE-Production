import { AboutSection } from "@/components/home/AboutSection";
import { CallToAction } from "@/components/home/CallToAction";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { StaffPreview } from "@/components/home/StaffPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { DataLoadError } from "@/components/shared/DataLoadError";
import { getServices } from "@/controllers/serviceController";
import { getStaff } from "@/controllers/staffController";

export default async function HomePage() {
  try {
    const [services, staff] = await Promise.all([getServices(), getStaff()]);

    return (
      <>
        <HeroSection />
        <ServicesPreview services={services} />
        <AboutSection />
        <GalleryPreview />
        <StaffPreview staff={staff} />
        <TestimonialsSection />
        <ContactSection />
        <CallToAction />
      </>
    );
  } catch (error) {
    return (
      <DataLoadError
        message={error instanceof Error ? error.message : "The homepage could not load services and staff."}
      />
    );
  }
}
