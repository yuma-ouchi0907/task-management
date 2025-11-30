import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, useContext } from "react";
import { SortContext } from "@/app/page";
import {
  SortDownArrowIcon,
  SortUpArrowIcon,
} from "@/app/tasks/components/icons";
import SortButton from "@/app/tasks/components/SortButton";

export default function SortDropdown() {
  const { sortKey, sortOrder, setSortKey, toggleSortOrder } =
    useContext(SortContext);
  const [sortOpen, setSortOpen] = useState(false);

  // トリガーが押された時に「閉じないで開くだけ」にする
  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault(); // デフォルトのトグル挙動を無効化
    setSortOpen(true); // 常に開く
  };
  // 選択中のソート項目を薄いprimary背景に
  const keyItemClass = (key: string) =>
    `flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm
     ${
       sortKey === key
         ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)] hover:opacity-80"
         : "text-[var(--text-secondary)] hover:opacity-80"
     }`;

  // 昇順・降順のメニュー用
  const orderItemClass = (order: "asc" | "desc") =>
    `flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm
     ${
       sortOrder === order
         ? "bg-[var(--color-primary)]/15 hover:opacity-80 text-[var(--color-primary)]"
         : "text-[var(--text-secondary)] hover:opacity-80"
     }`;

  const handleChangeOrder = (order: "asc" | "desc") => {
    // すでにその順番なら何もしない
    if (sortOrder === order) return;
    // asc/desc をトグルで切り替える
    toggleSortOrder();
  };

  return (
    <DropdownMenu open={sortOpen} onOpenChange={setSortOpen}>
      <DropdownMenuTrigger asChild>
        <SortButton />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="border-border w-36 border-b"
        forceMount
        onClick={handleTriggerClick}
      >
        {/* ソートキー */}
        <DropdownMenuItem
          className={keyItemClass("createdAt")}
          onClick={() => setSortKey("createdAt")}
        >
          <span>作成日</span>
          {sortKey === "createdAt"}
        </DropdownMenuItem>

        <DropdownMenuItem
          className={keyItemClass("updatedAt")}
          onClick={() => setSortKey("updatedAt")}
        >
          <span>更新日</span>
          {sortKey === "updatedAt"}
        </DropdownMenuItem>

        <DropdownMenuItem
          className={keyItemClass("dueDate")}
          onClick={() => setSortKey("dueDate")}
        >
          <span>締切日</span>
          {sortKey === "dueDate"}
        </DropdownMenuItem>

        <DropdownMenuItem
          className={keyItemClass("title")}
          onClick={() => setSortKey("title")}
        >
          <span>50音順</span>
          {sortKey === "title"}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mx-1" />

        {/* 昇順・降順 */}
        <DropdownMenuItem
          className={orderItemClass("asc")}
          onClick={() => handleChangeOrder("asc")}
        >
          <span>昇順</span>
          <SortDownArrowIcon />
        </DropdownMenuItem>

        <DropdownMenuItem
          className={orderItemClass("desc")}
          onClick={() => handleChangeOrder("desc")}
        >
          <span>降順</span>
          <SortUpArrowIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
