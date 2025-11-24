import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FilterButton />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="border-border w-40 border-b"
      >
        <DropdownMenuLabel className="text-[var(--text-secondary)]">
          優先度:
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuCheckboxItem
          className="text-[var(--text-secondary)]"
          checked={filter.includes("High")}
          onCheckedChange={() => togglePriority("High")}
        >
          高
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          className="text-[var(--text-secondary)]"
          checked={filter.includes("Medium")}
          onCheckedChange={() => togglePriority("Medium")}
        >
          中
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          className="text-[var(--text-secondary)]"
          checked={filter.includes("Low")}
          onCheckedChange={() => togglePriority("Low")}
        >
          低
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
