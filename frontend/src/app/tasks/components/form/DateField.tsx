// components/form/DateField.tsx
"use client";
import Field from "./Field";
import { DatePicker } from "@/app/tasks/components/DatePicker";
import { formInputClass } from "./fromInputClass";

type Props = {
  label: string;
  required?: boolean;
  value?: Date;
  error?: string;
  onChange: (d?: Date) => void;
  placeholder?: string;
};

export default function DateField({
  label,
  required,
  value,
  error,
  onChange,
  placeholder,
}: Props) {
  return (
    <Field label={label} required={required} error={error}>
      <div className={formInputClass(!!error)}>
        <DatePicker
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </Field>
  );
}
