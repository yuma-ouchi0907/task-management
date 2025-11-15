import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import SortButton from "./SortButton";
import {
  SortDownArrowIcon,
  SortUpArrowIcon,
} from "@/app/tasks/components/icons";
import { useContext } from "react";
import { SortContext } from "@/app/page";

export default function SortDropdown() {
  const [, setSortKey] = useContext(SortContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SortButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="border-border w-40 border-b"
      >
        <DropdownMenuItem className="text-[var(--text-secondary)]">
          <SortDownArrowIcon />
          昇順
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[var(--text-secondary)]">
          <SortUpArrowIcon />
          降順
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuItem
          className="text-[var(--text-secondary)]"
          onClick={() => setSortKey("createdAt")}
        >
          作成日
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[var(--text-secondary)]">
          更新日
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-[var(--text-secondary)]"
          onClick={() => setSortKey("dueDate")}
        >
          締切日
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[var(--text-secondary)]">
          50音順
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
