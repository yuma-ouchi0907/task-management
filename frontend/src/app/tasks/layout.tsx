import { TaskProvider } from "@/app/tasks/context/TaskContext";

export default function TasksLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <TaskProvider>
      {/* 全体を relative で包む */}
      <div className="relative">
        {/* 一覧画面（子要素） */}
        {children}

        {/* モーダルを上に重ねる */}
        {modal && (
          <div className="pointer-events-none fixed inset-0 z-50">
            <div className="pointer-events-auto">{modal}</div>
          </div>
        )}
      </div>
    </TaskProvider>
  );
}
