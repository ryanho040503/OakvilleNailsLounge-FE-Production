import nodemailer from "nodemailer";

import { appConfig } from "@/config";
import type { Booking } from "@/types/booking";
import type { Customer } from "@/types/customer";
import type { Service } from "@/types/service";

const smtpConfig = {
  host: process.env.SMTP_HOST || "",
  port: Number(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  user: process.env.SMTP_USER || "",
  pass: process.env.SMTP_PASS || "",
  from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
};

export function isEmailConfigured() {
  return Boolean(
    smtpConfig.host &&
      smtpConfig.port &&
      smtpConfig.user &&
      smtpConfig.pass &&
      smtpConfig.from,
  );
}

function createTransporter() {
  return nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });
}

function buildServiceList(services: Service[]) {
  return services.map((service) => `- ${service.name} ($${service.price.toFixed(2)})`).join("\n");
}

export async function sendBookingNotificationEmail(params: {
  booking: Booking;
  customer: Customer;
  notifyTo: string | null;
  services: Service[];
}) {
  if (!isEmailConfigured()) {
    console.warn("[email] SMTP is not configured. Skipping appointment emails.");
    return;
  }

  const { booking, customer, notifyTo, services } = params;
  const transporter = createTransporter();
  const serviceList = buildServiceList(services);
  const totalPrice = services.reduce((sum, service) => sum + service.price, 0).toFixed(2);

  if (notifyTo) {
    await transporter.sendMail({
      from: smtpConfig.from,
      to: notifyTo,
      replyTo: customer.email,
      subject: `New appointment request from ${customer.first_name} ${customer.last_name}`,
      text: [
        "A new appointment request was submitted.",
        "",
        `Customer: ${customer.first_name} ${customer.last_name}`,
        `Email: ${customer.email}`,
        `Phone: ${customer.phone}`,
        `Date: ${booking.appointment_date}`,
        `Time: ${booking.appointment_time}`,
        `Staff: ${booking.staff_id || "No preference"}`,
        `Status: ${booking.status}`,
        "",
        "Services:",
        serviceList,
        "",
        `Estimated total: $${totalPrice}`,
        booking.notes ? `Notes: ${booking.notes}` : "Notes: None",
      ].join("\n"),
    });
  } else {
    console.warn(`[email] No staff email found for booking ${booking.id}. Skipping salon notification.`);
  }

  await transporter.sendMail({
    from: smtpConfig.from,
    to: customer.email,
    subject: "We received your appointment request",
    text: [
      `Hi ${customer.first_name},`,
      "",
      `We received your appointment request for ${booking.appointment_date} at ${booking.appointment_time}.`,
      "",
      "Requested services:",
      serviceList,
      "",
      `Estimated total: $${totalPrice}`,
      "",
      "Your booking is currently marked as Pending. We will contact you to confirm it shortly.",
      "",
      `Salon phone: ${appConfig.phone}`,
      `Salon address: ${appConfig.address}`,
    ].join("\n"),
  });

  console.log(`[email] Appointment emails processed for booking ${booking.id}.`);
}
