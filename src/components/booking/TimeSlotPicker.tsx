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
              ? "cursor-not-allowed border-red-500/30 bg-red-500/10 text-red-300"
              : selectedSlot === slot.time
              ? "border-primary bg-primary text-[#24160b]"
              : "border-primary/15 bg-[#17110d] text-[#f6e5c9] hover:border-primary/35 hover:bg-[#211711]",
          )}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
}
