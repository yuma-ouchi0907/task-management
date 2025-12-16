"use client";

export default function FormErrorBanner({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="rounded-md border-none bg-[var(--alert)] px-4 py-3 text-sm text-[var(--text-primary)]"
    >
      {message}
    </div>
  );
}