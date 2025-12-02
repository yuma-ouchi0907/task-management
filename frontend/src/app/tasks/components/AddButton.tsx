import { PlusIcon } from "./icons";
import { ButtonHTMLAttributes, ClassAttributes, JSX, useContext } from "react";
import { AddContext } from "@/app/tasks/page";

export default function AddButton(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const [, setIsAdding] = useContext(AddContext);
  return (
    <button
      {...props}
      onClick={() => setIsAdding((prev) => !prev)}
      className="transaction flex h-10 w-36 cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--color-primary)] text-sm text-[var(--text-primary)] transition hover:bg-[var(--color-primary)]/80 hover:text-[var(--text-primary)]/80"
    >
      <p className="self-center">タスクを追加</p>
      <PlusIcon />
    </button>
  );
}
