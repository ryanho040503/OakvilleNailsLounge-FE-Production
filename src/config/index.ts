function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

const apiBaseUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_API_BASE_URL || "");

export const appConfig = {
  appName:
    process.env.NEXT_PUBLIC_APP_NAME || "Oakville Nails Lounge (South Oakville Centre)",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL || "https://booking.spacepos.net/?id=h5tfJW3JYjU=",
  tagline:
    process.env.NEXT_PUBLIC_APP_TAGLINE ||
    "Beautiful nails, relaxing experience, effortless booking.",
  phone: process.env.NEXT_PUBLIC_SALON_PHONE || "(905) 825-9797",
  email: process.env.NEXT_PUBLIC_SALON_EMAIL || "nguyentuananh09061999@gmail.com",
  address:
    process.env.NEXT_PUBLIC_SALON_ADDRESS ||
    "1515 Rebecca St, Oakville, ON L6L 5G8, Canada (Beside Gino's Pizza)",
  apiBaseUrl,
  apiRoutes: {
    bookings: apiBaseUrl ? `${apiBaseUrl}/bookings` : "/api/bookings",
    services: apiBaseUrl ? `${apiBaseUrl}/services` : "/api/services",
    staff: apiBaseUrl ? `${apiBaseUrl}/staff` : "/api/staff",
    featuredDates: apiBaseUrl ? `${apiBaseUrl}/featured-dates` : "/api/featured-dates",
    timeSlots: apiBaseUrl ? `${apiBaseUrl}/time-slots` : "/api/time-slots",
    health: apiBaseUrl ? `${apiBaseUrl}/health` : "/api/health",
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },
  hours: [
    "Mon - Sun: 9:00 AM - 8:00 PM",
  ],
} as const;

export const siteMetadata = {
  title: `${appConfig.appName} | Premium Nail Care`,
  description: appConfig.tagline,
} as const;
