import { format } from "date-fns";

import type { TimeSlotAvailability } from "@/types/booking";
import type { Service } from "@/types/service";

export async function getAvailableTimeSlots(date: string) {
  const url = `/api/time-slots?date=${encodeURIComponent(date)}`;
  console.log("getAvailableTimeSlots url", url);

  const response = await fetch(url, { cache: "no-store" });
  const payload = (await response.json()) as {
    success?: boolean;
    message?: string;
    data?: TimeSlotAvailability[];
  };

  console.log("getAvailableTimeSlots response", {
    url,
    status: response.status,
    ok: response.ok,
    payload,
  });

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
