"use client";

import { useRouter, useParams, redirect } from "next/navigation";
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
import { STATUS_LIST, TaskType } from "@/app/tasks/type";
import { DatePicker } from "@/app/tasks/components/DatePicker";
import PrimaryButton from "@/app/tasks/components/ui/PrimaryButton";

/* ================= constants ================= */

const PRIORITY_BADGE_BASE =
  "inline-flex items-center rounded-md px-3 py-1 text-sm font-medium text-[var(--text-primary)]";

type PriorityLabel = "高" | "中" | "低";

const priorityLabelMap: Record<TaskType["priority"], PriorityLabel> = {
  High: "高",
  Medium: "中",
  Low: "低",
};

const priorityOptions: {
  value: TaskType["priority"];
  label: PriorityLabel;
}[] = [
  { value: "High", label: "高" },
  { value: "Medium", label: "中" },
  { value: "Low", label: "低" },
];

const priorityBadgeClassName: Record<TaskType["priority"], string> = {
  High: `${PRIORITY_BADGE_BASE} bg-[var(--alert)]`,
  Medium: `${PRIORITY_BADGE_BASE} bg-yellow-600`,
  Low: `${PRIORITY_BADGE_BASE} bg-green-600`,
};

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
/* ================= page ================= */

export default function TaskDetailPage() {
  const router = useRouter();
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks, updateTask } = useTaskContext();

  /* ---------- task state ---------- */
  const [task, setTask] = useState<TaskType | null>(null);

  /* ---------- edit states ---------- */
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskType["priority"]>("Medium");
  const [status, setStatus] = useState<TaskType["status"]>("Todo");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [updatedAtDisplay, setUpdatedAtDisplay] = useState<Date | undefined>(
    undefined,
  );

  const [titleError, setTitleError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const [formError, setFormError] = useState("");
  // Dropdown open states
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  /* ---------- task 同期 ---------- */
  useEffect(() => {
    if (!tasks.length) return;
    const taskIdNum = Number(taskId);

    const found = tasks.find((t) => t.id === taskIdNum);
    if (!found) return;

    setTask(found);
    setTitle(found.title);
    setPriority(found.priority);
    setStatus(found.status);
    setDescription(found.description);
    setStartDate(found.startDate);
    setDueDate(found.dueDate);
    setEndDate(found.endDate);
    setUpdatedAtDisplay(found.updatedAt);
    setIsEditing(false);
  }, [tasks, taskId]);
  if (typeof window === "undefined") {
    // サーバーコンポーネントでは Link の代わりに redirect を使用
    return redirect("/tasks");
    // または、Link コンポーネントの `replace` プロパティを使ってクライアント側で戻す
  }
  /* ---------- guard ---------- */
  if (!task) {
    return null;
  }

  const handleClose = () => {
    // 先にすべて閉じる
    setPriorityOpen(false);
    setStatusOpen(false);

    router.back();
  };

  /* ---------- utils ---------- */
  const formatDate = (date?: Date) =>
    date ? format(date, "PPP", { locale: ja }) : "—";

  const handleSave = () => {
    // reset
    setTitleError("");
    setStartDateError("");
    setEndDateError("");
    setDueDateError("");
    setFormError("");

    let hasError = false;

    if (!title.trim()) {
      setTitleError("タイトルを入力してください。");
      hasError = true;
    }

    if (!startDate) {
      setStartDateError("開始日を選択してください。");
      hasError = true;
    }

    if (!endDate) {
      setEndDateError("終了日を選択してください。");
      hasError = true;
    }

    if (!dueDate) {
      setDueDateError("締切日を選択してください。");
      hasError = true;
    }

    if (hasError) {
      setFormError(
        "入力内容に不備があります。赤く表示された項目をご確認ください。",
      );
      return;
    }
    const now = new Date();

    updateTask(task.id, {
      title,
      description,
      priority,
      status,
      startDate: startDate!,
      endDate: endDate!,
      dueDate: dueDate!,
      updatedAt: now,
    });

    setUpdatedAtDisplay(now);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setPriority(task.priority);
    setStatus(task.status);
    setDescription(task.description);
    setStartDate(task.startDate);
    setDueDate(task.dueDate);
    setEndDate(task.endDate);
    setIsEditing(false);
  };

  const disabledFieldClass = !isEditing
    ? "bg-[var(--bg-base)]/70 text-[var(--text-secondary)] "
    : "bg-[var(--bg-base)] text-[var(--text-primary)]";

  const datePickerDisabledClass = !isEditing
    ? "pointer-events-none  rounded-md bg-[var(--bg-base)]/70 text-[var(--text-secondary)]"
    : "";

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      {/* 画面外クリックで閉じる（ここだけでOK） */}
      <div
        className="fixed inset-0 bg-[var(--bg-surface)]/60 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-2xl bg-[var(--bg-surface2)] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
          >
            {/* close button */}
            <button
              onClick={handleClose}
              aria-label="閉じる"
              className="absolute top-4 right-4 rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
            >
              <CloseIcon />
            </button>

            <div className="px-6 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-10">
              {/* header */}
              <header className="space-y-3">
                <p className="text-xs tracking-[0.2em] text-[var(--text-secondary)]">
                  # {task.status}
                </p>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold">タスク詳細</h3>
                  <span className={priorityBadgeClassName[priority]}>
                    優先度: {priorityLabelMap[priority]}
                  </span>
                </div>
              </header>

              {/* body */}
              <section className="mt-6 space-y-6 border-t border-[var(--border-primary)] pt-6 text-sm">
                {formError && (
                  <div
                    role="alert"
                    className="rounded-md border-none bg-[var(--alert)] px-4 py-3 text-sm text-[var(--text-primary)]"
                  >
                    {formError}
                  </div>
                )}
                {/* title */}
                <div>
                  <label className="mb-2 block text-[var(--text-secondary)]">
                    タイトル <span className="text-[var(--alert)]">*</span>
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    readOnly={!isEditing}
                    className={formInputClass(
                      !!titleError,
                      `px-3 py-2 ${disabledFieldClass}`,
                    )}
                    aria-invalid={!!titleError}
                  />
                  {titleError && (
                    <p
                      role="alert"
                      className="mt-2 text-xs text-[var(--alert)]"
                    >
                      {titleError}
                    </p>
                  )}
                </div>

                {/* dates / selects */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      開始日 <span className="text-[var(--alert)]">*</span>
                    </label>
                    <div
                      className={formInputClass(
                        !!startDateError,
                        datePickerDisabledClass,
                      )}
                    >
                      <DatePicker
                        value={startDate}
                        onChange={(d) => {
                          setStartDate(d as Date);
                          if (startDateError) setStartDateError("");
                        }}
                        edit={isEditing}
                        placeholder="開始日を選択"
                      />
                    </div>
                    {startDateError && (
                      <p
                        role="alert"
                        className="mt-1 text-xs text-[var(--alert)]"
                      >
                        {startDateError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      終了日 <span className="text-[var(--alert)]">*</span>
                    </label>

                    <div
                      className={formInputClass(
                        !!endDateError,
                        datePickerDisabledClass,
                      )}
                    >
                      <DatePicker
                        value={endDate}
                        onChange={(d) => {
                          setEndDate(d as Date);
                          if (endDateError) setEndDateError("");
                        }}
                        edit={isEditing}
                        placeholder="終了日を選択"
                      />
                    </div>
                    {endDateError && (
                      <p
                        role="alert"
                        className="mt-1 text-xs text-[var(--alert)]"
                      >
                        {endDateError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      締切日 <span className="text-[var(--alert)]">*</span>
                    </label>
                    <div
                      className={formInputClass(
                        !!dueDateError,
                        datePickerDisabledClass,
                      )}
                    >
                      <DatePicker
                        value={dueDate}
                        onChange={(d) => {
                          setDueDate(d as Date);
                          if (dueDateError) setDueDateError("");
                        }}
                        edit={isEditing}
                        placeholder="締切日を選択"
                      />
                    </div>
                    {dueDateError && (
                      <p
                        role="alert"
                        className="mt-1 text-xs text-[var(--alert)]"
                      >
                        {dueDateError}
                      </p>
                    )}
                  </div>

                  {/* priority */}
                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      優先度 <span className="text-[var(--alert)]">*</span>
                    </label>
                    <DropdownMenu
                      open={priorityOpen}
                      onOpenChange={setPriorityOpen}
                    >
                      <DropdownMenuTrigger asChild disabled={!isEditing}>
                        <button
                          className={`flex w-full items-center justify-between rounded-md border border-[var(--border-primary)] px-3 py-2 ${disabledFieldClass}`}
                        >
                          {priorityLabelMap[priority]}
                          <DropdownIcon />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="border-border w-40 border bg-[var(--bg-base)]"
                      >
                        <DropdownMenuLabel className="text-[var(--text-secondary)]">
                          優先度を選択
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setPriority("High");
                            setPriorityOpen(false);
                          }}
                          className={`flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm ${
                            priority === "High"
                              ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                              : "text-[var(--text-secondary)] hover:opacity-80"
                          }`}
                        >
                          <Check
                            size={14}
                            className={
                              priority === "High" ? "opacity-100" : "opacity-0"
                            }
                          />
                          高
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setPriority("Medium")}
                          className={`flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm ${
                            priority === "Medium"
                              ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                              : "text-[var(--text-secondary)] hover:opacity-80"
                          }`}
                        >
                          <Check
                            size={14}
                            className={
                              priority === "Medium"
                                ? "opacity-100"
                                : "opacity-0"
                            }
                          />
                          中
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setPriority("Low")}
                          className={`flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm ${
                            priority === "Low"
                              ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                              : "text-[var(--text-secondary)] hover:opacity-80"
                          }`}
                        >
                          <Check
                            size={14}
                            className={
                              priority === "Low" ? "opacity-100" : "opacity-0"
                            }
                          />
                          低
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* status */}
                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      ステータス <span className="text-[var(--alert)]">*</span>
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled={!isEditing}>
                        <button
                          className={`flex w-full items-center justify-between rounded-md border border-[var(--border-primary)] px-3 py-2 ${disabledFieldClass}`}
                        >
                          {status}
                          <DropdownIcon />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="border border-[var(--border-primary)] bg-[var(--bg-base)]"
                      >
                        <DropdownMenuLabel className="bg-[var(--bg-base)] text-[var(--text-secondary)]">
                          ステータスを選択
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {STATUS_LIST.map((s) => (
                          <DropdownMenuItem
                            key={s}
                            onClick={() => {
                              setStatus(s);
                              setStatusOpen(false); // ← ここが重要
                            }}
                            className={`flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm ${
                              s === status
                                ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                                : "text-[var(--text-secondary)] hover:opacity-80"
                            }`}
                          >
                            <Check
                              size={14}
                              className={
                                s === status ? "opacity-100" : "opacity-0"
                              }
                            />
                            {s}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* description */}
                <div>
                  <label className="mb-2 block h-10 w-20 text-[var(--text-secondary)]">
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

              {/* footer */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="text-xs text-[var(--text-secondary)]">
                  <p>作成日: {formatDate(task.createdAt)}</p>
                  <p>更新日: {formatDate(updatedAtDisplay)}</p>
                </div>

                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <PrimaryButton className="h-10 w-20" onClick={handleSave}>
                        保存
                      </PrimaryButton>
                      <button
                        onClick={handleCancel}
                        className="h-10 w-24 rounded-lg border border-[var(--border-primary)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
                      >
                        キャンセル
                      </button>
                    </>
                  ) : (
                    <PrimaryButton
                      className="h-10 w-20"
                      onClick={() => setIsEditing(true)}
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
  );
}
