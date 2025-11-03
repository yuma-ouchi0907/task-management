import { Status, TaskType } from "../type";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: TaskType[];
  status: Status;
  query: string;
};

export default function TaskList({ tasks, status, query }: TaskListProps) {
  return (
    <>
      {tasks
        .filter((task) => task.status === status)
        .filter((task) => task.title.indexOf(query) !== -1)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </>
  );
}
