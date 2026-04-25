import { cn } from "@/lib/utils";
import type { TimeSlotAvailability } from "@/types/booking";

interface TimeSlotPickerProps {
  slots: TimeSlotAvailability[];
  selectedSlot?: string;
  onSelect: (slot: string) => void;
}

export function TimeSlotPicker({ slots, selectedSlot, onSelect }: TimeSlotPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {slots.map((slot) => (
        <button
          key={slot.time}
          type="button"
          onClick={() => {
            if (!slot.booked) {
              onSelect(slot.time);
            }
          }}
          disabled={slot.booked}
          className={cn(
            "rounded-2xl border px-4 py-3 text-sm font-medium transition",
            slot.booked
              ? "cursor-not-allowed border-red-200 bg-red-50 text-red-500"
              : selectedSlot === slot.time
              ? "border-primary bg-primary text-white"
              : "border-primary/10 bg-white text-foreground hover:border-primary/35 hover:bg-secondary/50",
          )}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
}
