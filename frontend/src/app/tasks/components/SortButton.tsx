import React from "react";
import { TriggerButtonProps, TriggerButtonRef } from "@/app/tasks/type";
import TriggerButton from "@/app/tasks/components/ui/TriggerButton";
import { SortIcon } from "@/app/tasks/components/icons";

const SortButton = React.forwardRef<TriggerButtonRef, TriggerButtonProps>(
  function SortButton(props, ref) {
    return (
      <TriggerButton
        ref={ref}
        {...props}
        className="hover:bg-muted flex cursor-pointer items-center rounded-md transition-colors hover:opacity-80 focus:outline-none"
        {...props}
      >
        ソート
        <SortIcon />
      </TriggerButton>
    );
  },
);

SortButton.displayName = "SortButton";
export default SortButton;
