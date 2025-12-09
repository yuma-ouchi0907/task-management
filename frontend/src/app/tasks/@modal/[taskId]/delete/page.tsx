"use client";

import { useRouter, useParams } from "next/navigation";
import { useTaskContext } from "@/app/tasks/context/TaskContext"; // ← 追加

export default function DeleteTaskModal() {
  const router = useRouter();
  const params = useParams();
  const { tasks, deleteTask } = useTaskContext(); // ← グローバルから削除機能取得

  const taskId = Number(params.taskId);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--bg-surface)]">
        <p className="text-[var(--text-secondary)]">タスクが見つかりません。</p>
      </div>
    );
  }

  // モーダルを閉じる
  const closeModal = () => {
    router.back();
  };

  // 削除処理
  const handleDelete = () => {
    deleteTask(task.id); // ← タスク削除
    router.back();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-surface)]/50 backdrop-blur-sm"
      onClick={closeModal} // ← 背景クリックで閉じる
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[var(--bg-surface2)] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // ← 内側クリックは閉じない
      >
        <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
          タスクを削除
        </h2>

        <p className="mb-6 text-lg font-semibold text-[var(--text-primary)]">
          {task.title}
        </p>

        <p className="mb-8 text-[var(--text-secondary)]">
          このタスクを削除してもよろしいですか？
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="flex-1 rounded-lg bg-[var(--alert)] py-2 text-white hover:bg-[var(--alert)]/80"
          >
            削除
          </button>

          <button
            onClick={closeModal}
            className="flex-1 rounded-lg border border-[var(--border-primary)] py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-base)]"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
