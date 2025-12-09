import React from "react";
import { SortIcon } from "@/app/tasks/components/icons";

const SortButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function SortButton(props, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className="hover:bg-muted flex cursor-pointer items-center rounded-md transition-colors hover:opacity-80 focus:outline-none"
      {...props}
    >
      <SortIcon />
      ソート
    </button>
  );
});

export default SortButton;
