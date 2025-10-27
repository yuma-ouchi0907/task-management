export const STATUS_LIST = ["Todo", "Doing", "Done"] as const;
export type Status = (typeof STATUS_LIST)[number];

export const PRIORITY_LIST = ["High", "Medium", "Low"] as const;
export type Priority = (typeof PRIORITY_LIST)[number];

export type TaskType = {
  id: number;
  title: string;
  detail: string;
  status: Status;
  priority: PRIORITY;
  displayOrder: number;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
};
