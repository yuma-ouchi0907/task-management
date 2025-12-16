"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { DropdownIcon } from "@/app/tasks/components/icons";
import Field from "./Field";
import { formInputClass } from "./fromInputClass";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  label: string;
  required?: boolean;
  value: T;
  options: readonly Option<T>[];
  onChange: (v: T) => void;
  error?: string;
  disabled?: boolean;

  // Detailで open制御したい時だけ使う
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  menuLabel?: string;
};

export default function SelectMenu<T extends string>({
  label,
  required,
  value,
  options,
  onChange,
  error,
  disabled,
  open,
  onOpenChange,
  menuLabel = "選択してください",
}: Props<T>) {
  const selected = options.find((o) => o.value === value)?.label ?? value;

  return (
    <Field label={label} required={required} error={error}>
      <DropdownMenu {...(open !== undefined ? { open, onOpenChange } : {})}>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <button
            type="button"
            className={formInputClass(
              !!error,
              "flex items-center justify-between px-3 py-2",
            )}
          >
            {selected}
            <DropdownIcon />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="border-border w-40 border bg-[var(--bg-base)]"
        >
          <DropdownMenuLabel className="text-[var(--text-secondary)]">
            {menuLabel}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {options.map((o) => (
            <DropdownMenuItem
              key={o.value}
              onClick={() => {
                onChange(o.value);
                onOpenChange?.(false); // open制御がある時だけ閉じる
              }}
              className={`flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm ${
                o.value === value
                  ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                  : "text-[var(--text-secondary)] hover:opacity-80"
              }`}
            >
              <Check
                size={14}
                className={o.value === value ? "opacity-100" : "opacity-0"}
              />
              {o.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Field>
  );
}
