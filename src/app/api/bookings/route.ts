import { NextResponse } from "next/server";

import { appConfig } from "@/config";
import { getServices } from "@/controllers/serviceController";
import { sendBookingNotificationEmail } from "@/lib/email";
import { bookingSchema } from "@/lib/validators";
import type { BookingFormValues } from "@/types/booking";
import type { Customer } from "@/types/customer";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingFormValues;
    const values = bookingSchema.parse(body);
    const services = (await getServices()).filter((service) => values.serviceIds.includes(service.id));
    const response = await fetch(appConfig.apiRoutes.bookings, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const payload = (await response.json()) as {
      success?: boolean;
      message?: string;
      status?: string;
      bookingId?: string;
      data?: {
        customer: Customer;
        booking: {
          id: string;
          customer_id: string;
          service_ids: string[];
          staff_id?: string;
          staff_email?: string | null;
          appointment_date: string;
          appointment_time: string;
          status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
          notes?: string | null;
          created_at: string;
        };
      };
    };

    if (!response.ok || !payload.success || !payload.data) {
      return NextResponse.json(
        {
          success: false,
          message: payload.message || "Unable to submit booking request.",
        },
        { status: response.status || 400 },
      );
    }

    await sendBookingNotificationEmail({
      booking: payload.data.booking,
      customer: payload.data.customer,
      notifyTo: payload.data.booking.staff_email || null,
      services,
    });

    return NextResponse.json({
      success: true,
      message: "Booking request received",
      bookingId: payload.data.booking.id,
      status: payload.data.booking.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to submit booking request.",
      },
      { status: 400 },
    );
  }
}
