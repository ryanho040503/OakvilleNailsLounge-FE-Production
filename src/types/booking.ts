export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export interface TimeSlotAvailability {
  time: string;
  booked: boolean;
}

export interface Booking {
  id: string;
  customer_id: string;
  service_ids: string[];
  staff_id?: string;
  appointment_date: string;
  appointment_time: string;
  status: BookingStatus;
  notes?: string | null;
  created_at: string;
}

export interface BookingFormValues {
  serviceIds: string[];
  staffId?: string;
  appointmentDate: string;
  appointmentTime: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes?: string;
}
