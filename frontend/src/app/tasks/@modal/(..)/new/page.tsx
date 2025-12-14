"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, DropdownIcon } from "@/app/tasks/components/icons";
import { TaskType } from "@/app/tasks/type";
import { useTaskContext } from "@/app/tasks/context/TaskContext";
import { format } from "date-fns";
import { DatePicker } from "../../../components/DatePicker";
// リロード時や直接アクセス時のリダイレクト制御に使用
import { redirect } from "next/navigation";

import PrimaryButton from "@/app/tasks/components/ui/PrimaryButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Check } from "lucide-react";

// input 用：yyyy-MM-dd
const toInputDate = (d: Date) => format(d, "yyyy-MM-dd");

export default function NewTaskPage() {
  const router = useRouter();
  const { tasks, addTask } = useTaskContext();
  const today = new Date();

  // 入力値（全て文字列。表示時に Date に変換）
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskType["priority"]>("Medium");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState<string>(toInputDate(today));
  const [dueDate, setDueDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [titleError, setTitleError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const [formError, setFormError] = useState("");

  if (typeof window === "undefined") {
    // サーバーコンポーネントでは Link の代わりに redirect を使用
    return redirect("/tasks");
    // または、Link コンポーネントの `replace` プロパティを使ってクライアント側で戻す
  }
  const handleSubmit = () => {
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
    addTask({
      id: tasks.length + 1,
      displayOrder: tasks.length + 1,
      title,
      description,
      priority,
      status: "Todo",

      // 文字列から Date に変換
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
      endDate: new Date(endDate),

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    router.back();
  };

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      {/* 背景クリックで閉じる */}
      <div
        className="fixed inset-0 bg-[var(--bg-surface)]/60 transition-opacity"
        onClick={() => router.back()}
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4"
          onClick={() => router.back()}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-2xl bg-[var(--bg-surface2)] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
          >
            {/* 閉じるボタン */}
            <button
              type="button"
              className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              onClick={() => router.back()}
            >
              <CloseIcon />
            </button>

            {/* 内容 */}
            <div className="cursor-default px-6 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-10">
              <header className="space-y-3">
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  タスク追加
                </h3>
              </header>

              {/* 入力セクション */}
              <section className="mt-6 space-y-6 border-t border-[var(--border-primary)] pt-6 text-sm text-[var(--text-primary)]">
                {formError && (
                  <div
                    role="alert"
                    className="rounded-md border-none bg-[var(--alert)] px-4 py-3 text-sm text-[var(--text-primary)]"
                  >
                    {formError}
                  </div>
                )}
                {/* タイトル */}
                <div>
                  <label className="mb-2 block text-[var(--text-secondary)]">
                    タイトル <span className="text-[var(--alert)]">*</span>
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (titleError) setTitleError("");
                    }}
                    className={`w-full rounded-md border bg-[var(--bg-base)] px-3 py-2 text-[var(--text-primary)] transition-colors ${
                      titleError
                        ? "border-[var(--alert)] focus:border-[var(--color-primary)]"
                        : "border-[var(--border-primary)] focus:border-[var(--color-primary)]"
                    } `}
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

                {/* ------ 2カラム（日付 + 優先度） ------ */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* 開始日 */}
                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      開始日 <span className="text-[var(--alert)]">*</span>
                    </label>

                    <div
                      className={`rounded-md border ${
                        startDateError
                          ? "border-[var(--alert)] focus:border-[var(--color-primary)]"
                          : "border-[var(--border-primary)] focus:border-[var(--color-primary)]"
                      }`}
                    >
                      <DatePicker
                        value={startDate ? new Date(startDate) : undefined}
                        onChange={(d) => {
                          setStartDate(d ? d.toISOString() : "");
                          if (startDateError) setStartDateError("");
                        }}
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

                  {/* 終了日 */}
                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      終了日 <span className="text-[var(--alert)]">*</span>
                    </label>

                    <div
                      className={`rounded-md border ${
                        endDateError
                          ? "border-[var(--alert)] focus:border-[var(--color-primary)]"
                          : "border-[var(--border-primary)] focus:border-[var(--color-primary)]"
                      }`}
                    >
                      <DatePicker
                        value={endDate ? new Date(endDate) : undefined}
                        onChange={(d) => {
                          setEndDate(d ? d.toISOString() : "");
                          if (endDateError) setEndDateError("");
                        }}
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

                  {/* 締切日 */}
                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      締切日 <span className="text-[var(--alert)]">*</span>
                    </label>

                    <div
                      className={`rounded-md border ${
                        dueDateError
                          ? "border-[var(--alert)]"
                          : "border-[var(--border-primary)]"
                      }`}
                    >
                      <DatePicker
                        value={dueDate ? new Date(dueDate) : undefined}
                        onChange={(d) => {
                          setDueDate(d ? d.toISOString() : "");
                          if (dueDateError) setDueDateError("");
                        }}
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

                  {/* 優先度 */}
                  <div>
                    <label className="mb-1 block text-[var(--text-secondary)]">
                      優先度 <span className="text-[var(--alert)]">*</span>
                    </label>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <button className="flex w-full items-center justify-between rounded-md border border-[var(--border-primary)] bg-[var(--bg-base)] px-3 py-2 text-left text-[var(--text-primary)]">
                            {priority === "High"
                              ? "高"
                              : priority === "Medium"
                                ? "中"
                                : "低"}
                            <DropdownIcon />
                          </button>
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="start"
                        className="border-border w-40 border bg-[var(--bg-surface2)]"
                      >
                        <DropdownMenuLabel className="text-[var(--text-secondary)]">
                          優先度を選択
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => setPriority("High")}
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
                </div>
                {/* 詳細 */}
                <div className="mt-4">
                  <label className="mb-2 block text-[var(--text-secondary)]">
                    詳細
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border border-[var(--border-primary)] bg-[var(--bg-base)] px-3 py-2 text-[var(--text-primary)] focus:border-[var(--color-primary)]"
                  />
                </div>
              </section>

              {/* 作成ボタン */}
              <div className="mt-8 flex justify-end">
                <PrimaryButton onClick={handleSubmit} className="h-10 w-20">
                  <p>作成する</p>
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
