import React from "react";
import FilterIcon from "@/app/tasks/components/icons/FilterIcon";

// ref の型を明示的に <HTMLButtonElement, Props> と指定！
const FilterButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function FilterButton(props, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className="hover:bg-muted flex cursor-pointer items-center rounded-md transition-colors hover:opacity-80 focus:outline-none"
      {...props}
    >
      <FilterIcon />
      フィルター
    </button>
  );
});

export default FilterButton;
