import { appConfig } from "@/config";

export async function getFeaturedDates() {
  const response = await fetch(appConfig.apiRoutes.featuredDates, {
    cache: "no-store",
  });
  const payload = (await response.json()) as {
    success?: boolean;
    message?: string;
    data?: string[];
  };

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message || "Unable to load featured dates.");
  }

  return payload.data;
}
