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
        className="bg-[var(--bg-surface)] leading-12 text-[var(--text-primary)] transition-colors duration-200 hover:cursor-pointer"
      >
        <div className="group radius-60 mb-6 rounded-lg border-1 border-[var(--border-primary)] bg-[var(--bg-surface2)] px-4 font-normal hover:bg-[var(--color-primary)]/30 hover:text-white">
          <h3 className="group-hover:text-white">{task.title}</h3>
          <p className="font-normal text-[var(--text-secondary)] group-hover:text-white">
            10月28日 - 10日31日
          </p>
        </div>
      </article>
    </>
  );
}
