import { appConfig } from "@/config";
import type { Staff } from "@/types/staff";

export async function getStaff() {
  const response = await fetch(appConfig.apiRoutes.staff, {
    cache: "no-store",
  });
  const payload = (await response.json()) as {
    success?: boolean;
    message?: string;
    data?: Staff[];
  };

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message || "Unable to load staff.");
  }

  return payload.data;
}
