import { cn } from "@/lib/utils";

export const formInputClass = (hasError: boolean, className?: string) =>
  cn(
    // 🔹 常に共通
    "w-full rounded-md border bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors",
    "focus:border-[var(--color-primary)]",

    // 🔹 エラー有無だけ切り替え
    hasError ? "border-[var(--alert)]" : "border-[var(--border-primary)]",

    className,
  );
