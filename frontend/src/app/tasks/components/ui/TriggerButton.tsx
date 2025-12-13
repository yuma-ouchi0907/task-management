import React from "react";
import { cn } from "@/lib/utils";
import { TriggerButtonProps, TriggerButtonRef } from "@/app/tasks/type";

// shadcn/uiのDropdownを開くためにrefとpropsが必要
const TriggerButton = React.forwardRef<TriggerButtonRef, TriggerButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex cursor-pointer items-center rounded-md transition-colors focus:outline-none",
          "hover:bg-muted hover:opacity-80",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

// React DevToolsでforwardRefを使ったコンポーネントを正しく表示させる用
TriggerButton.displayName = "TriggerButton";

export default TriggerButton;
