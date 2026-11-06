import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCBC5B] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
  {
    variants: {
      variant: {
        default:
          "border-2 border-[#FCBC5B] bg-[#FCBC5B] text-[#140B29] hover:bg-[#FFEEDF] hover:border-[#FFEEDF] shadow-[0_12px_28px_rgba(252,188,91,0.28)]",
        secondary:
          "border-2 border-[#140B29] bg-[#140B29] text-[#FFEEDF] hover:bg-[#FCBC5B] hover:border-[#FCBC5B] hover:text-[#140B29] shadow-md",
        editorial:
          "border-2 border-[#140B29] bg-[#140B29] text-[#FFEEDF] hover:bg-[#FCBC5B] hover:border-[#FCBC5B] hover:text-[#140B29]",
        outline:
          "border-2 border-[#FFEEDF]/40 bg-transparent text-[#FFEEDF] hover:bg-[#FFEEDF] hover:border-[#FFEEDF] hover:text-[#140B29]",
        rose:
          "border-2 border-[#FF7EB6] bg-[#FF7EB6] text-[#140B29] hover:bg-[#FFEEDF] hover:border-[#FFEEDF] shadow-[0_12px_28px_rgba(255,126,182,0.3)]",
        ghost:
          "bg-white/5 hover:bg-white/15 text-[#FFEEDF] border border-white/15",
      },
      size: {
        default: "min-h-[46px] px-6 py-2.5",
        sm: "min-h-[38px] px-4 py-1.5 text-xs",
        lg: "min-h-[54px] px-8 py-3 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
