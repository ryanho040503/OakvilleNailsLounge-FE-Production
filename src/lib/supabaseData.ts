import fs from "fs";
import path from "path";
import { addMinutes, format } from "date-fns";
import { createClient } from "@supabase/supabase-js";

import { appConfig } from "@/config";
import type { Booking, BookingFormValues } from "@/types/booking";
import type { Customer } from "@/types/customer";
import type { Service } from "@/types/service";
import type { Staff } from "@/types/staff";

type ServiceDimension = {
  service_key: number;
  service_id: string;
  service_name: string;
  service_category: string;
  standard_duration_minutes: number;
  standard_price: number | string;
};

type StaffDimension = {
  staff_key: number;
  staff_id: string;
  staff_name: string;
  role: string | null;
  is_active: boolean | null;
  email?: string | null;
};

type CustomerDimension = {
  customer_key: number;
  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

function getSupabaseClient() {
  let supabaseUrl = appConfig.supabase.url;
  let supabaseAnonKey = appConfig.supabase.anonKey;

  if (!supabaseUrl || !supabaseAnonKey) {
    const backendEnvPath = path.resolve(process.cwd(), "..", "BackEnd", ".env");

    if (fs.existsSync(backendEnvPath)) {
      const contents = fs.readFileSync(backendEnvPath, "utf8");

      for (const line of contents.split("\n")) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) {
          continue;
        }

        const separatorIndex = trimmed.indexOf("=");

        if (separatorIndex === -1) {
          continue;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        const value = trimmed.slice(separatorIndex + 1).trim();

        if (key === "SUPABASE_URL" && !supabaseUrl) {
          supabaseUrl = value;
        }

        if (key === "SUPABASE_ANON_KEY" && !supabaseAnonKey) {
          supabaseAnonKey = value;
        }
      }
    }
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase is not configured in FrontEnd/.env or BackEnd/.env.",
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function toService(row: ServiceDimension): Service {
  return {
    id: row.service_id,
    name: row.service_name,
    category: row.service_category,
    description: `${row.service_name} in the ${row.service_category} category.`,
    duration_minutes: row.standard_duration_minutes,
    price: Number(row.standard_price),
    is_active: true,
  };
}

function formatTimeLabel(timeValue: string) {
  const [hourPart, minutePart] = timeValue.slice(0, 5).split(":");
  const hours = Number(hourPart);
  const meridiem = hours >= 12 ? "PM" : "AM";
  const normalizedHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${normalizedHour}:${minutePart} ${meridiem}`;
}

function toStaff(row: StaffDimension): Staff {
  return {
    id: row.staff_id,
    name: row.staff_name,
    role: row.role || "Nail Technician",
    bio: row.email ? `Reach ${row.staff_name} at ${row.email}.` : `${row.staff_name} is available for booking appointments.`,
    is_active: row.is_active ?? true,
  };
}

function getDateKey(date: string) {
  return Number(date.replaceAll("-", ""));
}

function to24HourTime(label: string) {
  const [timePart, meridiem] = label.split(" ");
  const [hourString, minuteString] = timePart.split(":");
  let hours = Number(hourString);
  const minutes = Number(minuteString);

  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  }

  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

type FactBookingRow = {
  staff_key: number;
  appointment_start_at: string;
  appointment_end_at: string | null;
  duration_minutes: number | null;
};

async function getNextNumericKey(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  table: string,
  keyColumn: string,
) {
  const { data, error } = await supabase
    .from(table)
    .select(keyColumn)
    .order(keyColumn, { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(`Unable to read ${table}.${keyColumn} for key generation.`);
  }

  return data && Array.isArray(data) && data.length > 0
    ? Number((data[0] as unknown as Record<string, number | string | null>)[keyColumn] ?? 0) + 1
    : 1;
}

async function ensureDateDimension(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  date: string,
) {
  const dateKey = getDateKey(date);
  const { data, error } = await supabase
    .from("dim_date")
    .select("date_key")
    .eq("date_key", dateKey)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to read dim_date.");
  }

  if (data) {
    return data.date_key;
  }

  const dateValue = new Date(`${date}T00:00:00`);
  const insertPayload = {
    date_key: dateKey,
    full_date: date,
    day: dateValue.getDate(),
    month: dateValue.getMonth() + 1,
    year: dateValue.getFullYear(),
    day_of_week: format(dateValue, "EEEE"),
  };

  const { error: insertError } = await supabase.from("dim_date").insert(insertPayload);

  if (insertError) {
    throw new Error("Unable to insert dim_date.");
  }

  return dateKey;
}

async function ensureTimeSlotDimension(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  timeLabel: string,
) {
  const startTime = to24HourTime(timeLabel);
  const endTime = format(addMinutes(new Date(`2000-01-01T${startTime}`), 30), "HH:mm:ss");

  const { data, error } = await supabase
    .from("dim_time_slot")
    .select("time_slot_key")
    .eq("start_time", startTime)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to read dim_time_slot.");
  }

  if (data) {
    return data.time_slot_key;
  }

  const timeSlotKey = await getNextNumericKey(supabase, "dim_time_slot", "time_slot_key");
  const hour = Number(startTime.slice(0, 2));
  const dayPart = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";

  const { error: insertError } = await supabase.from("dim_time_slot").insert({
    time_slot_key: timeSlotKey,
    start_time: startTime,
    end_time: endTime,
    day_part: dayPart,
  });

  if (insertError) {
    throw new Error("Unable to insert dim_time_slot.");
  }

  return timeSlotKey;
}

async function ensureBookingStatus(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  statusName: string,
) {
  const { data, error } = await supabase
    .from("dim_booking_status")
    .select("status_key")
    .eq("status_name", statusName)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to read dim_booking_status.");
  }

  if (data) {
    return data.status_key;
  }

  const statusKey = await getNextNumericKey(supabase, "dim_booking_status", "status_key");
  const { error: insertError } = await supabase.from("dim_booking_status").insert({
    status_key: statusKey,
    status_name: statusName,
  });

  if (insertError) {
    throw new Error("Unable to insert dim_booking_status.");
  }

  return statusKey;
}

async function ensureCustomerDimension(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  values: BookingFormValues,
) {
  const { data, error } = await supabase
    .from("dim_customer")
    .select("customer_key, customer_id, first_name, last_name, phone, email")
    .eq("email", values.email)
    .eq("phone", values.phone)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to read dim_customer.");
  }

  if (data) {
    return data as CustomerDimension;
  }

  const customerKey = await getNextNumericKey(supabase, "dim_customer", "customer_key");
  const customerId = `cust-${customerKey}`;

  const insertPayload = {
    customer_key: customerKey,
    customer_id: customerId,
    first_name: values.firstName,
    last_name: values.lastName,
    phone: values.phone,
    email: values.email,
  };

  const { error: insertError } = await supabase.from("dim_customer").insert(insertPayload);

  if (insertError) {
    throw new Error("Unable to insert dim_customer.");
  }

  return insertPayload;
}

async function getServiceDimensions(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  serviceIds: string[],
) {
  const { data, error } = await supabase
    .from("dim_service")
    .select(
      "service_key, service_id, service_name, service_category, standard_duration_minutes, standard_price",
    )
    .in("service_id", serviceIds);

  if (error || !data || data.length !== serviceIds.length) {
    throw new Error("One or more selected services are no longer available.");
  }

  return data as ServiceDimension[];
}

async function resolveStaffDimension(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  staffId?: string,
) {
  if (staffId) {
    const { data, error } = await supabase
      .from("dim_staff")
      .select("staff_key, staff_id, staff_name, role, is_active, email")
      .eq("staff_id", staffId)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      throw new Error("Unable to read dim_staff.");
    }

    if (data) {
      return data as StaffDimension;
    }
  }

  const { data, error } = await supabase
    .from("dim_staff")
    .select("staff_key, staff_id, staff_name, role, is_active, email")
    .eq("is_active", true)
    .order("staff_key", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    throw new Error("No active staff is available in dim_staff.");
  }

  return data as StaffDimension;
}

function getBookingWindow(row: FactBookingRow) {
  const startAt = new Date(row.appointment_start_at);

  if (Number.isNaN(startAt.getTime())) {
    return null;
  }

  const endAtFromRow = row.appointment_end_at ? new Date(row.appointment_end_at) : null;
  const hasUsableEndAt =
    endAtFromRow instanceof Date &&
    !Number.isNaN(endAtFromRow.getTime()) &&
    endAtFromRow.getTime() > startAt.getTime();

  return {
    staffKey: row.staff_key,
    startAt,
    endAt: hasUsableEndAt ? endAtFromRow : addMinutes(startAt, Number(row.duration_minutes) || 0),
  };
}

function rangesOverlap(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA < endB && endA > startB;
}

function getBusyStaffKeysForWindow(bookings: FactBookingRow[], windowStartAt: Date, windowEndAt: Date) {
  const busyStaffKeys = new Set<number>();

  for (const row of bookings) {
    const bookingWindow = getBookingWindow(row);

    if (!bookingWindow) {
      continue;
    }

    if (rangesOverlap(bookingWindow.startAt, bookingWindow.endAt, windowStartAt, windowEndAt)) {
      busyStaffKeys.add(bookingWindow.staffKey);
    }
  }

  return busyStaffKeys;
}

async function getBookingsForDate(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  appointmentDateKey: number,
) {
  const { data, error } = await supabase
    .from("fact_booking")
    .select("staff_key, appointment_start_at, appointment_end_at, duration_minutes")
    .eq("appointment_date_key", appointmentDateKey);

  if (error || !data) {
    throw new Error("Unable to read fact_booking.");
  }

  return data as FactBookingRow[];
}

async function getActiveStaffDimensions(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
) {
  const { data, error } = await supabase
    .from("dim_staff")
    .select("staff_key, staff_id, staff_name, role, is_active, email")
    .eq("is_active", true)
    .order("staff_key", { ascending: true });

  if (error || !data || data.length === 0) {
    throw new Error("No active staff is available in dim_staff.");
  }

  return data as StaffDimension[];
}

async function resolveAvailableStaffDimension(
  supabase: NonNullable<ReturnType<typeof getSupabaseClient>>,
  staffId: string | undefined,
  appointmentDateKey: number,
  appointmentStartAt: Date,
  appointmentEndAt: Date,
) {
  const [activeStaff, bookings] = await Promise.all([
    getActiveStaffDimensions(supabase),
    getBookingsForDate(supabase, appointmentDateKey),
  ]);
  const busyStaffKeys = getBusyStaffKeysForWindow(bookings, appointmentStartAt, appointmentEndAt);

  if (staffId) {
    const preferredStaff = activeStaff.find((staffMember) => staffMember.staff_id === staffId);

    if (!preferredStaff) {
      throw new Error("The selected staff member is not available.");
    }

    if (busyStaffKeys.has(preferredStaff.staff_key)) {
      const error = new Error("That time slot is no longer available for the selected staff member. Please choose another time.");
      (error as Error & { statusCode?: number }).statusCode = 409;
      throw error;
    }

    return preferredStaff;
  }

  const availableStaff = activeStaff.find((staffMember) => !busyStaffKeys.has(staffMember.staff_key));

  if (!availableStaff) {
    const error = new Error("That time slot is no longer available. Please choose another time.");
    (error as Error & { statusCode?: number }).statusCode = 409;
    throw error;
  }

  return availableStaff;
}

export function isSupabaseConfigured() {
  return Boolean(appConfig.supabase.url && appConfig.supabase.anonKey);
}

export async function getStaffNotificationEmail(staffId?: string) {
  const supabase = getSupabaseClient();
  const staffDimension = await resolveStaffDimension(supabase, staffId);
  return staffDimension.email || null;
}

export async function getServicesFromDataSource() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("dim_service")
    .select(
      "service_key, service_id, service_name, service_category, standard_duration_minutes, standard_price",
    )
    .order("service_category", { ascending: true })
    .order("service_name", { ascending: true });

  if (error || !data) {
    throw new Error("Unable to load services from dim_service.");
  }

  return (data as ServiceDimension[]).map(toService);
}

export async function getStaffFromDataSource() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("dim_staff")
    .select("staff_key, staff_id, staff_name, role, is_active, email")
    .eq("is_active", true)
    .order("staff_name", { ascending: true });

  if (error || !data) {
    throw new Error("Unable to load staff from dim_staff.");
  }

  return (data as StaffDimension[]).map(toStaff);
}

export async function getTimeSlotsFromDataSource() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("dim_time_slot")
    .select("time_slot_key, start_time")
    .order("start_time", { ascending: true });

  if (error || !data) {
    throw new Error("Unable to load time slots from dim_time_slot.");
  }

  if (data.length === 0) {
    throw new Error("No time slots are available in dim_time_slot.");
  }

  return data.map((row) => formatTimeLabel(String(row.start_time)));
}

export async function createBookingInDataSource(values: BookingFormValues) {
  const supabase = getSupabaseClient();
  const [serviceDimensions, customerDimension, bookingDateKey, appointmentDateKey, timeSlotKey, statusKey] =
    await Promise.all([
      getServiceDimensions(supabase, values.serviceIds),
      ensureCustomerDimension(supabase, values),
      ensureDateDimension(supabase, format(new Date(), "yyyy-MM-dd")),
      ensureDateDimension(supabase, values.appointmentDate),
      ensureTimeSlotDimension(supabase, values.appointmentTime),
      ensureBookingStatus(supabase, "Pending"),
    ]);
  const appointmentStartAt = new Date(`${values.appointmentDate}T${to24HourTime(values.appointmentTime)}`);
  const totalDurationMinutes = serviceDimensions.reduce(
    (sum, serviceDimension) => sum + Number(serviceDimension.standard_duration_minutes),
    0,
  );
  const appointmentEndAt = addMinutes(appointmentStartAt, totalDurationMinutes);
  const staffDimension = await resolveAvailableStaffDimension(
    supabase,
    values.staffId,
    appointmentDateKey,
    appointmentStartAt,
    appointmentEndAt,
  );
  const bookingCreatedAt = new Date().toISOString();
  const baseBookingId = await getNextNumericKey(supabase, "fact_booking", "booking_id");
  let serviceStartAt = appointmentStartAt;

  const factRows = serviceDimensions.map((serviceDimension, index) => {
    const durationMinutes = Number(serviceDimension.standard_duration_minutes);
    const serviceEndAt = addMinutes(serviceStartAt, durationMinutes);
    const factRow = {
      booking_id: baseBookingId + index,
      customer_key: customerDimension.customer_key,
      staff_key: staffDimension.staff_key,
      service_key: serviceDimension.service_key,
      booking_date_key: bookingDateKey,
      appointment_date_key: appointmentDateKey,
      time_slot_key: timeSlotKey,
      status_key: statusKey,
      booking_created_at: bookingCreatedAt,
      appointment_start_at: serviceStartAt.toISOString(),
      appointment_end_at: serviceEndAt.toISOString(),
      duration_minutes: durationMinutes,
      service_price: Number(serviceDimension.standard_price),
      discount_amount: 0,
      tip_amount: 0,
      tax_amount: 0,
      total_amount: Number(serviceDimension.standard_price),
      is_walk_in: false,
    };

    serviceStartAt = serviceEndAt;
    return factRow;
  });

  const { error: insertError } = await supabase.from("fact_booking").insert(factRows);

  if (insertError) {
    throw new Error("Unable to insert fact_booking rows.");
  }

  const customer: Customer = {
    id: customerDimension.customer_id,
    first_name: customerDimension.first_name,
    last_name: customerDimension.last_name,
    phone: customerDimension.phone,
    email: customerDimension.email,
    created_at: bookingCreatedAt,
  };

  const booking: Booking & { staff_email?: string | null } = {
    id: String(baseBookingId),
    customer_id: customerDimension.customer_id,
    service_ids: values.serviceIds,
    staff_id: staffDimension.staff_id,
    staff_email: staffDimension.email || null,
    appointment_date: values.appointmentDate,
    appointment_time: values.appointmentTime,
    status: "Pending",
    notes: values.notes || undefined,
    created_at: bookingCreatedAt,
  };

  return { customer, booking };
}
