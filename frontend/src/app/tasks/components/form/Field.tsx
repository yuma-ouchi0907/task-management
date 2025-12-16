"use client";
import { ReactNode } from "react";

type Props = {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export default function Field({ label, required, error, children }: Props) {
  return (
    <div>
      <label className="mb-2 block text-[var(--text-secondary)]">
        {label}
        {required && <span className="text-[var(--alert)]"> *</span>}
      </label>

      {children}

      {error && (
        <p role="alert" className="mt-2 text-xs text-[var(--alert)]">
          {error}
        </p>
      )}
    </div>
  );
}
