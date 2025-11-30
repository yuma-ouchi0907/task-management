"use client";
import { createContext, useState, useMemo } from "react";
import ToolBar from "@/app/tasks/components/ToolBar";
import TaskList from "@/app/tasks/components/TaskList";
import { tasks } from "@/app/tasks/data/tasks";
import {
  STATUS_LIST,
  Priority,
  TaskType,
  SortContextType,
  SearchContextType,
  FilterContextType,
} from "@/app/tasks/type";
import { PlusIcon } from "./tasks/components/icons";

export const SearchContext = createContext<SearchContextType>(["", () => {}]);
export const SortContext = createContext<SortContextType>({
  sortKey: "createdAt",
  sortOrder: "asc",
  setSortKey: () => {},
  toggleSortOrder: () => {},
});
export const FilterContext = createContext<FilterContextType>([[], () => {}]);

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

  const [sortKey, setSortKeyRaw] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [taskList, setTaskList] = useState<TaskType[]>(tasks);
  const setSortKey = (key: string) => {
    setSortKeyRaw(key);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  /* --- ① title検索 --- */
  const filteredBySearch = useMemo(() => {
    return taskList.filter((t) =>
      t.title.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
  }, [taskList, searchKeyword]);

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
  const [newTitle, setNewTitle] = useState("");

  return (
    <>
      <main>
        <SearchContext.Provider value={[searchKeyword, setSearchKeyword]}>
          <SortContext.Provider
            value={{ sortKey, sortOrder, setSortKey, toggleSortOrder }}
          >
            <FilterContext.Provider value={[filter, setFilter]}>
              <ToolBar />
            </FilterContext.Provider>
          </SortContext.Provider>
        </SearchContext.Provider>

        <section className="grid h-screen grid-cols-3 gap-4 bg-[var(--bg-surface)] px-32">
          {STATUS_LIST.map((status) => (
            <div key={status} className="bg-[var(--bg-surface)] px-16">
              <div className="flex">
                <h2 className="my-2 cursor-default text-2xl font-bold">
                  {status}
                </h2>
                <p className="mx-6 my-2 cursor-default content-center text-xl font-bold text-[var(--text-secondary)]">
                  {sortedTasks.filter((t) => t.status === status).length}
                </p>
              </div>
              <TaskList tasks={sortedTasks} status={status} />

              {status === "Todo" && !isAdding && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="transaction mt-3 flex w-full cursor-pointer justify-center rounded-lg border border-[var(--border-primary)] py-2 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                >
                  <p className="self-center">タスクを追加</p>
                  <PlusIcon />
                </button>
              )}
              {status === "Todo" && isAdding && (
                <div className="my-6 h-25 rounded-lg border border-[var(--border-primary)] px-6 focus-within:border-[var(--color-primary)]">
                  <input
                    autoFocus
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="タイトルを入力"
                    className="mt-3 mb-2 w-full rounded-md bg-[var(--bg-surface2)] p-2 text-sm text-[var(--text-primary)] outline-none hover:opacity-80"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (!newTitle.trim()) return;
                        // ★「実際に追加する処理」★
                        setTaskList((prev) => [
                          ...prev,
                          {
                            id: prev.length + 1,
                            title: newTitle,
                            status: "Todo",
                            priority: "Medium",
                            description: "",
                            displayOrder: prev.length + 1,
                            startDate: new Date(),
                            endDate: new Date(),
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            dueDate: new Date(),
                          },
                        ]);
                        setNewTitle("");
                        setIsAdding(false);
                      }}
                      className="flex-1 cursor-pointer rounded-md bg-[var(--color-primary)] py-1 text-sm text-white hover:opacity-80"
                    >
                      追加
                    </button>

                    <button
                      onClick={() => {
                        setNewTitle("");
                        setIsAdding(false);
                      }}
                      className="flex-1 cursor-pointer rounded-md border border-[var(--border-primary)] py-1 text-sm text-[var(--text-secondary)] hover:opacity-80"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
