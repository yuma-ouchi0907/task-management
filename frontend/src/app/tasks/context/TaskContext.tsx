"use client";

import { createContext, useContext, useState } from "react";
import { TaskType } from "../type";
import { tasks as initialTasks } from "../data/tasks";

type TaskContextType = {
  tasks: TaskType[];
  deleteTask: (id: number) => void;
  addTask: (task: TaskType) => void; // ← ①追加
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addTask = (task: TaskType) => {
    setTasks((prev) => [...prev, task]); // ← ②追加
  };

  return (
    <TaskContext.Provider
      value={{ tasks, deleteTask, addTask }} // ← ③追加
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TaskContext is not initialized");
  return ctx;
}
