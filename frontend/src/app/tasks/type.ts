import { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

export const STATUS_LIST = ["Todo", "Doing", "Done"] as const;
export type Status = (typeof STATUS_LIST)[number];

export const PRIORITY_LIST = ["High", "Medium", "Low"] as const;
export type Priority = (typeof PRIORITY_LIST)[number];

export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  displayOrder: number;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type SortContextType = {
  sortKey: string;
  sortOrder: "asc" | "desc";
  setSortKey: (key: string) => void;
  toggleSortOrder: () => void;
};

export type SearchContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
];
export type FilterContextType = [
  Priority[],
  React.Dispatch<React.SetStateAction<Priority[]>>,
];

export type AddContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export type TaskContextType = {
  tasks: TaskType[];
  deleteTask: (id: number) => void;
  addTask: (task: TaskType) => void; // ← 追加！！
};

export type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export type TriggerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type TriggerButtonRef = HTMLButtonElement;

export const DEFAULT_ICON_PROPS: LucideProps = {
  className: "h-5 w-5",
  strokeWidth: 1.5,
  "aria-hidden": true,
};
