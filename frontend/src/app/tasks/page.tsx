"use client";
import { createContext, useState, useMemo } from "react";
import ToolBar from "@/app/tasks/components/ToolBar";
import TaskList from "@/app/tasks/components/TaskList";
import {
  STATUS_LIST,
  Priority,
  TaskType,
  SortContextType,
  SearchContextType,
  FilterContextType,
  AddContextType,
} from "@/app/tasks/type";
import { useTaskContext } from "./context/TaskContext";

export const SearchContext = createContext<SearchContextType>(["", () => {}]);
export const SortContext = createContext<SortContextType>({
  sortKey: "createdAt",
  sortOrder: "asc",
  setSortKey: () => {},
  toggleSortOrder: () => {},
});
export const FilterContext = createContext<FilterContextType>([[], () => {}]);
export const AddContext = createContext<AddContextType>([false, () => {}]);

export const sortStrategies: Record<
  string,
  (a: TaskType, b: TaskType) => number
> = {
  createdAt: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),

  updatedAt: (a, b) =>
    new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),

  dueDate: (a, b) =>
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),

  title: (a, b) => a.title.localeCompare(b.title, "ja"),
};

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filter, setFilter] = useState<Priority[]>([]);
  const { tasks } = useTaskContext();
  const [sortKey, setSortKeyRaw] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const setSortKey = (key: string) => {
    setSortKeyRaw(key);
  };
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  /* --- ① title検索 --- */ const filteredBySearch = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
  }, [tasks, searchKeyword]);

  /* --- ② priorityフィルタ --- */
  const filteredByPriority = useMemo(() => {
    if (filter.length === 0) return filteredBySearch;
    return filteredBySearch.filter((t) => filter.includes(t.priority));
  }, [filteredBySearch, filter]);

  /* --- ③ ソート --- */
  const sortedTasks = useMemo(() => {
    const strategy = sortStrategies[sortKey];
    const sorted = [...filteredByPriority].sort(strategy);
    return sortOrder === "asc" ? sorted : sorted.reverse();
  }, [filteredByPriority, sortKey, sortOrder]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <main className="w-[100dvw] min-w-145 bg-[var(--bg-surface)]">
        <SearchContext.Provider value={[searchKeyword, setSearchKeyword]}>
          <SortContext.Provider
            value={{ sortKey, sortOrder, setSortKey, toggleSortOrder }}
          >
            <FilterContext.Provider value={[filter, setFilter]}>
              <AddContext.Provider value={[isAdding, setIsAdding]}>
                <ToolBar />
              </AddContext.Provider>
            </FilterContext.Provider>
          </SortContext.Provider>
        </SearchContext.Provider>
        <section className="grid h-[calc(100dvh-130px)] justify-center gap-4 bg-[var(--bg-surface)] lg:grid-cols-3 lg:px-4 2xl:px-32">
          {STATUS_LIST.map((status) => (
            <div key={status} className="bg-[var(--bg-surface)] 2xl:px-16">
              <div className="flex">
                <h2 className="my-2 cursor-default text-2xl font-bold">
                  {status}
                </h2>
                <p className="mx-6 my-2 cursor-default content-center text-xl font-bold text-[var(--text-secondary)]">
                  {sortedTasks.filter((t) => t.status === status).length}
                </p>
              </div>
              <TaskList tasks={sortedTasks} status={status} />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
