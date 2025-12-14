"use client";

import { createContext, useContext, useState } from "react";
import { TaskType } from "../type";
import { tasks as initialTasks } from "../data/tasks";

type TaskContextType = {
  tasks: TaskType[];
  deleteTask: (id: number) => void;
  addTask: (task: TaskType) => void;
  updateTask: (id: number, payload: Partial<TaskType>) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addTask = (task: TaskType) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (id: number, payload: Partial<TaskType>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...payload } : task)),
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, deleteTask, addTask, updateTask }}
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
