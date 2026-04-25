"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  formatBookingHeadline,
  getAvailableTimeSlots,
  getBookingSummary,
} from "@/controllers/bookingController";
import { bookingSchema } from "@/lib/validators";
import type { BookingFormValues, TimeSlotAvailability } from "@/types/booking";
import type { Service } from "@/types/service";
import type { Staff } from "@/types/staff";

import { BookingConfirmation } from "./BookingConfirmation";
import { TimeSlotPicker } from "./TimeSlotPicker";

interface BookingFormProps {
  featuredDates: string[];
  selectedServiceId?: string | null;
  services: Service[];
  staff: Staff[];
}

function findServiceById(serviceId: string | null | undefined, services: Service[]) {
  return services.find((service) => service.id === serviceId);
}

export function BookingForm({
  featuredDates,
  selectedServiceId,
  services,
  staff,
}: BookingFormProps) {
  const serviceCategories = Array.from(new Set(services.map((service) => service.category)));
  const initialDate = featuredDates[0] ?? format(new Date(), "yyyy-MM-dd");
  const initialServiceIds =
    selectedServiceId && findServiceById(selectedServiceId, services) ? [selectedServiceId] : [];

  const [availableSlots, setAvailableSlots] = useState<TimeSlotAvailability[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationHeadline, setConfirmationHeadline] = useState("");
  const [confirmationServiceCount, setConfirmationServiceCount] = useState(0);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceIds: initialServiceIds,
      staffId: "",
      appointmentDate: initialDate,
      appointmentTime: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const appointmentDate = form.watch("appointmentDate");
  const selectedServiceIds = form.watch("serviceIds") || [];
  const bookingSummary = getBookingSummary(selectedServiceIds, services);

  useEffect(() => {
    let isActive = true;

    async function loadSlots() {
      setIsLoadingSlots(true);

      try {
        const slots = await getAvailableTimeSlots(appointmentDate || initialDate);

        if (!isActive) {
          return;
        }

        setAvailableSlots(slots);

        if (!slots.some((slot) => !slot.booked && slot.time === form.getValues("appointmentTime"))) {
          form.setValue("appointmentTime", "");
        }
      } catch (error) {
        if (!isActive) {
          return;
        }

        setAvailableSlots([]);
        form.setValue("appointmentTime", "");
        toast.error(error instanceof Error ? error.message : "Unable to load time slots.");
      } finally {
        if (isActive) {
          setIsLoadingSlots(false);
        }
      }
    }

    void loadSlots();

    return () => {
      isActive = false;
    };
  }, [appointmentDate, form, initialDate]);

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to submit booking request.");
      }

      startTransition(() => {
        setConfirmationHeadline(formatBookingHeadline(values.appointmentDate, values.appointmentTime));
        setConfirmationServiceCount(values.serviceIds.length);
        form.reset({
          serviceIds: values.serviceIds,
          staffId: values.staffId,
          appointmentDate: initialDate,
          appointmentTime: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          notes: "",
        });
      });

      toast.success("Booking request received");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  });

  if (confirmationHeadline) {
    return (
      <BookingConfirmation
        headline={confirmationHeadline}
        serviceCount={confirmationServiceCount}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
      <aside className="glass-panel h-fit p-6 sm:p-8">
        <p className="section-eyebrow">Appointment Summary</p>
        <h2 className="mt-4 text-3xl">Plan your visit</h2>
        <p className="mt-4 text-sm leading-7 text-foreground/75">
          Choose your services, add your preferred artist if you have one, then submit your request. New bookings are
          saved as pending until the salon confirms.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-[1.5rem] bg-[#fcf5ef] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/70">Selected Services</p>
            <p className="mt-2 text-xl">
              {bookingSummary.selectedServices.length > 0
                ? bookingSummary.selectedServices.map((service) => service.name).join(", ")
                : "Choose one or more services below"}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {bookingSummary.selectedServices.length > 0
                ? `${bookingSummary.totalDuration} min total · $${bookingSummary.totalPrice}`
                : "Service count, total time, and pricing will appear here."}
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-[#fffaf6] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/70">Popular Dates</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featuredDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => form.setValue("appointmentDate", date, { shouldValidate: true })}
                  className="rounded-full border border-primary/10 px-3 py-2 text-xs font-medium hover:border-primary/35"
                >
                  {format(new Date(date), "MMM d")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <form onSubmit={onSubmit} className="glass-panel space-y-8 p-6 sm:p-8">
        <div className="space-y-4">
          <div>
            <p className="section-eyebrow">Booking Form</p>
            <h2 className="mt-4 text-3xl">Reserve your preferred appointment request</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Services</p>
              <div className="space-y-3">
                {serviceCategories.map((category, index) => {
                  const categoryServices = services.filter((service) => service.category === category);

                  return (
                    <details
                      key={category}
                      open={index < 2}
                      className="overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white"
                    >
                      <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-foreground">
                        <div className="flex items-center justify-between gap-4">
                          <span>{category}</span>
                          <span className="text-xs uppercase tracking-[0.2em] text-primary/65">
                            {categoryServices.length} services
                          </span>
                        </div>
                      </summary>
                      <div className="grid gap-px bg-primary/10">
                        {categoryServices.map((service) => (
                          <label
                            key={service.id}
                            className="flex cursor-pointer items-start justify-between gap-4 bg-white px-4 py-3 transition hover:bg-secondary/35"
                          >
                            <span className="flex min-w-0 items-start gap-3">
                              <input
                                type="checkbox"
                                checked={selectedServiceIds.includes(service.id)}
                                onChange={(event) => {
                                  const nextServiceIds = event.target.checked
                                    ? [...selectedServiceIds, service.id]
                                    : selectedServiceIds.filter((id) => id !== service.id);

                                  form.setValue("serviceIds", nextServiceIds, { shouldValidate: true });
                                }}
                                className="mt-1 h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary"
                              />
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold">{service.name}</span>
                                <span className="block text-sm text-foreground/70">
                                  {service.duration_minutes} min
                                </span>
                              </span>
                            </span>
                            <span className="shrink-0 text-sm font-semibold text-primary">
                              ${service.price.toFixed(2)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>
              <p className="text-sm text-red-600">{form.formState.errors.serviceIds?.message}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Staff Preference</p>
              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => form.setValue("staffId", "", { shouldValidate: true })}
                  className={`rounded-[1.25rem] border px-4 py-3 text-left transition ${
                    !form.watch("staffId")
                      ? "border-primary bg-primary text-white"
                      : "border-primary/10 bg-white hover:border-primary/35 hover:bg-secondary/35"
                  }`}
                >
                  <span className="block text-sm font-semibold">No preference</span>
                  <span className={`block text-sm ${!form.watch("staffId") ? "text-white/80" : "text-foreground/70"}`}>
                    We will assign an available technician.
                  </span>
                </button>

                <div className="grid gap-3 sm:grid-cols-2">
                  {staff.map((member) => {
                    const selected = form.watch("staffId") === member.id;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => form.setValue("staffId", member.id, { shouldValidate: true })}
                        className={`rounded-[1.25rem] border px-4 py-4 text-left transition ${
                          selected
                            ? "border-primary bg-primary text-white"
                            : "border-primary/10 bg-white hover:border-primary/35 hover:bg-secondary/35"
                        }`}
                      >
                        <span className="block text-sm font-semibold uppercase tracking-[0.08em]">
                          {member.name}
                        </span>
                        <span className={`mt-1 block text-sm ${selected ? "text-white/80" : "text-foreground/70"}`}>
                          {member.role}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="appointmentDate" className="text-sm font-semibold">
              Appointment Date
            </label>
            <input
              id="appointmentDate"
              type="date"
              min={format(new Date(), "yyyy-MM-dd")}
              {...form.register("appointmentDate")}
              className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
            />
            <p className="text-sm text-red-600">{form.formState.errors.appointmentDate?.message}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Time Slot</p>
            <TimeSlotPicker
              slots={availableSlots}
              selectedSlot={form.watch("appointmentTime")}
              onSelect={(slot) => form.setValue("appointmentTime", slot, { shouldValidate: true })}
            />
            {isLoadingSlots ? (
              <p className="text-xs leading-6 text-foreground/65">Loading available time slots...</p>
            ) : null}
            {!isLoadingSlots && availableSlots.some((slot) => slot.booked) ? (
              <p className="text-xs leading-6 text-foreground/65">
                Red time slots are already booked and cannot be selected.
              </p>
            ) : null}
            <p className="text-xs leading-6 text-foreground/65">
              Available booking start times run from 9:00 AM through 8:00 PM.
            </p>
            <p className="text-sm text-red-600">{form.formState.errors.appointmentTime?.message}</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-semibold">
              First Name
            </label>
            <input
              id="firstName"
              {...form.register("firstName")}
              className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
            />
            <p className="text-sm text-red-600">{form.formState.errors.firstName?.message}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-semibold">
              Last Name
            </label>
            <input
              id="lastName"
              {...form.register("lastName")}
              className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
            />
            <p className="text-sm text-red-600">{form.formState.errors.lastName?.message}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone
            </label>
            <input
              id="phone"
              {...form.register("phone")}
              className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
            />
            <p className="text-sm text-red-600">{form.formState.errors.phone?.message}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
            />
            <p className="text-sm text-red-600">{form.formState.errors.email?.message}</p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-semibold">
            Notes
          </label>
          <textarea
            id="notes"
            rows={5}
            {...form.register("notes")}
            className="w-full rounded-[1.5rem] border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
            placeholder="Share any preferences, nail art ideas, or details we should know."
          />
          <p className="text-sm text-red-600">{form.formState.errors.notes?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting ? "Submitting..." : "Submit Booking Request"}
        </button>
      </form>
    </div>
  );
}
