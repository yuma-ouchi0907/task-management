import React from "react";
import { TriggerButtonProps, TriggerButtonRef } from "@/app/tasks/type";
import { FilterIcon } from "@/app/tasks/components/icons";
import TriggerButton from "@/app/tasks/components/ui/TriggerButton";

const FilterButton = React.forwardRef<TriggerButtonRef, TriggerButtonProps>(
  function FilterButton(props, ref) {
    return (
      <TriggerButton ref={ref} {...props}>
        <FilterIcon />
        フィルター
      </TriggerButton>
    );
  },
);
FilterButton.displayName = "FilterButton";
export default FilterButton;
