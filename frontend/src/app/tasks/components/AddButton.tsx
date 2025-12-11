import { PlusIcon } from "@/app/tasks/components/icons";
import { ButtonHTMLAttributes, ClassAttributes, JSX } from "react";
import { useRouter } from "next/navigation"; // ← 追加！

export default function AddButton(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const router = useRouter(); // ← 追加！
  return (
    <button
      {...props}
      onClick={() => router.push("/tasks/new")}
      className="transaction flex h-10 w-32 cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--color-primary)] text-sm text-[var(--text-primary)] transition hover:bg-[var(--color-primary)]/80 hover:text-[var(--text-primary)]/80"
    >
      <p className="self-center">タスク追加</p>
      <PlusIcon />
    </button>
  );
}
