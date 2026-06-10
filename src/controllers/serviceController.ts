import { appConfig } from "@/config";
import type { Service } from "@/types/service";

const bookingCategoryOrder = [
  "Nail Extensions",
  "Add Ons",
  "Manicure",
  "Pedicure",
  "Combo Services",
  "Kids 12 And Under",
  "Waxing",
  "Take Off",
] as const;

const allowedBookingCategories = new Set<string>(bookingCategoryOrder);

const serviceDisplayOverrides: Record<
  string,
  Partial<Pick<Service, "name" | "category" | "priceLabel">> & { hidden?: boolean; sortOrder?: number }
> = {
  "powder-gel-refill": { sortOrder: 1 },
  "powder-gel-overlay": { sortOrder: 2 },
  "powder-gel-full-set": { sortOrder: 3 },
  "pedicure-shellac-with-refill": { sortOrder: 4 },
  "pedicure-shellac-new-set": { sortOrder: 5 },
  ombre: { sortOrder: 6 },
  "gel-x-full-set": { sortOrder: 7 },
  french: { sortOrder: 8 },
  "extra-length": { priceLabel: "$5.00+", sortOrder: 9 },
  "dual-form-new-set": { sortOrder: 10 },
  "dipping-powder-overlay": { sortOrder: 11 },
  "dipping-powder-new-set-tip": { sortOrder: 12 },
  design: { priceLabel: "$5.00+", sortOrder: 13 },
  chrome: { sortOrder: 14 },
  "bio-gel-refill": { sortOrder: 15 },
  "bio-gel-overlay": { sortOrder: 16 },
  "bio-gel-full-set": { sortOrder: 17 },
  "paraffin-treatment": { sortOrder: 1 },
  "extra-15-foot-massage": { sortOrder: 2 },
  "extra-10-foot-massage": { sortOrder: 3 },
  "shellac-manicure": { sortOrder: 1 },
  "shellac-colour-change-hands": { sortOrder: 2 },
  "reg-colour-change-hands": { sortOrder: 3 },
  "manicure-regular-polish": { sortOrder: 4 },
  "deluxe-shellac-manicure": { sortOrder: 5 },
  "deluxe-manicure-reg-polish": { sortOrder: 6 },
  "shellac-pedicure": { sortOrder: 1 },
  "shellac-colour-change-toes": { sortOrder: 2 },
  "regular-colour-change-toes": { sortOrder: 3 },
  "pedicure-regular-polish": { sortOrder: 4 },
  "luxury-pedicure": { sortOrder: 5 },
  "deluxe-shellac-pedicure": { sortOrder: 6 },
  "deluxe-pedicure-reg-polish": { sortOrder: 7 },
  "collagen-spa-pedicure": { sortOrder: 8 },
  "collagen-spa-pedi-shellac": { sortOrder: 9 },
  "shellac-pedi-shellac-mani": { sortOrder: 1 },
  "shellac-pedi-regular-mani": { sortOrder: 2 },
  "shellac-mani-regular-pedi": { sortOrder: 3 },
  "pedi-mani-reg-colours": { sortOrder: 4 },
  "kid-shellac-change": { sortOrder: 1 },
  "kid-polish-change": { sortOrder: 2 },
  "kid-pedicure": { sortOrder: 3 },
  "kid-manicure": { sortOrder: 4 },
  "upper-lip": { sortOrder: 1 },
  "under-arm": { sortOrder: 2 },
  "half-legs": { sortOrder: 3 },
  "half-arm": { sortOrder: 4 },
  "full-stomach": { sortOrder: 5 },
  "full-legs": { priceLabel: "$50.00+", sortOrder: 6 },
  "full-face": { priceLabel: "$35.00+", sortOrder: 7 },
  "full-back": { sortOrder: 8 },
  "full-arm": { sortOrder: 9 },
  "eyelash-tinting": { priceLabel: "$20.00+", sortOrder: 10 },
  "eyebrow-tinting-and-waxing": { sortOrder: 11 },
  "eyebrow-tinting": { sortOrder: 12 },
  eyebrow: { sortOrder: 13 },
  chin: { sortOrder: 14 },
  chest: { sortOrder: 15 },
  brazilian: { priceLabel: "$45.00+", sortOrder: 16 },
  bikini: { sortOrder: 17 },
  "shellac-take-off": { name: "Shellac Take Off 10 min $10", sortOrder: 1 },
  "nails-take-off": { sortOrder: 2 },
  "volume-eyelash-full-set": { hidden: true },
  "volume-eyelash-fill": { hidden: true },
  "lash-lift-and-tint": { hidden: true },
  "classic-eyelash-full-set": { hidden: true },
  "classic-eyelash-fill": { hidden: true },
  "brow-lamination-and-tint": { hidden: true },
};

function getCategorySortIndex(category: string) {
  const index = bookingCategoryOrder.indexOf(category as (typeof bookingCategoryOrder)[number]);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function normalizeService(service: Service) {
  const override = serviceDisplayOverrides[service.id];

  if (override?.hidden) {
    return null;
  }

  const normalizedCategory = override?.category ?? service.category;

  if (!allowedBookingCategories.has(normalizedCategory)) {
    return null;
  }

  return {
    ...service,
    name: override?.name ?? service.name,
    category: normalizedCategory,
    priceLabel: override?.priceLabel,
  };
}

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

  return payload.data
    .map(normalizeService)
    .filter((service): service is Service => Boolean(service))
    .sort((left, right) => {
      const categoryDelta = getCategorySortIndex(left.category) - getCategorySortIndex(right.category);

      if (categoryDelta !== 0) {
        return categoryDelta;
      }

      const leftOrder = serviceDisplayOverrides[left.id]?.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = serviceDisplayOverrides[right.id]?.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return left.name.localeCompare(right.name);
    });
}

export async function getServiceById(serviceId?: string | null) {
  if (!serviceId) {
    return undefined;
  }

  const services = await getServices();
  return services.find((service) => service.id === serviceId);
}

export function getServiceCategories(services: Service[]) {
  return bookingCategoryOrder.filter((category) => services.some((service) => service.category === category));
}
