"use client";
import ToolBar from "@/app/tasks/components/ToolBar";
import { createContext, useState } from "react";
import TaskList from "./tasks/components/TaskList";
import { tasks } from "./tasks/data/tasks";
import { STATUS_LIST, Priority } from "./tasks/type";

// ✅ Contextの型を定義
type SearchContextType = [string, React.Dispatch<React.SetStateAction<string>>];
type SortContextType = [string, React.Dispatch<React.SetStateAction<string>>];
type FilterContextType = [
  Priority[],
  React.Dispatch<React.SetStateAction<Priority[]>>,
];

// ✅ 型付きでcreateContextを定義（初期値はダミー）
export const SearchContext = createContext<SearchContextType>(["", () => {}]);
export const SortContext = createContext<SortContextType>(["", () => {}]);
export const FilterContext = createContext<FilterContextType>([[], () => {}]);

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("displayOrder");
  const [filter, setFilter] = useState<Priority[]>([]);

  return (
    <>
      <main>
        <SearchContext.Provider value={[searchKeyword, setSearchKeyword]}>
          <SortContext.Provider value={[sortKey, setSortKey]}>
            <FilterContext.Provider value={[filter, setFilter]}>
              <ToolBar />
            </FilterContext.Provider>
          </SortContext.Provider>
        </SearchContext.Provider>
        <section className="grid grid-cols-3 gap-4 bg-[var(--bg-surface)] px-32">
          {STATUS_LIST.map((status) => (
            <div key={status} className="h-screen bg-[var(--bg-surface)] px-16">
              <div className="flex">
                <h2 className="my-2 text-2xl leading-12 font-bold">{status}</h2>
                <p className="mx-6 my-2 text-xl leading-12 font-bold text-[var(--text-secondary)]">
                  {
                    tasks
                      // title 検索フィルター
                      .filter((task) => task.title.includes(searchKeyword))
                      // ステータスフィルター
                      .filter((task) => task.status === status)
                      // priority フィルター
                      .filter((task) => {
                        if (filter.length === 0) return true;
                        return filter.includes(task.priority);
                      }).length
                  }
                </p>
              </div>

              <TaskList
                tasks={tasks}
                status={status}
                searchKeyword={searchKeyword}
                filter={filter}
              />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
