import { TaskType } from "../type";

type TaskCardProps = {
  task: TaskType;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="bg-[var(--bg-surface)] leading-12 text-[var(--text-primary)]">
      <div className="radius-60 mb-6 rounded-lg border-1 border-[var(--border-primary)] bg-[var(--bg-surface2)] px-4 font-normal">
        <h3>{task.title}</h3>
        <p className="font-normal text-[var(--text-secondary)]">
          10月28日 - 10日31日
        </p>
      </div>
    </article>
  );
}
