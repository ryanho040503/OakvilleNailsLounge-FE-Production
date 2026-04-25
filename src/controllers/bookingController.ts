import { format } from "date-fns";

import { appConfig } from "@/config";
import type { TimeSlotAvailability } from "@/types/booking";
import type { Service } from "@/types/service";

export async function getAvailableTimeSlots(date: string) {
  const response = await fetch(
    `${appConfig.apiRoutes.timeSlots}?date=${encodeURIComponent(date)}`,
    { cache: "no-store" },
  );
  const payload = (await response.json()) as {
    success?: boolean;
    message?: string;
    data?: TimeSlotAvailability[];
  };

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message || "Unable to load time slots.");
  }

  return payload.data;
}

export function formatBookingHeadline(date: string, time: string) {
  return `${format(new Date(date), "EEEE, MMMM d")} at ${time}`;
}

export function getSelectedServices(serviceIds: string[], services: Service[]) {
  return services.filter((service) => serviceIds.includes(service.id));
}

export function getBookingSummary(serviceIds: string[], services: Service[]) {
  const selectedServices = getSelectedServices(serviceIds, services);

  return {
    selectedServices,
    totalPrice: selectedServices.reduce((sum, service) => sum + service.price, 0),
    totalDuration: selectedServices.reduce((sum, service) => sum + service.duration_minutes, 0),
  };
}
