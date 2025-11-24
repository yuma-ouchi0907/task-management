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
          className="flex cursor-pointer items-center gap-2 text-[var(--text-secondary)]"
        >
          <Check
            className={filter.includes("High") ? "opacity-100" : "opacity-0"}
            size={14}
          />
          高
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => togglePriority("Medium")}
          className="flex cursor-pointer items-center gap-2 text-[var(--text-secondary)]"
        >
          <Check
            className={filter.includes("Medium") ? "opacity-100" : "opacity-0"}
            size={14}
          />
          中
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => togglePriority("Low")}
          className="flex cursor-pointer items-center gap-2 text-[var(--text-secondary)]"
        >
          <Check
            className={filter.includes("Low") ? "opacity-100" : "opacity-0"}
            size={14}
          />
          低
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
