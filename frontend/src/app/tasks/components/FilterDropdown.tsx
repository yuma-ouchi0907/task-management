import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Check } from "lucide-react";
import FilterButton from "./FilterButton";
import { useContext } from "react";
import { Priority } from "@/app/tasks/type";

import { FilterContext } from "@/app/page";

export default function FilterDropdown() {
  const [filter, setFilter] = useContext(FilterContext);

  const togglePriority = (value: Priority) => {
    setFilter((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value],
    );
  };

  const filterItemClass = (value: Priority) =>
    `flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm
   ${
     filter.includes(value)
       ? "bg-[var(--color-primary)]/15 m-1 text-[var(--color-primary)]"
       : "text-[var(--text-secondary)] m-1"
   }`;
  const resetFilter = () => {
    setFilter([]);
  };

  const selectAllFilter = () => {
    setFilter(["High", "Medium", "Low"]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FilterButton />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="border-border w-40 cursor-default border-b"
      >
        <DropdownMenuLabel className="text-[var(--text-secondary)]">
          優先度:
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-1" />

        <DropdownMenuItem
          onClick={() => togglePriority("High")}
          className={filterItemClass("High")}
        >
          <Check
            className={filter.includes("High") ? "opacity-100" : "opacity-0"}
            size={14}
          />
          高
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => togglePriority("Medium")}
          className={filterItemClass("Medium")}
        >
          <Check
            className={filter.includes("Medium") ? "opacity-100" : "opacity-0"}
            size={14}
          />
          中
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => togglePriority("Low")}
          className={filterItemClass("Low")}
        >
          <Check
            className={filter.includes("Low") ? "opacity-100" : "opacity-0"}
            size={14}
          />
          低
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuItem
          className="m-1 cursor-pointer text-[var(--text-secondary)]"
          onClick={() => selectAllFilter()}
        >
          全て選択
        </DropdownMenuItem>
        <DropdownMenuItem
          className="m-1 cursor-pointer text-[var(--text-secondary)]"
          onClick={() => resetFilter()}
        >
          選択解除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
