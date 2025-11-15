import { Status, TaskType } from "../type";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: TaskType[]; // すでに sorted + filtered 済み
  status: Status;
};

export default function TaskList({ tasks, status }: TaskListProps) {
  return (
    <>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </>
  );
}
