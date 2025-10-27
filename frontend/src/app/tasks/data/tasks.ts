import { TaskType } from "../type";

export const tasks: TaskType[] = [
  {
    id: 1,
    title: "task1",
    detail: "これはtask1です。",
    status: "Todo",
    priority: "High",
    displayOrder: 1,
    startDate: new Date("2025-10-19"),
    endDate: new Date("2025-12-31"),
    dueDate: new Date("2026-01-01"),
  },
  {
    id: 2,
    title: "task2",
    detail: "これはtask2です。",
    status: "Todo",
    priority: "Low",
    displayOrder: 2,
    startDate: new Date("2025-10-19"),
    endDate: new Date("2025-12-31"),
    dueDate: new Date("2026-01-01"),
  },
];
