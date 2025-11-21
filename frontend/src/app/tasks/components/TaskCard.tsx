import { useState } from "react";
import { TaskType } from "../type";
import TaskDescriptionModal from "./TaskDescriptionModal";

type TaskCardProps = {
  task: TaskType;
};

export default function TaskCard({ task }: TaskCardProps) {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const onCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <>
      {/* タスクがセットされていたらモーダルを開く */}
      {selectedTask !== null && (
        <TaskDescriptionModal task={selectedTask} onCloseModal={onCloseModal} />
      )}
      <article
        onClick={() => setSelectedTask(task)}
        className="bg-[var(--bg-surface)] leading-12 text-[var(--text-primary)] hover:cursor-pointer"
      >
        <div className="radius-60 mb-6 rounded-lg border-1 border-[var(--border-primary)] bg-[var(--bg-surface2)] px-4 font-normal">
          <h3>{task.title}</h3>
          <p className="font-normal text-[var(--text-secondary)]">
            10月28日 - 10日31日
          </p>
        </div>
      </article>
    </>
  );
}
