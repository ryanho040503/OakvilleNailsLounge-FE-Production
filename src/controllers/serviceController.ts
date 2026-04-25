import { appConfig } from "@/config";
import type { Service } from "@/types/service";

export async function getServices() {
  const response = await fetch(appConfig.apiRoutes.services, {
    cache: "no-store",
  });
  const payload = (await response.json()) as {
    success?: boolean;
    message?: string;
    data?: Service[];
  };

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message || "Unable to load services.");
  }

  return payload.data;
}

export async function getServiceById(serviceId?: string | null) {
  if (!serviceId) {
    return undefined;
  }

  const services = await getServices();
  return services.find((service) => service.id === serviceId);
}

export function getServiceCategories(services: Service[]) {
  return Array.from(new Set(services.map((service) => service.category)));
}
