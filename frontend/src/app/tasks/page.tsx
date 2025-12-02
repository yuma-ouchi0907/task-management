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
  const { tasks, addTask } = useTaskContext(); // ← Context を使う
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
  const [newTitle, setNewTitle] = useState("");

  return (
    <>
      <main className="w-[dvh100] bg-[var(--bg-surface)]">
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
        <section className="grid h-[calc(100dvh-130px)] grid-cols-3 gap-4 bg-[var(--bg-surface)] px-4 2xl:px-32">
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

              {status === "Todo" && isAdding && (
                <div className="my-8 h-25 rounded-lg border border-[var(--border-primary)] px-6 focus-within:border-[var(--color-primary)]">
                  <input
                    autoFocus
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="タイトルを入力"
                    className="my-2 w-full rounded-md bg-[var(--bg-surface2)] p-2 text-sm text-[var(--text-primary)] outline-none hover:opacity-80"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (!newTitle.trim()) return;

                        addTask({
                          id: tasks.length + 1,
                          title: newTitle,
                          status: "Todo",
                          priority: "Medium",
                          description: "",
                          displayOrder: tasks.length + 1,
                          startDate: new Date(),
                          endDate: new Date(),
                          createdAt: new Date(),
                          updatedAt: new Date(),
                          dueDate: new Date(),
                        });

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
