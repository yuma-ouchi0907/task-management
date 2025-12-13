import { CloseIcon, DropdownIcon } from "@/app/tasks/components/icons";
import { useTaskContext } from "@/app/tasks/context/TaskContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { TaskType } from "../type";
import { DatePicker } from "./DatePicker";
import PrimaryButton from "./ui/PrimaryButton";

type TaskDescriptionModalType = {
  task: TaskType;
  onCloseModal: () => void;
};

type PriorityLabel = "高" | "中" | "低";

const priorityLabelMap: Record<TaskType["priority"], PriorityLabel> = {
  High: "高",
  Medium: "中",
  Low: "低",
};

// 優先度のセレクト要素
const priorityOptions: {
  value: TaskType["priority"];
  label: PriorityLabel;
}[] = [
  { value: "High", label: "高" },
  { value: "Medium", label: "中" },
  { value: "Low", label: "低" },
];

export default function TaskDescriptionModal({
  task,
  onCloseModal,
}: TaskDescriptionModalType) {
  const { updateTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);
  const [priority, setPriority] = useState<TaskType["priority"]>(task.priority);
  const [description, setDescription] = useState<string>(task.description);
  const [startDate, setStartDate] = useState<Date>(task.startDate);
  const [dueDate, setDueDate] = useState<Date>(task.dueDate);
  const [endDate, setEndDate] = useState<Date>(task.endDate);
  const [updatedAtDisplay, setUpdatedAtDisplay] = useState<Date>(
    task.updatedAt,
  );

  // taskが変動するたびに以下処理を更新
  useEffect(() => {
    setTitle(task.title);
    setPriority(task.priority);
    setDescription(task.description);
    setStartDate(task.startDate);
    setDueDate(task.dueDate);
    setEndDate(task.endDate);
    setUpdatedAtDisplay(task.updatedAt);
    setIsEditing(false);
  }, [task]);

  // yyyy年MM月dd日の形にする
  const formatDate = (date: Date) =>
    format(date, "PPP", {
      locale: ja,
    });

  // 優先度に応じてcssを変更する
  const priorityBadgeClassName: Record<TaskType["priority"], string> = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  // 保存ボタンを押したときの処理
  const handleSave = () => {
    // if (!title.trim()) return;
    // ここに未入力の選択があればエラーアラートを表示させる処理を追加してほしい！

    const now = new Date();
    const nextStartDate = startDate ?? task.startDate;
    const nextEndDate = endDate ?? task.endDate;
    const nextDueDate = dueDate ?? task.dueDate;
    updateTask(task.id, {
      title,
      description,
      priority,
      startDate: nextStartDate,
      endDate: nextEndDate,
      dueDate: nextDueDate,
      updatedAt: now,
    });
    Object.assign(task, {
      title,
      description,
      priority,
      startDate: nextStartDate,
      endDate: nextEndDate,
      dueDate: nextDueDate,
      updatedAt: now,
    });
    setUpdatedAtDisplay(now);
    setIsEditing(false);
  };

  // キャンセルボタン押下時、元の値に戻す
  const handleCancel = () => {
    setTitle(task.title);
    setPriority(task.priority);
    setDescription(task.description);
    setStartDate(task.startDate);
    setDueDate(task.dueDate);
    setEndDate(task.endDate);
    setIsEditing(false);
  };

  const disabledFieldClass = !isEditing
    ? "border-opacity-60 bg-[var(--bg-base)]/70 text-[var(--text-secondary)] focus:outline-none focus:ring-0"
    : "bg-[var(--bg-base)] text-[var(--text-primary)]";

  const datePickerDisabledFieldClass = !isEditing
    ? "pointer-events-none border-opacity-60 bg-[var(--bg-base)]/70 text-[var(--text-secondary)]"
    : "";

  // // 保存ボタンの押下管理(今後未入力のところがあれば保存ボタンを押下できないような仕様にする)
  // const canSave = Boolean(title.trim());

  return (
    <>
      <div className="relative z-10" role="dialog" aria-modal="true">
        <div
          className="fixed inset-0 bg-[var(--bg-surface)]/60 transition-opacity"
          aria-hidden="true"
          onClick={() => {
            if (isEditing) {
              handleCancel();
            }
            onCloseModal();
          }}
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4"
            onClick={() => {
              if (isEditing) {
                handleCancel();
              }
              onCloseModal();
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative transform overflow-hidden rounded-2xl bg-[var(--bg-surface2)] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
            >
              <button
                type="button"
                className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                onClick={() => {
                  if (isEditing) {
                    handleCancel();
                  }
                  onCloseModal();
                }}
                aria-label="閉じる"
              >
                <CloseIcon />
              </button>
              <div className="cursor-default px-6 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-10">
                <header className="space-y-3">
                  <p className="text-xs tracking-[0.2em] text-[var(--text-secondary)]">
                    # {task.status}
                  </p>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3
                      id="dialog-title"
                      className="text-2xl font-semibold text-[var(--text-primary)]"
                    >
                      タスク詳細
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${priorityBadgeClassName[priority]}`}
                    >
                      優先度: {priorityLabelMap[priority]}
                    </span>
                  </div>
                </header>

                <section className="mt-6 space-y-6 border-t border-[var(--border-primary)] pt-6 text-sm text-[var(--text-primary)]">
                  <div>
                    <label className="mb-2 block text-[var(--text-secondary)]">
                      タイトル
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      readOnly={!isEditing}
                      className={`w-full rounded-md border border-[var(--border-primary)] px-3 py-2 ${disabledFieldClass}`}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[var(--text-secondary)]">
                        開始日
                      </label>
                      <div
                        className={`rounded-md ${datePickerDisabledFieldClass}`}
                      >
                        <DatePicker
                          value={startDate}
                          onChange={(date) => setStartDate(date as Date)}
                          placeholder="開始日を選択"
                          edit={isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-[var(--text-secondary)]">
                        終了日
                      </label>
                      <div
                        className={`rounded-md ${datePickerDisabledFieldClass}`}
                      >
                        <DatePicker
                          value={endDate}
                          onChange={(date) => setEndDate(date as Date)}
                          placeholder="終了日を選択"
                          edit={isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-[var(--text-secondary)]">
                        締切日
                      </label>
                      <div
                        className={`rounded-md ${datePickerDisabledFieldClass}`}
                      >
                        <DatePicker
                          value={dueDate}
                          onChange={(date) => setDueDate(date as Date)}
                          placeholder="締切日を選択"
                          edit={isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-[var(--text-secondary)]">
                        優先度
                      </label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={!isEditing}>
                          <div>
                            <button
                              className={`flex w-full items-center justify-between rounded-md border border-[var(--border-primary)] px-3 py-2 text-left ${disabledFieldClass}`}
                            >
                              {priorityLabelMap[priority]}
                              <DropdownIcon />
                            </button>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="border border-[var(--border-primary)] bg-[var(--bg-surface2)]"
                        >
                          <DropdownMenuLabel className="text-[var(--text-secondary)]">
                            優先度を選択
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {priorityOptions.map(({ value, label }) => (
                            <DropdownMenuItem
                              key={value}
                              onClick={() => setPriority(value)}
                              className={`flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm ${
                                priority === value
                                  ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                                  : "text-[var(--text-secondary)] hover:opacity-80"
                              }`}
                            >
                              <Check
                                size={14}
                                className={
                                  priority === value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                              />
                              {label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-[var(--text-secondary)]">
                      詳細
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      readOnly={!isEditing}
                      className={`w-full rounded-md border border-[var(--border-primary)] px-3 py-2 ${disabledFieldClass}`}
                    />
                  </div>
                </section>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[var(--text-secondary)]">
                    <p>作成日: {formatDate(task.createdAt)}</p>
                    <p>更新日: {formatDate(updatedAtDisplay)}</p>
                  </div>
                  <div className="flex gap-3">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="h-10 rounded-lg border border-[var(--border-primary)] px-4 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)]"
                        >
                          キャンセル
                        </button>
                        <PrimaryButton
                          onClick={handleSave}
                          className="h-10 px-6 disabled:opacity-50"
                          // disabled={!canSave}
                        >
                          保存
                        </PrimaryButton>
                      </>
                    ) : (
                      <PrimaryButton
                        onClick={() => setIsEditing(true)}
                        className="h-10 px-6"
                      >
                        編集
                      </PrimaryButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
