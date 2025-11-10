"use client";
import ToolBar from "@/app/tasks/components/ToolBar";
import { createContext, useState } from "react";
import TaskList from "./tasks/components/TaskList";
import { tasks } from "./tasks/data/tasks";
import { STATUS_LIST } from "./tasks/type";

// ✅ Contextの型を定義
type SearchContextType = [string, React.Dispatch<React.SetStateAction<string>>];

// ✅ 型付きでcreateContextを定義（初期値はダミー）
export const SearchContext = createContext<SearchContextType>(["", () => {}]);

export default function Home() {
  const [query, setQuery] = useState<string>("");
  //const [filter, setFilter] = useState<string>("");

  return (
    <>
      <main>
        <SearchContext.Provider value={[query, setQuery]}>
          <ToolBar />
        </SearchContext.Provider>
        <section className="grid grid-cols-3 gap-4 bg-[var(--bg-surface)] px-32">
          {STATUS_LIST.map((status) => (
            <div key={status} className="h-screen bg-[var(--bg-surface)] px-16">
              <div className="flex">
                <h2 className="my-2 text-2xl leading-12 font-bold">{status}</h2>
                <p className="mx-6 my-2 text-xl leading-12 font-bold text-[var(--text-secondary)]">
                  {
                    tasks
                      .filter((task) => task.title.indexOf(query) !== -1)
                      .filter((task) => task.status === status).length
                  }
                </p>
              </div>
              <TaskList tasks={tasks} status={status} query={query} />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
