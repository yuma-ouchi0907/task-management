"use client";
import { useState, createContext } from "react";
import ToolBar from "@/app/tasks/components/ToolBar";
import { tasks } from "./tasks/data/tasks";
import { STATUS_LIST } from "./tasks/type";

// ✅ Contextの型を定義
type SearchContextType = [string, React.Dispatch<React.SetStateAction<string>>];

// ✅ 型付きでcreateContextを定義（初期値はダミー）
export const SearchContext = createContext<SearchContextType>(["", () => {}]);

export default function Home() {
  const [query, setQuery] = useState<string>("");

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
              {tasks
                .filter((task) => task.status === status)
                .filter((task) => task.title.indexOf(query) !== -1)
                .map((task) => (
                  <article
                    key={task.id}
                    className="bg-[var(--bg-surface)] leading-12 text-[var(--text-primary)]"
                  >
                    <div className="radius-60 mb-6 rounded-lg border-1 border-[var(--border-primary)] bg-[var(--bg-surface2)] px-4 font-normal">
                      <h3>{task.title}</h3>
                      <p className="font-normal text-[var(--text-secondary)]">
                        10月28日 - 10日31日
                      </p>
                    </div>
                  </article>
                ))}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
