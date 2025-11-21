import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { TaskType } from "../type";
import CloseIcon from "./CloseIcon";

type TaskDescriptionModalType = {
  task: TaskType;
  onCloseModal: () => void;
};

export default function TaskDescriptionModal({
  task,
  onCloseModal,
}: TaskDescriptionModalType) {
  // yyyy年mm月dd日の形にする
  const formatDate = (date: Date) =>
    format(date, "PPP", {
      locale: ja,
    });

  // プライオリティに応じてcssを変える
  const priorityBadgeClassName: Record<TaskType["priority"], string> = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  // 開始日〜終了日の表示
  const formatDateRange = (start?: Date, end?: Date) => {
    if (!start && !end) return "日付未設定";
    if (start && !end) return `${formatDate(start)} 〜`;
    if (!start && end) return `〜 ${formatDate(end)}`;
    return `${formatDate(start as Date)} 〜 ${formatDate(end as Date)}`;
  };

  return (
    <>
      <div className="relative z-10" role="dialog" aria-modal="true">
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4"
            onClick={onCloseModal}
          >
            <div
              // modalの内側をクリックしても閉じないようにする
              onClick={(e) => e.stopPropagation()}
              className="relative transform overflow-hidden rounded-2xl bg-[var(--bg-surface2)] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
            >
              <button
                type="button"
                className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                onClick={onCloseModal}
                aria-label="閉じる"
              >
                <CloseIcon />
              </button>
              <div className="px-6 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-10">
                <header className="space-y-3">
                  <p className="text-xs tracking-[0.2em] text-[var(--text-secondary)] uppercase">
                    # {task.status}
                  </p>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3
                        id="dialog-title"
                        className="text-2xl font-semibold text-[var(--text-primary)]"
                      >
                        {task.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {formatDateRange(task.startDate, task.endDate)}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-[var(--border-primary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                      作成 {formatDate(task.createdAt)}
                    </span>
                  </div>
                </header>

                <section className="mt-6 grid gap-6 border-t border-[var(--border-primary)] pt-6 text-sm text-[var(--text-primary)] sm:grid-cols-2">
                  <dl className="space-y-2">
                    <dt className="text-[var(--text-secondary)]">ステータス</dt>
                    <dd className="text-base font-medium">{task.status}</dd>
                    <dt className="text-[var(--text-secondary)]">
                      プライオリティ
                    </dt>
                    <dd>
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${priorityBadgeClassName[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </dd>
                  </dl>
                  <dl className="space-y-2">
                    <dt className="text-[var(--text-secondary)]">期限</dt>
                    <dd className="text-base font-medium">
                      {/* <span className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700"> */}
                      {formatDate(task.dueDate)}
                      {/* </span> */}
                    </dd>
                    <dt className="text-[var(--text-secondary)]">更新日</dt>
                    <dd className="text-base font-medium">
                      {formatDate(task.updatedAt)}
                    </dd>
                  </dl>
                </section>

                <section className="mt-8 space-y-3">
                  <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                    <span>詳細</span>
                    {/* 編集ボタンは後々作成する */}
                    {/* <button
                      type="button"
                      className="rounded-md px-2 py-1 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                    >
                      編集
                    </button> */}
                  </div>
                  <p className="text-sm leading-6 whitespace-pre-line text-[var(--text-primary)]">
                    {task.description}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
