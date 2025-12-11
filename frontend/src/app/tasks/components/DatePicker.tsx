"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

type Props = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
};

export function DatePicker({ value, onChange, placeholder }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start border-[var(--border-primary)] bg-[var(--bg-base)] text-left font-normal text-[var(--text-primary)]",
            !value && "text-[var(--text-secondary)]",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[var(--text-secondary)]" />
          {value ? format(value, "PPP", { locale: ja }) : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto border-[var(--border-primary)] bg-[var(--bg-surface2)] p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange(d);
            setOpen(false);
          }}
          locale={ja}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
