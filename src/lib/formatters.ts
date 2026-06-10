export function formatPrice(
  price: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {},
) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  }).format(price);
}

export function formatServicePrice(service: { price: number; priceLabel?: string }) {
  return service.priceLabel ?? formatPrice(service.price, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
