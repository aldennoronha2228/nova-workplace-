import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-8 w-full rounded border border-white/10 bg-surface-container-low px-2 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
