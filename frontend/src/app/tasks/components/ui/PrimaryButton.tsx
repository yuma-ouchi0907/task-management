import { PrimaryButtonProps } from "@/app/tasks/type";

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`flex cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--color-primary)] text-sm font-medium text-[var(--text-primary)] transition duration-200 hover:bg-[var(--color-primary)]/80 hover:text-[var(--text-primary)]/80 ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}
