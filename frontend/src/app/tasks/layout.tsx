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
      {children}
      {modal}
    </TaskProvider>
  );
}
