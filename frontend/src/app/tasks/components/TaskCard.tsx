import Link from "next/link";
import { useState } from "react";
import { TaskType } from "../type";
import TaskDescriptionModal from "./TaskDescriptionModal";
import { TrashIcon } from "./icons";

import { format } from "date-fns";
import { ja } from "date-fns/locale";

type TaskCardProps = {
  task: TaskType;
};

export default function TaskCard({ task }: TaskCardProps) {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const onCloseModal = () => {
    setSelectedTask(null);
  };

  // yyyy年mm月dd日の形にする
  const formatDate = (date: Date) =>
    format(date, "PPP", {
      locale: ja,
    });

  // 開始日〜終了日の表示
  const formatDateRange = (start?: Date, end?: Date) => {
    if (!start && !end) return "日付未設定";
    if (start && !end) return `${formatDate(start)} -`;
    if (!start && end) return `- ${formatDate(end)}`;
    return `${formatDate(start as Date)} - ${formatDate(end as Date)}`;
  };

  return (
    <>
      {/* タスクがセットされていたらモーダルを開く */}
      {selectedTask !== null && (
        <TaskDescriptionModal task={selectedTask} onCloseModal={onCloseModal} />
      )}
      <article
        onClick={() => setSelectedTask(task)}
        className="bg-[var(--bg-surface)] leading-12 text-[var(--text-primary)] transition-colors duration-200 hover:cursor-pointer"
      >
        <div className="group radius-60 mb-6 rounded-lg border-1 border-[var(--border-primary)] bg-[var(--bg-surface2)] px-3 font-normal hover:bg-[var(--color-primary)]/30 hover:text-white">
          <div className="flex w-full items-center justify-between pt-2 text-lg">
            <h3 className="group-hover:text-[var(--text-primary)]">
              {task.title}
            </h3>
            <Link
              href={`/tasks/delete/${task.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="cursor-pointer rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface2)]/30 hover:text-[var(--text-primary)]"
              aria-label="タスクを削除"
            >
              <TrashIcon />
            </Link>
          </div>
          <p className="font-normal text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
            {formatDateRange(task.startDate, task.endDate)}
          </p>
        </div>
      </article>
    </>
  );
}
