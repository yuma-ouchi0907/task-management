"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "./icons";

type Props = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  edit?: boolean;
};

export function DatePicker({ value, onChange, placeholder, edit }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start border-[var(--border-primary)] bg-[var(--bg-base)] text-left font-normal",
            edit ? "bg-[var(--bg-base)]" : "bg-[var(--bg-base)]/70",
            !value && "text-[var(--text-secondary)]",
          )}
        >
          <CalendarIcon />
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
        />
      </PopoverContent>
    </Popover>
  );
}
