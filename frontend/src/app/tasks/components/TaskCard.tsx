"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TaskType } from "../type";
import { TrashIcon } from "./icons";

import { format } from "date-fns";
import { ja } from "date-fns/locale";

type TaskCardProps = {
  task: TaskType;
};

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter(); // ← hookとして取得

  const formatDate = (date: Date) => format(date, "PPP", { locale: ja });

  const formatDateRange = (start: Date, end: Date) =>
    `${formatDate(start)} - ${formatDate(end)}`;

  return (
    <article
      onClick={() => router.push(`/tasks/detail/${task.id}`, { scroll: false })}
      className="bg-[var(--bg-surface)] leading-12 text-[var(--text-primary)] transition-colors duration-200 hover:cursor-pointer"
    >
      <div className="group mb-6 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-surface2)] px-3 hover:bg-[var(--color-primary)]/30">
        <div className="flex w-full items-center justify-between pt-2 text-lg">
          <h3>{task.title}</h3>

          <Link
            href={`/tasks/delete/${task.id}`}
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface2)]/30 hover:text-[var(--text-primary)]"
            aria-label="タスク削除"
          >
            <TrashIcon />
          </Link>
        </div>

        <p className="text-[var(--text-secondary)]">
          {formatDateRange(task.startDate, task.endDate)}
        </p>
      </div>
    </article>
  );
}
