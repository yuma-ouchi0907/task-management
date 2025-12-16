"use client";

import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import {
  Priority,
  PRIORITY_OPTIONS,
  Status,
  STATUS_OPTIONS,
} from "@/app/tasks/type";
import { useTaskContext } from "@/app/tasks/context/TaskContext";
import { format } from "date-fns";
import PrimaryButton from "@/app/tasks/components/ui/PrimaryButton";
import ModalShell from "@/app/tasks/components/ui/ModalShell";
import FormErrorBanner from "@/app/tasks/components/form/FormErrorBanner";
import { formInputClass } from "@/app/tasks/components/form/fromInputClass";
import Field from "@/app/tasks/components/form/Field";
import DateField from "@/app/tasks/components/form/DateField";
import SelectMenu from "@/app/tasks/components/form/SelectMenu";
import { validateTaskForm } from "@/app/tasks/components/form/ValidateTaskForm";

// input 用：yyyy-MM-dd
const toInputDate = (d: Date) => format(d, "yyyy-MM-dd");

export default function NewTaskPage() {
  const router = useRouter();
  const { tasks, addTask } = useTaskContext();
  const today = new Date();

  const handleClose = () => {
    setPriorityOpen(false);
    setStatusOpen(false);
    router.back();
  };

  // 入力値（全て文字列。表示時に Date に変換）
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>("Todo");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [startDate, setStartDate] = useState<string>(toInputDate(today));
  const [endDate, setEndDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const [formError, setFormError] = useState("");

  const [priorityOpen, setPriorityOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // 並列ルート（@modal）前提の画面のため、リロード・直アクセス時は親の /tasks に戻す
  if (typeof window === "undefined") {
    return redirect("/tasks");
  }
  const resetErrors = () => {
    setTitleError("");
    setStartDateError("");
    setEndDateError("");
    setDueDateError("");
    setFormError("");
  };

  const handleSubmit = () => {
    setPriorityOpen(false);
    setStatusOpen(false);
    resetErrors();

    const errors = validateTaskForm({
      title,
      startDate,
      endDate,
      dueDate,
    });

    if (Object.keys(errors).length > 0) {
      setTitleError(errors.title ?? "");
      setStartDateError(errors.startDate ?? "");
      setEndDateError(errors.endDate ?? "");
      setDueDateError(errors.dueDate ?? "");
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
      status,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
      endDate: new Date(endDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    router.back();
  };

  return (
    <ModalShell title="タスク追加" onClose={handleClose}>
      <div className="cursor-default px-6 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-10">
        <header className="space-y-3">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
            タスク追加
          </h3>
        </header>

        <section className="mt-6 space-y-6 border-t border-[var(--border-primary)] pt-6 text-sm text-[var(--text-primary)]">
          {formError && <FormErrorBanner message={formError} />}
          <Field label="タイトル" required error={titleError}>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
              className={formInputClass(!!titleError, "px-3 py-2")}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <DateField
              label="開始日"
              required
              value={startDate ? new Date(startDate) : undefined}
              error={startDateError}
              onChange={(d) => {
                setStartDate(d ? d.toISOString() : "");
                if (startDateError) setStartDateError("");
              }}
              placeholder="開始日を選択"
            />

            <DateField
              label="終了日"
              required
              value={endDate ? new Date(endDate) : undefined}
              error={endDateError}
              onChange={(d) => {
                setEndDate(d ? d.toISOString() : "");
                if (endDateError) setEndDateError("");
              }}
              placeholder="終了日を選択"
            />

            <DateField
              label="締切日"
              required
              value={dueDate ? new Date(dueDate) : undefined}
              error={dueDateError}
              onChange={(d) => {
                setDueDate(d ? d.toISOString() : "");
                if (dueDateError) setDueDateError("");
              }}
              placeholder="締切日を選択"
            />

            <SelectMenu<Priority>
              label="優先度"
              required
              value={priority}
              options={PRIORITY_OPTIONS}
              onChange={(v) => {
                setPriority(v);
                setPriorityOpen(false);
              }}
              open={priorityOpen}
              onOpenChange={setPriorityOpen}
              menuLabel="優先度を選択"
            />

            <SelectMenu<Status>
              label="ステータス"
              required
              value={status}
              options={STATUS_OPTIONS}
              onChange={(v) => {
                setStatus(v);
                setStatusOpen(false); // ← 重要
              }}
              open={statusOpen}
              onOpenChange={setStatusOpen}
              menuLabel="ステータスを選択"
            />
          </div>

          <Field label="詳細">
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={formInputClass(false, "px-3 py-2")}
            />
          </Field>
        </section>

        <div className="mt-8 flex justify-end">
          <PrimaryButton onClick={handleSubmit} className="h-10 w-20">
            <p>作成</p>
          </PrimaryButton>
        </div>
      </div>
    </ModalShell>
  );
}
