import { Status, TaskType, Priority } from "../type";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: TaskType[];
  status: Status;
  searchKeyword: string;
  filter: Priority[];
};

export default function TaskList({
  tasks,
  status,
  searchKeyword,
  filter,
}: TaskListProps) {
  return (
    <>
      {tasks
        .filter((task) => task.status === status)
        .filter((task) => task.title.indexOf(searchKeyword) !== -1)
        .filter((task) => {
          if (filter.length === 0) return true;
          return filter.includes(task.priority);
        })
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </>
  );
}
